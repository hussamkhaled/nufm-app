import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import SearchInputAdd from "../../../Components/SharedComponents/SearchInputWithAdd";
import AttendanceTable from "../../../Components/AdminContractorComponents/Attendance/AttendanceTable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
export default function AttendancesC({ link }) {
  const navigation = useNavigation();

  const [searchVal, setSearchVal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
      <View style={styles.whiteBox}>
        <Text style={styles.txt}> Attendances</Text>
        <SearchInputAdd
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          bgColor="#F1F1F1"
          link={link}
        />
        <AttendanceTable link={link} searchVal={searchVal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  // container: {
  //   paddingBottom: "35%",
  // },
  whiteBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: wp("5%"),
    borderRadius: 25,
    marginBottom: hp("5%"),
    marginTop: hp("2%"),
  },
  txt: {
    fontSize: width > 700 ? RFPercentage(2.5) : RFPercentage(2.3),
    fontWeight: "bold",
    color: "#023D26",
    paddingHorizontal: width > 700 ? wp("4%") : wp("5%"),
    paddingBottom: "4%",
    paddingTop: "6%",
  },
});
