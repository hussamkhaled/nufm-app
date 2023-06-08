import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { EvilIcons } from "@expo/vector-icons";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import RiskList from "../../../Components/AdminContractorComponents/Risk/RiskList";

export default function Risk({link}) {
  const handleChange = (searchVal) => {
    setSearchVal(searchVal);
  };
  const [searchVal, setSearchVal] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.box}>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Risk" setModal={setModalVisible} />
      <View style={styles.listBox}>
        <View style={styles.container}>
          <View style={styles.searchSection}>
            <View style={styles.searchIcon}>
              <EvilIcons name="search" size={24} color="#B7B6B6" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={handleChange}
            />
          </View>
        </View>

        <RiskList link={link} searchVal={searchVal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  listBox: {
    flex: 1,
    marginHorizontal: "7%",
    marginBottom: "8%",
    marginTop: "3%",
    paddingTop: "5%",
  },
  input: {
    width: "100%",
    aspectRatio: 7.9 / 1,
    backgroundColor: "#FFF",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: "2%",
    fontSize: RFPercentage(1.5),
  },
  container: {
    marginHorizontal: "4.5%",
    marginBottom: "4%",
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 7.8 / 1,
    backgroundColor: "#fff",
  },
  searchIcon: {
    backgroundColor: "#FFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingLeft: "2%",
  },
});
