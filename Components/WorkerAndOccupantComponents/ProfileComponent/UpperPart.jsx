import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import Profile from "../../../assets/profile.png";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
export default function UpperPart({ link }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-circle"
          size={width > 650 ? 38 : 30}
          color="white"
        />
      </TouchableOpacity>
      <View style={styles.subCont}>
        <TouchableOpacity>
          <Image source={Profile} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.name}> John Doe</Text>
        <Text style={styles.spec}>Driver Cleaner Builder</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#309694",
    paddingTop: width > 650 ? "7%" : "15%",
    paddingHorizontal: "5%",
  },
  subCont: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "8%",
  },
  img: {
    width: width > 650 ? 200 : 150,
    height: width > 650 ? 200 : 150,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: width > 650 ? RFPercentage(2.3) : RFPercentage(2.4),
  },
  spec: {
    color: "white",
    fontSize: width > 650 ? RFPercentage(2.3) : RFPercentage(1.8),
  },
});
