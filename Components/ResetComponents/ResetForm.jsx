import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BasicInput from "../SharedComponents/BasicInput"
function ResetForm({ submitSet, getForgetInfo, oldpwd, pwd, emailS, storedToken, loadingReset, buttonResetText }) {

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = () => {

    if (pwd === confirmPassword) {
      submitSet(emailS, oldpwd, pwd);
    } else {
      getForgetInfo('buttonResetText', 'Password Not Matched');
    }
  }

  const handleChange = (name, value) => {
  
    getForgetInfo(name, value);
  }
  const handleChangeEmail = (name, value) => {
    getForgetInfo(name, value);
  }
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  }

  // Function to mask the password input
  // const maskPassword = (password) => {
  //   return password.replace(/./g, '*'); // Replacing each character with '*'
  // }

  return (
    <View style={styles.container}>
      <View style={styles.resetCont}>
        <Text style={styles.reset}>Set Password</Text>
      </View>
      <View style={styles.inputs}>
        <BasicInput label="Email" placeholder="Enter your Email here"
          type="email"
          name="emailS"
          value={emailS}
          onChangeText={(value) => handleChangeEmail('emailS', value)}
        />
        <BasicInput
          secureTextEntry={true}
          label="Old Password"
          placeholder="Enter your Password"
          value={oldpwd} // Masking old password input
          onChangeText={(value) => handleChange('oldpwd', value)}
        />
        <BasicInput
          secureTextEntry={true}
          label="New Password"
          placeholder="Enter your Password"
          value={pwd} // Masking new password input
          onChangeText={(value) => handleChange('pwd', value)}
        />
        <BasicInput
          secureTextEntry={true}
          label="Confirm Password"
          placeholder="Renter your Password"
          value={confirmPassword} // Masking confirm password input
          onChangeText={handleConfirmPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleClick}
        style={{
          backgroundColor: 'teal',
          borderRadius: 999, // large number to make it round
          paddingVertical: 12,
          paddingHorizontal: 24,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>
          {loadingReset ? 'Resetting' : buttonResetText}
        </Text>
      </TouchableOpacity>
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

export default ResetForm;