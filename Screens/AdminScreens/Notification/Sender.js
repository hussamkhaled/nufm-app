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
import SenderDetails from "../../../Components/AdminContractorComponents/Notification/SenderDetails.js";

export default function Sender({link}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Notification" setModal={setModalVisible} />
      <View style={{ marginVertical:"10%"}}>
      <SenderDetails link={link} />
      </View>
    </View>
  );
}
