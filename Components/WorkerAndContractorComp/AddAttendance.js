import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BasicInput from "../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import * as Location from "expo-location";
import { connect } from "react-redux";
import * as AddAttendanceActionCreator from "../../Store/ActionCreator/Attendance/AddAttendanceActionCreator";
import * as GetFacilitiesActionCreator from "../../Store/ActionCreator/Fcaility/GetFacilitiesActionCreator";
import * as GetTasksActionCreator from "../../Store/ActionCreator/Task/GetTasksActionCreator";

function AddAttendance({
  link,
  addAttendance,
  getAttendanceInfo,
  facility,
  user,
  type,
  task,
  lng,
  lat,
  error,
  loading,
  Facilities,
  getFacilities,
  getAllParent,
  parent,
  tasks,
  getAllTaskInfo,
}) {
  useEffect(() => {
    getFacilities();
    getAllTaskInfo();
    getAttendanceInfo("facility", "");
    getAttendanceInfo("user", "");
    getAttendanceInfo("type", "");
    getAttendanceInfo("lng", "");
    getAttendanceInfo("lat", "");
    getAttendanceInfo("task", "");
    getAttendanceInfo("error", "");
  }, []);
  const siteName = Facilities.map((fn) => fn.name);
  const Tasks = tasks.map((wr) => wr.name);

  const handleOnChange = (value, name) => {
    getAttendanceInfo(name, value);
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [checkType, setCheckType] = useState("");
  const [selected, setSelected] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleClick = () => {
    addAttendance(facility, user, task, checkType, long, latitude);
    console.log(checkType);
    console.log(latitude);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleCheck = (value) => {
    if (!toggleCheckBox) {
      setCheckType("Check In");
      setLat(JSON.stringify(location.coords.latitude));
      setLong(JSON.stringify(location.coords.longitude));
      setToggleCheckBox(value);
    } else {
      setLat("");
      setLong("");
      setToggleCheckBox(value);
    }
  };

  const handleCheckOut = (value) => {
    if (!toggleCheckBox2) {
      setCheckType("Check Out");
      setLat(JSON.stringify(location.coords.latitude));
      setLong(JSON.stringify(location.coords.longitude));
      setToggleCheckBox2(value);
    } else {
      setLat("");
      setLong("");
      setToggleCheckBox2(value);
    }
  };
  return (
    <View style={styles.initialCont}>
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
              handleOnChange(selectedItem, "facility");
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            value={facility}
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
            rowTextStyle={{
              color: "#595959",
            }}
            buttonStyle={styles.btnselectstyle}
            buttonTextStyle={styles.btnselectxtstyle}
            dropdownStyle={styles.dropdownHour}
            rowTextStyle={styles.rows}
            data={Tasks}
            onSelect={(selectedItem, index) => {
              handleOnChange(selectedItem, "task");
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            value={task}
          />
        </View>
      </View>
      <View style={styles.checkboxes}>
        <View style={styles.checkAlign}>
          <CheckBox
            disabled={false}
            color="#309694"
            style={{ borderRadius: 4, color: "#309694" }}
            value={toggleCheckBox}
            onValueChange={(newValue) => handleCheck(newValue)}
          />
          <Text style={styles.checkText}>Check In</Text>
          <Ionicons name="location" size={26} color="#023D26" />
        </View>
        <View style={styles.checkAlign}>
          <CheckBox
            disabled={false}
            color="#309694"
            style={{ borderRadius: 4, color: "#309694" }}
            value={toggleCheckBox2}
            onValueChange={(newValue) => handleCheckOut(newValue)}
          />
          <Text style={styles.checkText}>Check Out</Text>
          <Ionicons name="location" size={26} color="#023D26" />
        </View>
      </View>
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
              <Text style={styles.addSite}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    facility: state.AddAttendanceR.facility,
    task: state.AddAttendanceR.task,
    lat: state.AddAttendanceR.lat,
    user: state.AddAttendanceR.user,
    type: state.AddAttendanceR.type,
    lng: state.AddAttendanceR.lng,
    error: state.AddAttendanceR.error,
    loading: state.AddAttendanceR.loading,
    Facilities: state.GetFacilitiesR.Facilities,
    tasks: state.GetAllTasksR.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: () => dispatch(GetFacilitiesActionCreator.getFacilities()),
    getAllTaskInfo: () => dispatch(GetTasksActionCreator.getAllTaskInfo()),
    getAttendanceInfo: (name, value) =>
      dispatch(AddAttendanceActionCreator.getAttendanceInfo(name, value)),
    addAttendance: (facility, user, task, type, lng, lat) =>
      dispatch(
        AddAttendanceActionCreator.addAttendance(
          facility,
          user,
          task,
          type,
          lng,
          lat
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance);

const styles = StyleSheet.create({
  initialCont: {
    justifyContent: "space-between",
    flexDirection: "column",
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
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "8%",
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
  btnselectxtstyle: {
    fontSize: RFPercentage(1.8),
    color: "#595959",
    textAlign: "left",
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
  checkboxes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15%",
    marginHorizontal: "7%",
  },
  checkAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkText: {
    paddingHorizontal: "2%",
    color: "#595959",
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
  },
});
