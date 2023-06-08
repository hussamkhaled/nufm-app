import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BasicInput from "../../Components/SharedComponents/BasicInput";
import Buttons from "../../Components/SharedComponents/Buttons";

export default function ResetForm() {
  return (
    <View style={styles.container}>
      <View style={styles.resetCont}>
        <Text style={styles.reset}>Reset Password</Text>
      </View>
      <View style={styles.inputs}>
        <BasicInput label="New Password" placeholder="Enter your Password" />
        <BasicInput
          label="Confirm Password"
          placeholder="Renter your Password"
        />
      </View>
      <Buttons text="Save" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    marginVertical: "8%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "8%",
    marginHorizontal: "3%",
  },
  text: {
    color: "#023D26",
    fontSize: RFPercentage(2),
  },
  reset: {
    color: "#023D26",
    fontWeight: "bold",
    fontSize: RFPercentage(3.5),
    textAlign: "center",
  },
  resetCont: {
    width: "100%",
    marginVertical: "4%",
    paddingTop: "5%",
  },
  inputs: {
    width: "100%",
    marginBottom: "8%",
  },
});
