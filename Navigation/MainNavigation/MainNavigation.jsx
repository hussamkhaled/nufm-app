import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Landing,
  Login,
  Reset,
  Home,
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
  AddFacility3,
  ContractorHome,
  AttendancesC,
  AddAttendance,
  AddIncidentOW,
  WorkerHome,
  IncidentsW,
  OccupantHome,
  AddOrder,
  AddRisk,
  RiskO,
  OrderO,
  TasksList,
  Safety,
  CommunicationWorker,
  CommunicationOccupant,
  Profile,
  IncidentListW,
  IncidentDW,
  CheckAttendance2,
  Updateworker,
  Forget,
} from "../../Screens";
import { createStackNavigator } from "@react-navigation/stack";
import WorkerInfo from "../../Components/AdminContractorComponents/Worker/WorkerInfo";

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

          {/* Admin Nav */}
          <Stack.Screen name="Home">
            {(props) => <Home {...props} link="" />}
          </Stack.Screen>

          <Stack.Screen name="Forget">
            {(props) => <Forget {...props} link="" />}
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
          <Stack.Screen name="Workersinfo">
            {(props) => <WorkerInfo {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="AddWorker">
            {(props) => <AddWorker {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="Updateworker">
            {(props) => <Updateworker {...props} link="" />}
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
          <Stack.Screen name="Reset">
            {(props) => <Reset {...props} link="" />}
          </Stack.Screen>
          <Stack.Screen name="CheckAttendance2">
            {(props) => <CheckAttendance2 {...props} link="" />}
          </Stack.Screen>
          {/* ------------Contractor Nav-------------  */}
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
          <Stack.Screen name="Contractor/AddFacility">
            {(props) => <AddFacility1 {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/AddFacility2">
            {(props) => <AddFacility2 {...props} link="Contractor/" />}
          </Stack.Screen>
          <Stack.Screen name="Contractor/AddFacility3">
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
          <Stack.Screen name="Contractor/Reset">
            {(props) => <Reset {...props} link="Contractor/" />}
          </Stack.Screen>
          {/*--------------- Worker Nav ------------- */}
          <Stack.Screen name="Worker/Home">
            {(props) => <WorkerHome {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Risk">
            {(props) => <Risk {...props} link="Worker/" />}
          </Stack.Screen>

          <Stack.Screen name="Worker/Profile">
            {(props) => <Profile {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/CommunicationWorker">
            {(props) => <CommunicationWorker {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/Safety">
            {(props) => <Safety {...props} link="Worker/" />}
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
            {(props) => <IncidentListW {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/TasksList">
            {(props) => <TasksList {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/AddIncident">
            {(props) => <AddIncidentOW {...props} link="Worker/" />}
          </Stack.Screen>
          <Stack.Screen name="Worker/IncidentDet">
            {(props) => <IncidentDW {...props} link="Worker/" />}
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
          <Stack.Screen name="Worker/Reset">
            {(props) => <Reset {...props} link="Worker/" />}
          </Stack.Screen>

          {/*----------- Occupant Nav ------------------- */}
          <Stack.Screen name="Occupant/Home">
            {(props) => <OccupantHome {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/Risk">
            {(props) => <RiskO {...props} link="Occupant/" />}
          </Stack.Screen>
          <Stack.Screen name="Occupant/CommunicationOccupant">
            {(props) => <CommunicationOccupant {...props} link="Occupant/" />}
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
          <Stack.Screen name="Occupant/Reset">
            {(props) => <Reset {...props} link="Occupant/" />}
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
