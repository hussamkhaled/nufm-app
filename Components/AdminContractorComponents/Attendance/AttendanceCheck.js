import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AttendanceCheckActionCreator from "../../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";

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
}) {
  
  const route = useRoute();
  const id = route.params.id;
  useEffect(() => {
    getCheckById(id);
    console.log(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check In</Text>
          <Text style={styles.datetime}>
            {/* {checkIn.date} / {facility.name} */}
          </Text>
        </View>
        <Ionicons name="location" size={30} color="#023D26" />
      </View>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check Out</Text>
          <Text style={styles.datetime}>
            {/* {checkOut.date} / {facility.name} */}
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
  },
  boxIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greyBox: {
    aspectRatio: 4.5 / 1,
    backgroundColor: "#F0F0F0",
    width: "85%",
    borderRadius: 15,
    marginRight: "2%",
    marginVertical: "3%",
    flexDirection: "column",
    paddingHorizontal: "6%",
    paddingVertical: "2%",
    justifyContent: "center",
  },
  datetime: {
    fontSize: RFPercentage(1.35),
    paddingTop: "1.5f%",
    color: "#676767",
  },
  Check: {
    fontSize: RFPercentage(1.8),
    color: "#023D26",
    fontWeight: "bold",
  },
});
