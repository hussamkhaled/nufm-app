import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Landing,
  Login,
  Reset,
  ContractorHome,
  Calendar,
  Analytics,
  Incident,
  Support,
  Risk,
  Communication,
  Notification,
  Sender,
  IncidentDet,
  RiskDet,
  Facilities,
  AddFacility1,
  AddFacility2,
  AddFacility3,
  Workers,
  AddWorker,
  AttendancesC,
  AddAttendance,
  CheckAttendance,
  Orders,
  OrderDet
} from "../../Screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function ContractorNavigation() {
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
          <Stack.Screen name="Contractor/Reset">
            {(props) => <Reset {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Home">
            {(props) => <ContractorHome {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Risk">
            {(props) => <Risk {...props} link="Contractor/" />}
          </Stack.Screen>

          <Stack.Screen name="Contractor/Communication">
            {(props) => <Communication {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Notification">
            {(props) => <Notification {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Sender">
            {(props) => <Sender {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Incident">
            {(props) => <Incident {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/IncidentDet">
            {(props) => <IncidentDet {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/RiskDet">
            {(props) => <RiskDet {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Facilities">
            {(props) => <Facilities {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="AddFacility">
            {(props) => <AddFacility1 {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="AddFacility2">
            {(props) => <AddFacility2 {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="AddFacility3">
            {(props) => <AddFacility3 {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Workers">
            {(props) => <Workers {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/AddWorker">
            {(props) => <AddWorker {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/AttendancesC">
            {(props) => <AttendancesC {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/AddAttendance">
            {(props) => <AddAttendance {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/CheckAttendance">
            {(props) => <CheckAttendance {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/Orders">
            {(props) => <Orders {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/OrderDetails">
            {(props) => <OrderDet {...props} link="Contractor/" />}
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
