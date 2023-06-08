import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import SearchInput from "../../../Components/SharedComponents/SearchInput";
import WorkerTable from "../../../Components/AdminContractorComponents/Worker/WorkerTable";

export default function Workers({link}) {
  const navigation = useNavigation();

  const [searchVal, setSearchVal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.box}>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Worker" setModal={setModalVisible} />
      <View style={styles.whiteBox}>
        <Text style={styles.txt}> Workers</Text>
        <SearchInput
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          bgColor="#F1F1F1"
        />
        <WorkerTable searchVal={searchVal} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(link+"AddWorker");
        }}
      >
        <View style={styles.btnSite}>
          <Ionicons name="add-outline" size={22} color="#fff" />
          <Text style={styles.addSite}>ADD Worker</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    paddingBottom: "35%",
  },
  whiteBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: "5%",
    borderRadius: 25,
    marginBottom: "8%",
    marginTop: "3%",
  },
  txt: {
    fontSize: RFPercentage(2.3),
    fontWeight: "bold",
    color: "#023D26",
    paddingHorizontal: "5%",
    paddingVertical: "6%",
  },
  btnSite: {
    flexDirection: "row",
    backgroundColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "2.5%",
    justifyContent: "center",
    marginBottom: "7%",
    marginHorizontal: "6%",
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: "2%",
  },
});
