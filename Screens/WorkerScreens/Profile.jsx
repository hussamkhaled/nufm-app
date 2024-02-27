import React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import UpperPart from "../../Components/WorkerAndOccupantComponents/ProfileComponent/UpperPart";
import GeneralInfo from "../../Components/WorkerAndOccupantComponents/ProfileComponent/GeneralInfo";
function Profile() {
  return (
    <ScrollView>
    <View>
      <UpperPart/>
      <GeneralInfo />
    </View>
    </ScrollView>
  );
}

export default Profile;
