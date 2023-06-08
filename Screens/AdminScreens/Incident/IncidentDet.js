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
import IncidentDetails from "../../../Components/AdminContractorComponents/Incident/IncidentDetails.js";

export default function IncidentDet({link}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Incident" setModal={setModalVisible} />
      <View style={{ marginVertical:"10%"}}>
      <IncidentDetails />
      </View>
    </View>
  );
}
