
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React, { useState, useEffect } from "react";
import BasicInput from "../SharedComponents/BasicInput";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function ForgetForm({ getForgetInfo, forgemail, submitForget, loading, buttonText }) {


  const [mail, setmail] = useState('');
  const onLoadFunc = () => {

    getForgetInfo("getForgetInfo", "");
    // getForgetInfo('forgemail', "");
    getForgetInfo('buttonText', "Reset");
    // console.log(loading)
  };

  const [semail, setSEmail] = useState("");
  const fN = async () => {
    try {
      const adname = await AsyncStorage.getItem("email");
      if (adname !== null) {
        setSEmail(adname);
        getForgetInfo('forgemail', adname);

      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunc();
      fN();
    }, [])
  );



  const handleChange = (value) => {
    getForgetInfo('forgemail', value);
  };

  const handleClick = () => {
    getForgetInfo('buttonText', "Resetting");

    submitForget(forgemail);
  };


  return (
    <View style={styles.container}>
      <View style={styles.resetCont}>
        <Text style={styles.reset}>Reset Password</Text>
      </View>

      <View style={styles.inputs}>
        <BasicInput label="Email"

          // onChangeText={(value) => handleChange(value)}

          keyboardType="default"
          value={forgemail}
          type="email"
          placeholder="Enter your Email here" />
      </View>

      <>
        {loading ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#023D26", color: "white", width: "50%", height: 40, borderRadius: 10
              , justifyContent: "center", alignItems: "center", textAlign: "center"
            }}
            onPress={handleClick}
            size="md"
            colorScheme="teal"
            _text={{ color: 'white' }}
            _hover={{ bg: "teal.400" }}
            px={{ base: 14, md: 24 }}
            rounded="full"
            block
          >
            <Text style={{ color: "white" }}>{buttonText}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleClick}
            style={{
              backgroundColor: "#023D26", color: "white", width: "50%", height: 40, borderRadius: 10
              , justifyContent: "center", alignItems: "center", textAlign: "center"
            }}
            isLoading
            size="md"
            colorScheme="teal"
            _text={{ color: 'white' }}
            _hover={{ bg: "teal.400" }}
            px={{ base: 14, md: 24 }}
            rounded="full"
            block
          >
            <Text style={{ color: "white" }}>{buttonText}</Text>

          </TouchableOpacity>
        )}
      </>
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

export default ForgetForm;