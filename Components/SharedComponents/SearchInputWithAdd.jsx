import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
export default function SearchInputWithAdd({ link, setSearchVal, searchVal }) {
  const navigation = useNavigation();
  const handleChange = (searchVal) => {
    setSearchVal(searchVal);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <View style={styles.searchSection}>
          <View style={styles.searchIcon}>
            <EvilIcons name="search" size={22} color="#B7B6B6" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={handleChange}
            value={searchVal}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(link + "AddAttendance")}
      >
        <View style={{ marginRight: "2.5%" }}>
          <MaterialIcons
            name="add-box"
            size={width > 650 ? 44 : 40}
            color="#309694"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: "100%",
    backgroundColor: "#F1F1F1",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: "2%",
    fontSize: RFPercentage(1.5),
  },
  subCont: {
    width: width > 600 ? "50%" : "75%",
    marginLeft: width > 600 ? "2.5%" : "5%",
    backgroundColor: "#f1f1f1",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    marginBottom: "2%",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 7.8 / 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  searchIcon: {
    backgroundColor: "#F1F1F1",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingLeft: "2%",
  },
});
