import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import BasicInput from "../../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DatePickerAndroid from "../../SharedComponents/DatePickerAndroid";
import DatePickerIOS from "../../SharedComponents/DatePickerIOS";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AddIncidentActionCreator from "../../../Store/ActionCreator/Incident/AddIncidentActionCreator";
import * as GetFacilitiesActionCreator from "../../../Store/ActionCreator/Fcaility/GetFacilitiesActionCreator";
import * as GetTasksActionCreator from "../../../Store/ActionCreator/Task/GetTasksActionCreator";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
function AddIncident({
  getIncidentInfo,
  addIncident,
  facilityId,
  senderId,
  taskId,
  date,
  ihour,
  incident,
  comment,
  error,
  loading,
  Facilities,
  getFacilities,
  tasks,
  getAllTaskInfo,
}) {
  useEffect(() => {
    fN();
    getFacilities();
    getAllTaskInfo();
    getIncidentInfo("facilityId", "");
    getIncidentInfo("taskId", "");
    getIncidentInfo("date", "");
    getIncidentInfo("ihour", "");
    getIncidentInfo("incident", "");
    getIncidentInfo("comment", "");
    getIncidentInfo("error", "");
  }, []);

  const [semail, setSEmail] = useState("");
  const fN = async () => {
    try {
      const adname = await AsyncStorage.getItem("email");
      if (adname !== null) {
        setSEmail(adname);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  const navigation = useNavigation();
  const siteName = Facilities.map((fn) => fn.name);
  const Tasks = tasks.map((wr) => wr.name);

  const handleOnChangeDate = (name, value) => {
    getIncidentInfo(name, value);
  };

  const handleOnChange = (value, name) => {
    getIncidentInfo(name, value);
  };

  const handleClick = () => {
    addIncident(semail, facilityId, taskId, date, ihour, incident, comment);
  };

  const handleOnChangeTask = (i) => {
    getIncidentInfo("taskId", tasks[i].eid);
  };

  const handleOnChangeFacility = (i) => {
    getIncidentInfo("facilityId", Facilities[i].eid);
  };

  return (
    <View style={styles.initialCont}>
      <View style={styles.iconsTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={width > 650 ? 38 : 30}
            color="#309694"
          />
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
            buttonStyle={styles.btnselectstyle}
            buttonTextStyle={styles.btnselectxtstyle}
            dropdownStyle={styles.dropdownHour}
            rowTextStyle={styles.rows}
            data={siteName}
            onSelect={(selectedItem, index) => {
              handleOnChangeFacility(index);
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
            <Text style={styles.label}>Task</Text>
          </View>
          <SelectDropdown
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down-outline" size={20} color="#595959" />
            )}
            dropdownIconPosition="right"
            defaultButtonText="Select a task.."
            buttonStyle={styles.btnselectstyle}
            buttonTextStyle={styles.btnselectxtstyle}
            dropdownStyle={styles.dropdownHour}
            rowTextStyle={styles.rows}
            data={Tasks}
            onSelect={(selectedItem, index) => {
              handleOnChangeTask(index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            value={taskId}
          />
        </View>
        <View style={styles.subCont}>
          {Platform.OS === "android" ? (
            <DatePickerAndroid
              label="Date"
              // value={date}
              handleOnChange={handleOnChangeDate}
              name="date"
            />
          ) : (
            <DatePickerIOS
              label="Date"
              // value={date}
              handleOnChange={handleOnChangeDate}
              name="date"
            />
          )}
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Hour</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleOnChange(value, "ihour")}
            value={ihour}
          />
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Incident</Text>
          </View>
          <TextInput
            style={styles.inputInc}
            keyboardType="default"
            onChangeText={(value) => handleOnChange(value, "incident")}
            value={incident}
            multiline={true}
          />
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Comment</Text>
          </View>
          <TextInput
            style={styles.inputInc}
            keyboardType="default"
            onChangeText={(value) => handleOnChange(value, "comment")}
            value={comment}
            multiline={true}
          />
        </View>
      </View>
      {error && (
        <View style={styles.errorMsg}>
          <AntDesign name="checkcircle" size={24} color="#02A962" />
          <Text style={styles.errorTxt}>{error}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: "5%",
          marginVertical: "5%",
          height: 50,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ width: "30%" }}>
          <TouchableOpacity>
            <View style={styles.cancel}>
              <Text style={styles.canceltext}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!loading ? (
          <View style={{ width: "70%" }}>
            <TouchableOpacity onPress={handleClick}>
              <View style={styles.save}>
                <Text style={styles.addSite}>Send</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "70%" }}>
            <TouchableOpacity>
              <View style={styles.save}>
                <Text style={styles.addSite}>Sending... </Text>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    facilityParent: state.AddIncidentR.facilityParent,
    facilityId: state.AddIncidentR.facilityId,
    taskId: state.AddIncidentR.taskId,
    receiver: state.AddIncidentR.receiver,
    senderId: state.AddIncidentR.senderId,
    ihour: state.AddIncidentR.ihour,
    incident: state.AddIncidentR.incident,
    date: state.AddIncidentR.date,
    comment: state.AddIncidentR.comment,
    error: state.AddIncidentR.error,
    loading: state.AddIncidentR.loading,
    Facilities: state.GetFacilitiesR.Facilities,
    tasks: state.GetAllTasksR.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: () => dispatch(GetFacilitiesActionCreator.getFacilities()),
    getAllTaskInfo: () => dispatch(GetTasksActionCreator.getAllTaskInfo()),
    getIncidentInfo: (name, value) =>
      dispatch(AddIncidentActionCreator.getIncidentInfo(name, value)),
    addIncident: (
      senderId,
      facilityId,
      taskId,
      date,
      ihour,
      incident,
      comment
    ) =>
      dispatch(
        AddIncidentActionCreator.addIncident(
          senderId,
          facilityId,
          taskId,
          date,
          ihour,
          incident,
          comment
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddIncident);

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
    // aspectRatio: 8.6 / 1,
    height: 45,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
    paddingRight: "4%",
  },
  inputInc: {
    width: "100%",
    height: 120,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
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
    width: "100%",
    height: 45,
    // paddingVertical:"1.2%",
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
    marginBottom: "6%",
  },
  subCont: {
    flexDirection: "column",
    width: "90%",
    marginTop: "4%",
  },
  label: {
    paddingLeft: "1.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
  },
  item: {
    paddingVertical: "3%",
    paddingHorizontal: "4%",
  },
  placeholderStyle: {
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  selectedTextStyle: {
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  selectedStyle: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    marginTop: "10%",
    marginBottom: "1%",
    flexDirection: "row",
    marginHorizontal: "3%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: "2%",
    paddingVertical: "5%",
  },
  textSelectedStyle: {
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
    // paddingHorizontal: "2%",
    alignItems: "center",
    // paddingVertical: "4%",
    height: "100%",
    justifyContent: "center",
    marginLeft: "3%",
    // marginBottom: "12%",
    // marginHorizontal: "8%",
  },
  cancel: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    // paddingHorizontal: "0%",
    alignItems: "center",
    // paddingVertical: "4%",
    height: "100%",
    justifyContent: "center",
    // marginBottom: "12%",
    marginRight: "3%",
    borderWidth: 1.5,
    borderColor: "#309694",
  },
  errorMsg: {
    marginHorizontal: "5%",
    width: "90%",
    height: 55,
    marginBottom: "3%",
    backgroundColor: "#CAF3D1",
    flexDirection: "row",
    paddingHorizontal: "3.5%",
    borderRadius: 12,
    alignItems: "center",
  },
  errorTxt: {
    fontWeight: "bold",
    paddingHorizontal: "4%",
    color: "#595959",
  },
});
