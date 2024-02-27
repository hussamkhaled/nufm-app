import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Login from "../../assets/Login.png";
import BasicInput from "../../Components/SharedComponents/BasicInput";
import Buttons from "../../Components/SharedComponents/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";
import * as LoginActionCreators from "../../Store/ActionCreator/Login/LoginActionCreator";

const { width, height } = Dimensions.get("window");

function LoginLarge({
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
  let STORAGE_KEY = "@user_token";
  const [fName, setFname] = useState("");
  const [ntoken, setNtoken] = useState("");
  const [rEmail, setEmail] = useState("");
  const [keys, setKeys] = useState("");

  const onLoadFunc = () => {
    setFname("");
    setNtoken("");
    setEmail("");
    getLoginInfo("fullName", "");
    getLoginInfo("password", "");
    getLoginInfo("error", "");
    getLoginInfo("email", "");
    getLoginInfo("roles", "");
    getLoginInfo("profileImage", "");
    getLoginInfo("token", "");
  };

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunc();
    }, [])
  );

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("fullName", fullName);
      await AsyncStorage.setItem("nufmtoken", token);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("profileImage", profileImage);
      await AsyncStorage.setItem("roles", JSON.stringify(roles));
    } catch (e) {
      // alert('Failed to save the data to the storage')
    }
  };

  const kA = async () => {
    try {
      const ka = await AsyncStorage.getAllKeys();
      if (ka !== null) {
        setKeys(ka);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  const eM = async () => {
    try {
      const em = await AsyncStorage.getItem("email");
      if (em !== null) {
        setEmail(em);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  const fN = async () => {
    try {
      const fn = await AsyncStorage.getItem("fullName");
      if (fn !== null) {
        setFname(fn);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  const nT = async () => {
    try {
      const nt = await AsyncStorage.getItem("nufmtoken");
      if (nt !== null) {
        setNtoken(nt);
      }
    } catch (e) {
      alert("Failed to fetch the token from storage");
    }
  };

  useEffect(() => {
    fN();
    nT();
    eM();
    kA();
    if (fName !== fullName && ntoken !== token && rEmail !== email) {
      saveData();
    } else {
    }
  }, [fullName, token, email]);

  if (token !== "" && fullName !== "" && roles.length !== 0) {
    const role = roles[0];
    switch (role) {
      case "ROLE_WORKER":
        setImmediate(() => {
          getLoginInfo("loading", false);
          navigation.navigate("Worker/Home");
        });
        break;
      case "ROLE_ADMIN":
        setImmediate(() => {
          getLoginInfo("loading", false);
          navigation.navigate("Home");
        });
        break;
      case "ROLE_OCCUPANT":
        setImmediate(() => {
          getLoginInfo("loading", false);
          navigation.navigate("Occupant/Home");
        });
        break;
      case "ROLE_CONTRACTOR":
        setImmediate(() => {
          getLoginInfo("loading", false);
          navigation.navigate("Contractor/Home");
        });
        break;
      case "ROLE_OWNER":
        setImmediate(() => {
          getLoginInfo("loading", false);
          navigation.navigate("Owner");
        });
        break;
      default:
        setImmediate(() => {
          getLoginInfo("loading", false);
          navigation.navigate("Landing");
        });
        break;
    }
  }

  const handleOnChange = (value, name) => {
    getLoginInfo(name, value);
  };

  const submitForm = () => {
    getLoginInfo("loading", true);
    submitLogin(email, password);
  };
  return (
    <ImageBackground source={Login} resizeMode="cover" style={styles.image}>
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
        {error && (
          <View style={styles.errorMsg}>
            <AntDesign name="checkcircle" size={24} color="#D60C0C" />
            <Text style={styles.errorTxt}>{error}</Text>
          </View>
        )}
        {/* <Buttons text="Login" onPress={()=> navigation.navigate("Home")} /> */}
        <Buttons text="Login" onPress={submitForm} loading={loading} />
      </View>
    </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginLarge);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 40,
    justifyContent: "space-evenly",
    alignItems: "center",
    width:580,
    // width: width > 700 ? wp("70%") : wp("75%"),
    // height: width > 700 ? hp("80%") : hp("65%"),
    height:540,
    // marginVertical: width > 700 ? hp("15%") : hp("12%"),
    paddingVertical: width > 700 ? "5%" : "6%",
  },
  welcome: {
    color: "#023D26",
    fontWeight: "bold",
    fontSize: RFPercentage(4),
    textAlign: "center",
  },
  welcomeCont: {
    width: "100%",
    marginBottom: "3%",
  },
  inputs: {
    width: "100%",
    marginBottom: "8%",
  },
  errorMsg: {
    marginHorizontal: "5%",
    height: 55,
    backgroundColor: "#F9B7B7",
    flexDirection: "row",
    paddingHorizontal: "3.5%",
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
    marginBottom: width > 700 ? "2%" : "0%",
  },
  errorTxt: {
    fontWeight: "bold",
    paddingHorizontal: "4%",
    color: "#D60C0C",
  },

  image: {
    width: wp("100%"),
    height: hp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
});
