import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ResetImage from "../../Components/ResetComponents/ResetImage";
import ResetForm from "../../Components/ResetComponents/ResetForm";
import { connect } from "react-redux";
import * as ForgetActionCreator from "../../Store/ActionCreator/Forget/ForgetActionCreator";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Reset({ submitSet, getForgetInfo, emailS, oldpwd, pwd, loadingReset, buttonResetText }) {
  const [storedToken, setStoredToken] = useState(""); // State variable to hold the stored token

  useEffect(() => {
    const getStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("Nufmtoken1");
        if (storedToken !== null) {
          // Token found in AsyncStorage

          // Update token in Redux state if needed
          getForgetInfo("token", storedToken);
          // Set the stored token in state variable
          setStoredToken(storedToken);
        } else {
          // Token not found in AsyncStorage

        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    getStoredToken(); // Call the function when the component mounts
  }, [storedToken]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <ResetImage />
        <ResetForm submitSet={submitSet}
          getForgetInfo={getForgetInfo} pwd={pwd}
          storedToken={storedToken} emailS={emailS}
          oldpwd={oldpwd}
          loadingReset={loadingReset}
          buttonResetText={buttonResetText} />
      </ScrollView>
    </View>
  );
}


const mapStateToProps = (state) => {
  return {
    emailS: state.ForgetR.emailS,
    oldpwd: state.ForgetR.oldpwd,
    pwd: state.ForgetR.pwd,
    token: state.ForgetR.token,
    error: state.ForgetR.error,
    loadingReset: state.ForgetR.loadingReset,
    buttonResetText: state.ForgetR.buttonResetText,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForgetInfo: (name, value) =>
      dispatch(ForgetActionCreator.getForgetInfo(name, value)),
    submitSet: (emailS, oldpwd, pwd) =>
      dispatch(ForgetActionCreator.submitSet(emailS, oldpwd, pwd)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reset);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
});