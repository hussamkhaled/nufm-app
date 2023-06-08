import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import AddStep3 from "../../../Components/AdminContractorComponents/Facility/AddStep3";

export default function AddFacility3({link}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.box}>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Worker" setModal={setModalVisible} />
      <View style={styles.whiteBox}>
        <Text style={styles.txt}> Add Worker</Text>
        <ScrollView>
          <AddStep3 link={link} />
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
    flex:1,
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
