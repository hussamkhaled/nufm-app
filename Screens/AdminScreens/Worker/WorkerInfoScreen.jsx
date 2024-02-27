import React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import WorkerInfo from "../../../Components/AdminContractorComponents/Worker/WorkerInfo";
function Profile() {
  return (
    <ScrollView>
    <View>
     
      <WorkerInfo />
    </View>
    </ScrollView>
  );
}

export default Profile;
