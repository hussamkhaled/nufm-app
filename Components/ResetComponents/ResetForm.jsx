import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BasicInput from "../../Components/SharedComponents/BasicInput";

 function ResetForm({ submitSet, getForgetInfo, emailS, token, pwd, loadingReset, buttonResetText }) {

  const [confirmPassword, setConfirmPassword] = useState('');
 
  const handleClick = () => {
    // console.log(emailS, pwd, token)
    if (pwd !== confirmPassword) {
      getForgetInfo('buttonResetText', 'Password Not Matched');
    } else {
      submitSet(emailS, pwd, token);
    }
  }
  const handleChange = (name, value) => {
    getForgetInfo(name, value);
  }

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  }

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
          onChangeText={handleChange}
        />
        <BasicInput
          label="New Password"
          placeholder="Enter your Password"
          name="pwd"
          value={pwd}
          onChangeText={handleChange}
          type="password"
        />
        <BasicInput
          label="Confirm Password"
          placeholder="Renter your Password"
          type="password"
          value={confirmPassword}
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

export default ResetForm