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
import OrderDetails from "../../../Components/WorkerAndOccupantComponents/Order/OrderDetails.js";

export default function OrderDet({link}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Order" setModal={setModalVisible} />
      <View style={{ marginVertical:"10%"}}>
      <OrderDetails />
      </View>
    </View>
  );
}
