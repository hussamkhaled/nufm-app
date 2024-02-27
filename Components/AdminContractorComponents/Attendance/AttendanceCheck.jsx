import React, { useEffect,useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Dimensions,ScrollView,FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AttendanceCheckActionCreator from "../../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
function AttendanceCheck({
  getCheckById,
  checkIn,
  checkOut,
  user,
  link,
  facility,
  task,
  error,
  loading,
  setFacilityName,
  getAttendanceInfo,
}) {

  const [attend, setattend] = useState("");
  const navigation = useNavigation();
  console.log(user +"ahah");
  const route = useRoute();
  const id = route.params.id;
  
  React.useEffect(() => {
    setattend(id);
    getCheckById(id);
    console.log(attend + "dwdw");
  }, [id]);
  
  React.useEffect(() => {
    getAttendanceInfo("id", id);
    console.log(id + "dwdw");
  }, [id]);


  return (
    <ScrollView>
    <View style={styles.table}>
      {/* Table Header */}

      <View style={[styles.row, styles.listhead]}>
  
        <Text style={styles.cellhead}>Full Name</Text>
        <Text style={styles.cellhead}>Email</Text>
        <Text style={styles.cellhead}>Work Type</Text>
     
      </View>

      {/* Table Rows */}
      {user.length > 0 ? (
      user.map((u, index) => (

      <TouchableOpacity
      key={index}
      onPress={() =>

        navigation.navigate("CheckAttendance2", {
          id:id,
          email: u.email,
        })
        
      }
      style={styles.AttendanceContainer}>
        <Text style={styles.cell}> {u.fullName}</Text>
        <Text style={styles.cell}> {u.email}</Text>
        <Text style={styles.cell}>{u.workType}</Text>
      </TouchableOpacity>  ))
    ) : (
      <></>

      )}
    
    </View>
    </ScrollView>
  );
};

   
  
const mapStateToProps = (state) => {
  return {
    checkIn: state.GetCheckByIdR.checkIn,
    checkOut: state.GetCheckByIdR.checkOut,
    user: state.GetCheckByIdR.user,
    task: state.GetCheckByIdR.task,
    facility: state.GetCheckByIdR.facility,
    id: state.GetCheckByIdR.id,
    error: state.GetCheckByIdR.error,
    loading: state.GetCheckByIdR.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCheckById: (id) =>
      dispatch(AttendanceCheckActionCreator.getCheckById(id)),

      getAttendanceInfo: (name, value) =>
      dispatch(AttendanceCheckActionCreator.getAttendanceInfo(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceCheck);

const styles = StyleSheet.create({
  table: {
 
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  AttendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAEA",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  
  listhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAEA",
    paddingHorizontal: "5%",

  },
  details: { width: "34%", alignItems: "center" },
  details2: { width: "34%", alignItems: "center" },
  details3: { width: "29%", alignItems: "center" },
  txt: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    textAlign: "left",
    width: "100%",
  },
  Email: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
  },
  Facility: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    // paddingLeft: "10%",
  },
  cell: {
    flex: 3, // Adjust flex value for wider cells
    padding: 10,
    textAlign: 'center',
    fontSize: 10,
    color: "#9A9999",
  },
  cellhead:{
    flex: 3, // Adjust flex value for wider cells
    padding: 10,
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",

  }
});





{/*
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AttendanceCheckActionCreator from "../../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
function AttendanceCheck({
  getCheckById,
  checkIn,
  checkOut,
  user,
  facility,
  task,
  eid,
  error,
  loading,
  setFacilityName,
}) {
  const route = useRoute();
  const id = route.params.id;
  useEffect(() => {
    getCheckById(id);
  }, []);

  useEffect(() => {
    if (facility != "") {
      setFacilityName(facility.name);
    }
  }, [facility]);

  return (
    <View style={styles.container}>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check In {checkIn.date.substr(0,10)} at {checkIn.date.substr(11,5)}</Text>
          <Text style={styles.datetime}>
            {checkIn.lng} / {checkIn.lat}
          </Text>
        </View>
        <Ionicons name="location" size={30} color="#023D26" />
      </View>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check Out {checkOut.date.substr(0,10)} at {checkOut.date.substr(11,5)}</Text>
          <Text style={styles.datetime}>
            {checkOut.lng} / {checkOut.lat}
          </Text>
        </View>
        <Ionicons name="location" size={30} color="#023D26" />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    checkIn: state.GetCheckByIdR.checkIn,
    checkOut: state.GetCheckByIdR.checkOut,
    user: state.GetCheckByIdR.user,
    task: state.GetCheckByIdR.task,
    facility: state.GetCheckByIdR.facility,
    eid: state.GetCheckByIdR.eid,
    error: state.GetCheckByIdR.error,
    loading: state.GetCheckByIdR.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCheckById: (eid) =>
      dispatch(AttendanceCheckActionCreator.getCheckById(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceCheck);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: "6%",
    paddingBottom: "3%",
  },
  boxIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greyBox: {
    height: width > 650 ? 80 : 85,
    backgroundColor: "#F0F0F0",
    width: "85%",
    borderRadius: 15,
    marginRight: "2%",
    marginVertical: "3%",
    flexDirection: "column",
    paddingHorizontal: "6%",
    justifyContent: "center",
  },
  datetime: {
    fontSize: width > 650 ? RFPercentage(1.5) : RFPercentage(1.35),
    paddingTop: "1.5f%",
    color: "#676767",
  },
  Check: {
    fontSize: width > 650 ? RFPercentage(2) : RFPercentage(1.8),

    color: "#023D26",
    fontWeight: "bold",
  },
});

*/}

{/*
















return (
    
    <>
    
    {user.length > 0 && user.map((row, index) => (
      <View key={index} style={styles.container}>
        <View style={styles.boxIcon}>
          <View style={styles.greyBox}>
            <Text style={styles.Check}>Check In {row.email} at {row.fullName}</Text>
            <Text style={styles.datetime}>
              {} / {}
            </Text>
          </View>
          <Ionicons name="location" size={30} color="#023D26" />
        </View>
        <View style={styles.boxIcon}>
          <View style={styles.greyBox}>
            <Text style={styles.Check}>Check Out {} at {}</Text>
            <Text style={styles.datetime}>
              {} / {}
            </Text>
          </View>
          <Ionicons name="location" size={30} color="#023D26" />
        </View>
      </View>
    ))}
  </>
);
};

*/}