import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CMenu from "../../Components/SharedComponents/CMenu";
import Header from "../../Components/SharedComponents/Header";
import SearchInput from "../../Components/SharedComponents/SearchInput";
import TabPannel from "../../Components/AdminContractorComponents/Communication/TabPannel";

const { width, height } = Dimensions.get("window");

export default function Communication({ link }) {
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
      <Header link={link} title="Communication" setModal={setModalVisible} />
      {/* <ScrollView> */}
      <View style={styles.boxContainer}>
        <View style={styles.whiteBox}>
          <Text style={styles.txt}> New Messages</Text>
          <View style={{ marginBottom: "3%" }}>
            <SearchInput
              searchVal={searchVal}
              setSearchVal={setSearchVal}
              bgColor="#F1F1F1"
            />
          </View>
          <TabPannel link={link} searchVal={searchVal} />
        </View>
      </View>
      {/* </ScrollView> */}
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
    width: width > 700 ? width / 1.4 : width - 50,
    // marginHorizontal: wp("5%"),
    borderRadius: 25,
    marginBottom: width > 650 ? "3%" : "6%",
    marginTop: "1%",
  },
  boxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
  },
  txt: {
    fontSize: width > 700 ? RFPercentage(2.5) : RFPercentage(2.1),
    fontWeight: "bold",
    color: "#023D26",
    paddingHorizontal: "3.5%",
    paddingTop: "7%",
    paddingBottom: "5%",
  },
});
