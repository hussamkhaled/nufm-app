import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BasicInput from "../../Components/SharedComponents/BasicInput";
import Buttons from "../../Components/SharedComponents/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as LoginActionCreators from "../../Store/ActionCreator/Login/LoginActionCreator";

function LoginForm({
  email,
  password,
  fullName,
  profileImage,
  phone,
  creationDate,
  message,
  roles,
  loading,
  error,
  token,
  getLoginInfo,
  submitLogin,
}) {
  const navigation = useNavigation();

  const handleOnChange = (value, name) => {
    getLoginInfo(name, value);
  };

  const submitForm = () => {
    submitLogin(email, password);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("fullName", fullName);
      await AsyncStorage.setItem("nufmtoken", token);
      await AsyncStorage.setItem("profileImage", profileImage);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("roles", JSON.stringify(roles));
    } catch (e) {
      // alert('Failed to save the data to the storage')
    }
  };

  const fN = async () => {
    try {
      await AsyncStorage.getItem("fullName");
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  const nT = async () => {
    try {
      await AsyncStorage.getItem("nufmtoken");
    } catch (e) {
      alert("Failed to fetch the token from storage");
    }
  };

  useEffect(() => {
    if (fN !== fullName && nT !== token) {
      saveData();
    } else {
    }
  }, [fullName, token]);

  if (token !== "" && fullName !== "" && roles.length !== 0) {
    const role = roles[0];
    switch (role) {
      case "ROLE_WORKER":
        navigation.navigate("Worker/Home");
        break;
      case "ROLE_ADMIN":
        navigation.navigate("Home");
        break;
      case "ROLE_OCCUPANT":
        navigation.navigate("Occupant/Home");
        break;
      case "ROLE_CONTRACTOR":
        navigation.navigate("Contractor/Home");
        break;
      case "ROLE_OWNER":
        navigation.navigate("Owner");
        break;
      default:
        navigation.navigate("Landing");
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeCont}>
        <Text style={styles.welcome}>Welcome !</Text>
      </View>
      <View style={styles.inputs}>
        <BasicInput
          label="Email"
          keyboardType="email-address"
          placeholder="Enter your Email here"
          value={email}
          onChangeText={(value) => handleOnChange(value, "email")}
        />
        <BasicInput
          label="Password"
          bool={true}
          placeholder="Enter your Password"
          value={password}
          onChangeText={(value) => handleOnChange(value, "password")}
        />
      </View>
      <Buttons text="Login" onPress={()=> navigation.navigate("Home")} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.LoginR.email,
    roles: state.LoginR.roles,
    password: state.LoginR.password,
    fullName: state.LoginR.fullName,
    token: state.LoginR.token,
    profileImage: state.LoginR.profileImage,
    phone: state.LoginR.phone,
    loading: state.LoginR.loading,
    creationDate: state.LoginR.creationDate,
    message: state.LoginR.message,
    error: state.LoginR.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginInfo: (name, value) =>
      dispatch(LoginActionCreators.getLoginInfo(name, value)),
    submitLogin: (email, password) =>
      dispatch(LoginActionCreators.submitLogin(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

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
    paddingBottom: "10%",
    marginHorizontal: "3%",
  },
  text: {
    color: "#023D26",
    fontSize: RFPercentage(2),
  },
  welcome: {
    color: "#023D26",
    fontWeight: "bold",
    fontSize: RFPercentage(4.5),
    textAlign: "center",
  },
  welcomeCont: {
    width: "100%",
    marginVertical: "4%",
    paddingTop: "5%",
  },
  inputs: {
    width: "100%",
    marginBottom: "8%",
  },
});
