import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";
import Workers from "./Workers";
import Contractors from "./Contractors";
import Occupants from "./Occupants";

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
        name="Workers"
        children={() => <Workers searchVal={searchVal} />}
      />
      <Tab.Screen
        name="Contractors"
        children={() => <Contractors searchVal={searchVal} />}
      />
      <Tab.Screen
        name="Occupants"
        children={() => <Occupants searchVal={searchVal} />}
      />
    </Tab.Navigator>
  );
}
