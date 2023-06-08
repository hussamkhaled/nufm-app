import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NUFM from "../../assets/NUFM-Green.png";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Header({ link, title, setModal }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <View>
            <Entypo name="menu" size={26} color="#023D26" />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
        // onPress={() => navigation.navigate(link+"Notification")}
        >
          <View>
            <Ionicons name="notifications-outline" size={26} color="#023D26" />
          </View>
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2.7),
    fontWeight: "bold",
    color: "#023D26",
  },
  subCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "19%",
    paddingHorizontal: "7%",
    width: "100%",
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "5%",
  },
  img: {
    width: 120,
    height: 50,
  },
});
