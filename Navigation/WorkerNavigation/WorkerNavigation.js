import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Landing,
  Login,
  Reset,
  WorkerHome,
  IncidentsW,
  Support,
  Risk,
  Communication,
  Notification,
  Sender,
  IncidentDet,
  AddIncidentOW,
  RiskDet,
  AddAttendance,
  CheckAttendance,
  Orders,
  OrderDet
} from "../../Screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function WorkerNavigation() {
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
          <Stack.Screen name="Worker/Reset">
            {(props) => <Reset {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Home">
            {(props) => <WorkerHome {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Risk">
            {(props) => <Risk {...props} link="Worker/" />}
          </Stack.Screen>

          <Stack.Screen name="Worker/Communication">
            {(props) => <Communication {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Notification">
            {(props) => <Notification {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Sender">
            {(props) => <Sender {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/IncidentsW">
            {(props) => <IncidentsW {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/AddIncident">
            {(props) => <AddIncidentOW {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/IncidentDet">
            {(props) => <IncidentDet {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/RiskDet">
            {(props) => <RiskDet {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/AddAttendance">
            {(props) => <AddAttendance {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/CheckAttendance">
            {(props) => <CheckAttendance {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Orders">
            {(props) => <Orders {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/OrderDetails">
            {(props) => <OrderDet {...props} link="Worker/" />}
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
