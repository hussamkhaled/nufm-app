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
          <Text style={styles.Check}>Check In ({checkIn.date})</Text>
          <Text style={styles.datetime}>
            {checkIn.lng} / {checkIn.lat}
          </Text>
        </View>
        <Ionicons name="location" size={30} color="#023D26" />
      </View>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check Out ({checkOut.date})</Text>
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
