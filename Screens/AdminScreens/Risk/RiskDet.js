import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import RiskDetails from "../../../Components/AdminContractorComponents/Risk/RiskDetails.js";

export default function RiskDet({link}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Risk" setModal={setModalVisible} />
      <View style={{ marginVertical:"10%"}}>
      <RiskDetails />
      </View>
    </View>
  );
}
