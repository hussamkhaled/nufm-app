import React, { useEffect} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import LoginImage from "../../Components/LoginComponents/LoginImage";
import LoginForm from "../../Components/LoginComponents/LoginForm";
import LoginLarge from "../../Components/LoginComponents/LoginLarge";
const { width, height } = Dimensions.get("window");
export default function Login() {
  console.log(width, height)
  return (
    <View style={styles.container}>
      {width > 600 ? (
        <ScrollView>
          <LoginLarge />
        </ScrollView>
      ) : (
        <View>
          <ScrollView>
            <LoginImage />
            <LoginForm />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
