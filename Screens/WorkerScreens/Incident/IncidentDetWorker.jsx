import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import IncidentDetails from "../../../Components/WorkerAndOccupantComponents/Incident/IncidentDetailsWorker";

const { width, height } = Dimensions.get("window");

export default function IncidentDet({ link }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex:1}}>
      <View>
        <CMenu
          link={link}
          modalVisible={modalVisible}
          setModal={setModalVisible}
        />
      </View>
      
      <Header link={link} title="Incident" setModal={setModalVisible} />
      <ScrollView>
      <View style={{ flex:1,marginVertical: width > 650 ? "0%" : "10%" }}>
        <IncidentDetails />
      </View>
      </ScrollView>
    </View>
  );
}
