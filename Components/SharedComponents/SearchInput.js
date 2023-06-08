import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";

export default function SearchInput({ setSearchVal, searchVal }) {
  const handleChange = (searchVal) => {
    setSearchVal(searchVal);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <View style={styles.searchSection}>
          <View style={styles.searchIcon}>
            <EvilIcons name="search" size={24} color="#B7B6B6" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={handleChange}
            value={searchVal}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    aspectRatio: 7.8 / 1,
    backgroundColor: "#F1F1F1",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: "2%",
    fontSize: RFPercentage(1.5),
  },
  container: {
    marginHorizontal: "9%",
    marginBottom: "5%",
  },
  subCont: {
    flexDirection: "column",
    width: "100%",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 7.8 / 1,
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
