import React, { useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import LoginImage from "../../Components/LoginComponents/LoginImage";
import LoginForm from "../../Components/LoginComponents/LoginForm";
import LoginLarge from "../../Components/LoginComponents/LoginLarge";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get("window");
export default function Login() {
  return (
    <View style={styles.container}>
      {width > 600 ? (
        <ScrollView>
          <LoginLarge />
        </ScrollView>
      ) : (
        <View>
          <KeyboardAwareScrollView>
          {/* <ScrollView> */}
            <LoginImage />
            <LoginForm />
          {/* </ScrollView> */}
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
