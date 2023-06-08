import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import AddRiskO from "../../../Components/OccupantComponents/Risk/AddForm";

export default function AddRisk({ link }) {
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
      <Header link={link} title="Risk" setModal={setModalVisible} />
      <View style={styles.whiteBox}>
        {/* <Text style={styles.txt}> </Text> */}
        <ScrollView>
          <AddRiskO />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  whiteBox: {
    displlay:"flex",
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
    textAlign: "center",
    paddingVertical: "6%",
  },
});
