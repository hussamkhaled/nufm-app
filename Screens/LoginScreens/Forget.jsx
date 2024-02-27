import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ResetImage from "../../Components/ResetComponents/ResetImage";
import ForgetForm from "../../Components/ResetComponents/ForgetForm";
import * as ForgetActionCreator from "../../Store/ActionCreator/Forget/ForgetActionCreator";
import { connect } from "react-redux";


 function Reset({ getForgetInfo, forgemail, submitForget, token,loading, buttonText }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ResetImage />
      
      </ScrollView>
      <ForgetForm getForgetInfo={getForgetInfo} forgemail={forgemail} submitForget={submitForget} loading={loading} buttonText={buttonText}/>
    </View>
  );
}

const mapStateToProps = (state) => {
    return {
      forgemail: state.ForgetR.forgemail,
      token: state.ForgetR.token,
      error: state.ForgetR.error,
      loading: state.ForgetR.loading,
      buttonText: state.ForgetR.buttonText,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getForgetInfo: (name, value) =>
        dispatch(ForgetActionCreator.getForgetInfo(name, value)),
      submitForget: (forgemail) =>
        dispatch(ForgetActionCreator.submitForget(forgemail)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Reset);

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EAEAEA",
    },
  });
  