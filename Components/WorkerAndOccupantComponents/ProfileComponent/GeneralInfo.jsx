import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as UpdateWorkerActionCreator from "../../../Store/ActionCreator/Worker/UpdateWorkerActionCreator.js";

const { width, height } = Dimensions.get("window");
function GeneralInfo({
  getWorkerById,
  fullName,
  dob,
  city,
  workType,
  phone,
  specializations,
}) {
  const [workerId, setworkerId] = useState("");
  const workerInfo = async () => {
    try {
      const id = await AsyncStorage.getItem("email");
      if (id !== null) {
        getWorkerById(id);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    workerInfo();

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.general}>General Info</Text>
      <View style={styles.card}>
        <View style={styles.txtCont}>
          <Text style={styles.info}> Full Name</Text>
          <Text style={styles.content}>{fullName}</Text>
        </View>
        <View style={styles.txtCont}>
          <Text style={styles.info}> City</Text>
          <Text style={styles.content}>{city}</Text>
        </View>
        <View style={styles.txtCont}>
          <Text style={styles.info}> Date of Birth</Text>
          <Text style={styles.content}>{dob}</Text>
        </View>
        <View style={styles.txtCont}>
          <Text style={styles.info}> Phone Number </Text>
          <Text style={styles.content}>{phone}</Text>
        </View>
        <View style={styles.txtCont}>
          <Text style={styles.info}> Work Type</Text>
          <Text style={styles.content}>{workType}</Text>
        </View>
        <View style={styles.txtCont}>
          <Text style={styles.info}> Specializations </Text>
          <Text style={styles.content}>{specializations.map((spec, index)=>{
            return index !== specializations.length -1 ? spec + ", " : spec;
          })}</Text>
        </View>
      </View>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    dob: state.UpdateWorkerR.dob,
    workType: state.UpdateWorkerR.workType,
    city: state.UpdateWorkerR.city,
    phone: state.UpdateWorkerR.phone,
    specializations: state.UpdateWorkerR.specializations,
    fullName: state.UpdateWorkerR.fullName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWorkerById: (eid) =>
      dispatch(UpdateWorkerActionCreator.getWorkerById(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width > 650 ? "10%" : "6%",
    paddingVertical: "8%",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    paddingVertical: width > 650 ? "2%" : "7%",
    paddingHorizontal: "6%",
  },
  general: {
    fontSize: RFPercentage(2.4),
    fontWeight: "bold",
    color: "#023D26",
    paddingBottom: width > 650 ? "3%" : "5%",
    paddingLeft: "1%",
  },
  info: {
    paddingLeft: "1.5%",
    fontWeight: "bold",
    color: "#023D26",
    fontSize: width > 700 ? RFPercentage(2) : RFPercentage(1.9),
  },
  txtCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width > 650 ? "45%" : "65%",
    paddingVertical: "4%",
  },
  content: {
    color: "#595959",
    fontSize: width > 700 ? RFPercentage(2) : RFPercentage(1.9),
    textAlign: "left",
    width: "50%"
  },
});
