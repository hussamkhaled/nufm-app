import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { ScrollView } from "react-native-virtualized-view";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import AddForm from "../../../Components/AdminContractorComponents/Facility/AddForm";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");

export default function AddFacility1({ link }) {
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
      <Header link={link} title="Facility" setModal={setModalVisible} />
      <ScrollView>
        <View style={styles.boxContainer}>
          {/* <ScrollView> */}
          <View style={styles.whiteBox}>
            <Text style={styles.txt}> Add Facility</Text>
            {/* <ScrollView> */}
            <AddForm link={link} />
            {/* </ScrollView> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  whiteBox: {
    // flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: "5%",
    width: width > 700 ? width / 1.6 : width - 50,
  },
  boxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
  },
  txt: {
    fontSize: RFPercentage(2.3),
    fontWeight: "bold",
    color: "#023D26",
    textAlign: "center",
    paddingVertical: "6%",
  },
});
