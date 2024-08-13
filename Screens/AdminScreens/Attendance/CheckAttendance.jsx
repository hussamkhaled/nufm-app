import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import AttendanceCheck from "../../../Components/AdminContractorComponents/Attendance/AttendanceCheck";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
export default function CheckAttendance({ link }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dayDate = new Date().toLocaleString().substr(0, 10);

  const [facilityName, setFacilityName] = useState("");
  return (
    <View style={styles.box}>
      <View>
        <CMenu
          link={link}
          modalVisible={modalVisible}
          setModal={setModalVisible}
        />
        
      </View>
      <Header link={link} title="Attendance" setModal={setModalVisible} />
      <View style={styles.boxContainer}>
        <View style={styles.whiteBox}>
          <Text style={styles.txt}>{facilityName}</Text>
          <AttendanceCheck
            facilityName={facilityName}
            setFacilityName={setFacilityName}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  whiteBox: {
    backgroundColor: "#fff",
    width: width > 650 ? width / 1.3 : width - 50,
    borderRadius: 25,
    marginBottom: "5%",
    marginTop: "2%",
  },
  boxContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: wp("100%"),
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
