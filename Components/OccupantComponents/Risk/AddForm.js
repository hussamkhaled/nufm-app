import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import BasicInput from "../../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DatePickerAndroid from "../../SharedComponents/DatePickerAndroid";
import DatePickerIOS from "../../SharedComponents/DatePickerIOS";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AddRiskActionCreator from "../../../Store/ActionCreator/Risk/AddRiskActionCreator";
import * as GetFacilitiesActionCreator from "../../../Store/ActionCreator/Fcaility/GetFacilitiesActionCreator";
import * as GetFacParentActionCreator from "../../../Store/ActionCreator/Fcaility/GetFacParentActionCreator";

function AddRiskO({
  getRiskInfo,
  addRisk,
  senderId,
  facilityId,
  risk,
  comment,
  error,
  loading,
  Facilities,
  getFacilities,
  getAllParent,
  parent,
}) {
  useEffect(() => {
    getFacilities();
    getAllParent();
    getRiskInfo("senderId", "");
    getRiskInfo("facilityId", "");
    getRiskInfo("risk", "");
    getRiskInfo("comment", "");
    getRiskInfo("error", "");
  }, []);
  const navigation = useNavigation();
  const siteName = Facilities.map((fn) => fn.name);

  const handleOnChange = (value, name) => {
    getRiskInfo(name, value);
  };

  const handleClick = () => {
    addRisk(senderId, facilityId, risk, comment);
  };
  return (
    <View style={styles.initialCont}>
      <View style={styles.iconsTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={32} color="#309694" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="close"
            size={26}
            color="#898989"
            style={styles.close}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Facility Site</Text>
          </View>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down-outline" size={20} color="#595959" />
            )}
            dropdownIconPosition="right"
            defaultButtonText="Select a site.."
            rowTextStyle={{
              color: "#595959",
            }}
            buttonStyle={styles.btnselectstyle}
            buttonTextStyle={styles.btnselectxtstyle}
            dropdownStyle={styles.dropdownHour}
            rowTextStyle={styles.rows}
            data={siteName}
            onSelect={(selectedItem, index) => {
              handleOnChange(selectedItem, "facilityId");
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            value={facilityId}
          />
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Risk</Text>
          </View>
          <TextInput
            style={styles.inputInc}
            keyboardType="default"
            multiline={true}
            onChangeText={(value) => handleOnChange(value, "risk")}
            value={risk}
          />
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Comment</Text>
          </View>
          <TextInput
            style={styles.inputInc}
            keyboardType="default"
            multiline={true}
            onChangeText={(value) => handleOnChange(value, "comment")}
            value={comment}
          />
        </View>
      </View>
      {error && (
        <View style={styles.errorMsg}>
          <AntDesign name="checkcircle" size={24} color="#02A962" />
          <Text style={styles.errorTxt}>{error}</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", marginBottom: "3%" }}>
        <View style={{ width: "30%" }}>
          <TouchableOpacity>
            <View style={styles.cancel}>
              <Text style={styles.canceltext}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%" }}>
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.save}>
              <Text style={styles.addSite}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    senderId: state.AddRiskR.senderId,
    facilityId: state.AddRiskR.facilityId,
    risk: state.AddRiskR.risk,
    comment: state.AddRiskR.comment,
    error: state.AddRiskR.error,
    loading: state.AddRiskR.loading,
    Facilities: state.GetFacilitiesR.Facilities,
    parent: state.GetAllParentR.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: () => dispatch(GetFacilitiesActionCreator.getFacilities()),
    getAllParent: () => dispatch(GetFacParentActionCreator.getAllParent()),
    getRiskInfo: (name, value) =>
      dispatch(AddRiskActionCreator.getRiskInfo(name, value)),
    addRisk: (senderId, facilityId, risk, comment) =>
      dispatch(
        AddRiskActionCreator.addRisk(senderId, facilityId, risk, comment)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRiskO);

const styles = StyleSheet.create({
  initialCont: {
    justifyContent: "space-between",
    flexDirection: "column",
  },
  iconsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6%",
    marginHorizontal: "6%",
  },
  input: {
    width: "100%",
    aspectRatio: 8.6 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
    paddingRight: "2%",
  },
  inputInc: {
    width: "100%",
    aspectRatio: 4.5 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
    paddingRight: "2%",
  },
  dropdownHour: {
    borderRadius: 8,
    marginTop: "-7%",
  },
  rows: {
    fontSize: RFPercentage(1.8),
  },
  btnselectstyle: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "2%",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnHourStyle: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "2%",
    height: 40,
    width: "30%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnselectxtstyle: {
    fontSize: RFPercentage(1.8),
    color: "#595959",
    textAlign: "left",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "8%",
    marginTop: "3%",
  },
  subCont: {
    flexDirection: "column",
    width: "90%",
    marginTop: "4%",
  },
  inputSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  label: {
    paddingLeft: "1.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "white",
    paddingLeft: "2%",
  },
  canceltext: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#309694",
    paddingLeft: "2%",
  },
  save: {
    backgroundColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "3%",
    justifyContent: "center",
    marginBottom: "7%",
    marginHorizontal: "7%",
  },
  cancel: {
    borderWidth: 1.5,
    borderColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "5%",
    justifyContent: "center",
    marginBottom: "7%",
    marginLeft: "18%",
  },
  errorMsg: {
    marginHorizontal: "5%",
    marginBottom: "7%",
    backgroundColor: "#CAF3D1",
    flexDirection: "row",
    padding: "3.5%",
    borderRadius: 12,
    alignItems: "center",
  },
  errorTxt: {
    fontWeight: "bold",
    paddingHorizontal: "4%",
    color: "#595959",
  },
});
