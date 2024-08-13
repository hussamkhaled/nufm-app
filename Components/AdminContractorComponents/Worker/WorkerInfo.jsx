import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as GetAllDoneTaskActionCreator from "../../../Store/ActionCreator/Task/GetAllDoneTaskActionCreator";
import * as UpdateWorkerActionCreator from "../../../Store/ActionCreator/Worker/UpdateWorkerActionCreator";

import { useRoute } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
function GeneralInfo({
    url,
    getAllDoneTasks,
    tasks,
    error,
    getWorkerById,
    fullName,
    profileImage,
    dob,
    city,
    workType,
    phone,
    specializations,
    policeExpDate,
    police,
    wwcc,
    wwccExpDate,
}) {

    const [attend, setattend] = useState("");
  

    const route = useRoute();
    const id = route.params.id;
    
    React.useEffect(() => {
      setattend(id);
      getAllDoneTasks(id);
      getWorkerById(id);
      // console.log(attend + "dwdw");
    }, [id]);
    


  return (
    <View style={styles.container}>
      <Text style={styles.general}>Worker Management</Text>
      <View style={styles.card}>
        <View style={styles.txtCont}>
          <Text style={styles.info}> Full Name</Text>
          <Text style={styles.content}>{fullName}</Text>
        </View>

        <View style={styles.txtCont}>
          <Text style={styles.info}>Specializations</Text>
          <Text style={styles.content}>{specializations}</Text>
        </View>

        

        <View style={styles.txtCont}>
          <Text style={styles.info}>Phone Number</Text>
          <Text style={styles.content}>{phone}</Text>
        </View>

        <View style={styles.txtCont}>
          <Text style={styles.info}>WWCC</Text>
          <Text style={styles.content}>{wwcc}</Text>
        </View>

        <View style={styles.txtCont}>
          <Text style={styles.info}>Expiry date</Text>
          <Text style={styles.content}>{wwccExpDate}</Text>
        </View>

        <View style={styles.txtCont}>
          <Text style={styles.info}>Police Number</Text>
          <Text style={styles.content}>{police}</Text>
        </View>

        <View style={styles.txtCont}>
          <Text style={styles.info}>Police Expiry date</Text>
          <Text style={styles.content}>{policeExpDate}</Text>
        </View>
       
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
    return {
      tasks: state.GetAllDoneTasksR.tasks,
      error: state.GetAllDoneTasksR.error,
      profileImage: state.UpdateWorkerR.profileImage,
      dob: state.UpdateWorkerR.dob,
      workType: state.UpdateWorkerR.workType,
      city: state.UpdateWorkerR.city,
      phone: state.UpdateWorkerR.phone,
      specializations: state.UpdateWorkerR.specializations,
      fullName: state.UpdateWorkerR.fullName,
      wwcc: state.UpdateWorkerR.wwcc,
      wwccExpDate: state.UpdateWorkerR.wwccExpDate,
      police: state.UpdateWorkerR.police,
      policeExpDate: state.UpdateWorkerR.policeExpDate,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getAllDoneTasks: (eid) =>
        dispatch(GetAllDoneTaskActionCreator.getAllDoneTasks(eid)),
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
    textAlign:"center",
    fontSize: RFPercentage(2.4),
    fontWeight: "bold",
    color: "#023D26",
    paddingBottom: width > 650 ? "3%" : "5%",
    paddingLeft: "1%",
    marginTop:50
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
    marginLeft:40
  },
  content: {
    color: "#595959",
    fontSize: width > 700 ? RFPercentage(2) : RFPercentage(1.9),
  },
});
