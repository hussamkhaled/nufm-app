import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import AttendanceCheck from "../../../Components/AdminContractorComponents/Attendance/AttendanceCheck";

export default function CheckAttendance({link}) {
  const [modalVisible, setModalVisible] = useState(false);
  const dayDate = new Date().toLocaleString().substr(0, 10);
  return (
    <View style={styles.box}>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Attendance" setModal={setModalVisible} />
      <View style={styles.whiteBox}>
        <Text style={styles.txt}>{dayDate}</Text>
        <AttendanceCheck />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  whiteBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: "5%",
    borderRadius: 25,
    marginBottom: "5%",
    marginTop: "3%",
  },
  txt: {
    fontSize: RFPercentage(2.3),
    fontWeight: "bold",
    color: "#023D26",
    paddingHorizontal: "8%",
    paddingTop: "7%",
    paddingBottom: "4%",
  },
});
