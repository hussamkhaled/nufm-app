import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import LoginImage from "../../Components/LoginComponents/LoginImage";
import LoginLarge from "../../Components/LoginComponents/LoginLarge";
import LoginFingerFace2 from "../../Components/LoginComponents/LoginFingerFace2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width, height } = Dimensions.get("window");
export default function Login() {
  console.reportErrorsAsExceptions = false;
  return (
    <View style={styles.container}>
      {width > 600 ? (
        <ScrollView>
          <LoginLarge />
        </ScrollView>
      ) : (
        <View>
          <KeyboardAwareScrollView>
            <LoginImage/>
            <LoginFingerFace2/>
          </KeyboardAwareScrollView>
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
