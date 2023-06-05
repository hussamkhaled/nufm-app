import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  PixelRatio,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { EvilIcons } from "@expo/vector-icons";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import IncidentList from "../../../Components/AdminContractorComponents/Incident/IncidentList";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;
export default function Incident({ link }) {
  const handleChange = (searchVal) => {
    setSearchVal(searchVal);
  };
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
      <Header link={link} title="Incident" setModal={setModalVisible} />
      <View style={styles.boxContainer}>
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

          <IncidentList link={link} searchVal={searchVal} />
        </View>
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
    // paddingHorizontal: wp("7%"),
    marginBottom: "5%",
    marginTop: "3%",
    paddingTop: "3%",
    width: width > 650 ? width / 1.3 : width - 50,
  },
  boxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: "2%",
    fontSize: width > 650 ? RFPercentage(1.8) : RFPercentage(1.5),
  },
  container: {
    width: width > 600 ? "50%" : "85%",
    marginLeft: width > 600 ? "2.5%" : "7%",
    backgroundColor: "#fff",
    marginBottom:"2%"
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 7.8 / 1,
    backgroundColor: "#fff",
    width: "100%",
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
