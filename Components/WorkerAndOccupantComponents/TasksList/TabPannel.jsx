import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";
import Open from "./Open";
import InProgress from "./InProgress";
import Completed from "./Completed";

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

export default function TabPannel({ searchVal }) {
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
      <Tab.Screen
        name="Open"
        children={() => <Open searchVal={searchVal} />}
      />
      <Tab.Screen
        name="In Progress"
        children={() => <InProgress searchVal={searchVal} />}
      />
      <Tab.Screen
        name="Completed"
        children={() => <Open searchVal={searchVal} />}
      />
    </Tab.Navigator>
  );
}
