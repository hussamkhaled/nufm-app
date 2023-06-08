import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Landing,
  Login,
  Reset,
  Home,
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
  AddFacility,
  Workers,
  AddWorker,
  Attendances,
  CheckAttendance,
  Orders,
  OrderDet,
  AddFacility1,
  AddFacility2,
  AddFacility3
} from "../../Screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function LoginNavigation() {
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
          <Stack.Screen name="Reset">
            {(props) => <Reset {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => <Home {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Risk">
            {(props) => <Risk {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Communication">
            {(props) => <Communication {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Notification">
            {(props) => <Notification {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Sender">
            {(props) => <Sender {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Incident">
            {(props) => <Incident {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="IncidentDet">
            {(props) => <IncidentDet {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="RiskDet">
            {(props) => <RiskDet {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Facilities">
            {(props) => <Facilities {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="AddFacility">
            {(props) => <AddFacility1 {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="AddFacility2">
            {(props) => <AddFacility2 {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="AddFacility3">
            {(props) => <AddFacility3 {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Workers">
            {(props) => <Workers {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="AddWorker">
            {(props) => <AddWorker {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Attendances">
            {(props) => <Attendances {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="CheckAttendance">
            {(props) => <CheckAttendance {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Orders">
            {(props) => <Orders {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="OrderDetails">
            {(props) => <OrderDet {...props} link="" />}
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
