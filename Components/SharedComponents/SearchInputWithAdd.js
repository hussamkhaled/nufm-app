import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SearchInputWithAdd({link, setSearchVal, searchVal }) {
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
      <TouchableOpacity onPress={()=> navigation.navigate(link+"AddAttendance")}>
        <View>
          <MaterialIcons name="add-box" size={40} color="#309694" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "90%",
    aspectRatio: 7.8 / 1,
    backgroundColor: "#F1F1F1",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: "2%",
    fontSize: RFPercentage(1.5),
  },
  container: {
    marginHorizontal: "4%",
    marginBottom: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subCont: {
    flexDirection: "column",
    width: "90%",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 8.6 / 1,
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
