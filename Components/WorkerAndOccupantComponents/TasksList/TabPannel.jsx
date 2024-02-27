import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions, Text, View } from "react-native";
import Open from "./Open";
import InProgress from "./InProgress";
import Completed from "./Completed";
import * as GetTasksActionCreator from "../../../Store/ActionCreator/Task/GetTasksByUserId";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const LoadingComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);


const TabPannel = ({ searchVal, getAllTaskInfoByUserId, tasks }) => {
  const [semail, setSEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const fN = async () => {
    try {
      const adname = await AsyncStorage.getItem("email");
      if (adname !== null) {
        setSEmail(adname);
        getAllTaskInfoByUserId(adname);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    fN();
  }, []);

  useEffect(()=>{
    if(tasks.length > 0){
      setLoading(false);
    }
  },[tasks])
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#023D26",
        tabBarIndicatorStyle: {
          backgroundColor: "#92BFAE",
        },
        tabBarLabelStyle: {
          fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
          fontWeight: "bold",
        },
      }}
    >
      {loading ? (
      // Display a loading indicator or placeholder content
      <Tab.Screen name="Loading" component={LoadingComponent} />
    ) : (
      // Render the tab screens when the data is available
      <>
          <Tab.Screen
            name="Open"
            children={() => (
              <Open
                searchVal={searchVal}
                data={tasks.filter((item) => item.status === "Open")}
              />
            )}
          />

          <Tab.Screen
            name="In Progress"
            children={() => (
              <InProgress
                searchVal={searchVal}
                data={tasks.filter((item) => item.status === "Inprogress")}
              />
            )}
          />

          <Tab.Screen
            name="Done"
            children={() => (
              <Completed
                searchVal={searchVal}
                data={tasks.filter((item) => item.status === "Done")}
              />
            )}
          />
          </>
    )}
        
    </Tab.Navigator>
  );
};
const mapStateToProps = (state) => {
  return {
    tasks: state.GetAllTasksByUserR.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTaskInfoByUserId: (email) =>
      dispatch(GetTasksActionCreator.getAllTaskInfoByUserId(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabPannel);
