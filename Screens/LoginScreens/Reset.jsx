import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ResetImage from "../../Components/ResetComponents/ResetImage";
import ResetForm from "../../Components/ResetComponents/ResetForm";
import { connect } from "react-redux";
import * as ForgetActionCreator from "../../Store/ActionCreator/Forget/ForgetActionCreator";
import { useRoute } from "@react-navigation/native";


function Reset({ submitSet, getForgetInfo,emailS, pwd, loadingReset, buttonResetText }) {



  return (
    <View style={styles.container}>
      <ScrollView>
        <ResetImage />
        <ResetForm  submitSet={submitSet}
                getForgetInfo={getForgetInfo} pwd={pwd}
                token={token} emailS={emailS}
                loadingReset={loadingReset}
                buttonResetText={buttonResetText} />
      </ScrollView>
    </View>
  );
}


const mapStateToProps = (state) => {
  return {
      emailS: state.ForgetR.emailS,
      token: state.ForgetR.token,
      pwd: state.ForgetR.pwd,
      error: state.ForgetR.error,
      loadingReset: state.ForgetR.loadingReset,
      buttonResetText: state.ForgetR.buttonResetText,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getForgetInfo: (name, value) =>
          dispatch(ForgetActionCreator.getForgetInfo(name, value)),
      submitSet: (emailS,pwd,token) =>
          dispatch(ForgetActionCreator.submitSet(emailS,pwd,token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reset);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
});