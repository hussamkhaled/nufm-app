import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Landing,
  Login,
  Reset,
  OccupantHome,
  IncidentsW,
  Support,
  RiskO,
  AddRisk,
  Communication,
  Notification,
  Sender,
  IncidentDet,
  AddIncidentOW,
  RiskDet,
  AddAttendance,
  CheckAttendance,
  OrderO,
  AddOrder,
  OrderDet,
} from "../../Screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function OccupantNavigation() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          navigationOptions={{ gesturesEnabled: false }}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Occupant/Reset">
            {(props) => <Reset {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Home">
            {(props) => <OccupantHome {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Risk">
            {(props) => <RiskO {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/AddRisk">
            {(props) => <AddRisk {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Communication">
            {(props) => <Communication {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Notification">
            {(props) => <Notification {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Sender">
            {(props) => <Sender {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/IncidentsW">
            {(props) => <IncidentsW {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/AddIncident">
            {(props) => <AddIncidentOW {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/IncidentDet">
            {(props) => <IncidentDet {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/RiskDet">
            {(props) => <RiskDet {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/AddAttendance">
            {(props) => <AddAttendance {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/CheckAttendance">
            {(props) => <CheckAttendance {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Orders">
            {(props) => <OrderO {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/AddOrder">
            {(props) => <AddOrder {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/OrderDetails">
            {(props) => <OrderDet {...props} link="Occupant/" />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
