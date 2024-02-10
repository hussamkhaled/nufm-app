import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ResetImage from "../../Components/ResetComponents/ResetImage";
import ResetForm from "../../Components/ResetComponents/ResetForm";

export default function Reset() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ResetImage />
        <ResetForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
});
