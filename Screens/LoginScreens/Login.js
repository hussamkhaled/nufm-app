import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import LoginImage from "../../Components/LoginComponents/LoginImage";
import LoginForm from "../../Components/LoginComponents/LoginForm";

export default function Login() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <LoginImage />
        <LoginForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
