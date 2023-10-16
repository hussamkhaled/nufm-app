import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import * as Location from "expo-location";
import * as AddAttendanceActionCreator from "../../Store/ActionCreator/Attendance/AddAttendanceActionCreator";
import * as GetFacilitiesByUserId from "../../Store/ActionCreator/Attendance/GetFacilitiesByUserId";
import * as GetTasksActionCreator from "../../Store/ActionCreator/Task/GetTasksByUserId";
import { connect } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

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
  getAllTaskInfoByUserId,
}) {
  const [semail, setSEmail] = useState("");
  const fN = async () => {
    try {
      const adname = await AsyncStorage.getItem("email");
      if (adname !== null) {
        setSEmail(adname);
        getFacilities(adname);
        getAllTaskInfoByUserId(adname);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    fN();
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
  const [disableCheck, setDisableCheck] = useState(false);
  const [disableCheck2, setDisableCheck2] = useState(false);

  const [checkType, setCheckType] = useState("");
  const [selected, setSelected] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleClick = () => {
    addAttendance(facility, semail, task, checkType, long, latitude);
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
      // start();
      setCheckType("CheckIn");
      if (location !== null) {
        setLat(JSON.stringify(location.coords.latitude));
        setLong(JSON.stringify(location.coords.longitude));
      }
      setToggleCheckBox(value);
      setDisableCheck2(true);
    } else {
      // pause();
      setLat("");
      setLong("");
      setToggleCheckBox(value);
      setDisableCheck2(false);
    }
  };

  const handleCheckOut = (value) => {
    if (!toggleCheckBox2) {
      // pause();
      setCheckType("CheckOut");
      if (location !== null) {
        setLat(JSON.stringify(location.coords.latitude));
        setLong(JSON.stringify(location.coords.longitude));
      }
      setToggleCheckBox2(value);
      setDisableCheck(true);
    } else {
      setLat("");
      setLong("");
      setToggleCheckBox2(value);
      setDisableCheck(false);
    }
  };

  const handleOnChangeFacility = (i) => {
    getAttendanceInfo("facility", Facilities[i].eid);
  };

  const handleOnChangeTask = (i) => {
    getAttendanceInfo("task", tasks[i].eid);
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
            value={task}
          />
        </View>
      </View>
      <View style={styles.checkboxes}>
        <View style={styles.checkAlign}>
          <CheckBox
            disabled={disableCheck}
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
            disabled={disableCheck2}
            color="#309694"
            style={{ borderRadius: 4, color: "#309694" }}
            value={toggleCheckBox2}
            onValueChange={(newValue) => handleCheckOut(newValue)}
          />
          <Text style={styles.checkText}>Check Out</Text>
          <Ionicons name="location" size={26} color="#023D26" />
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
                <Text style={styles.addSite}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "70%" }}>
            <TouchableOpacity>
              <View style={styles.save}>
                <Text style={styles.addSite}>Saving </Text>
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
    facility: state.AddAttendanceR.facility,
    task: state.AddAttendanceR.task,
    lat: state.AddAttendanceR.lat,
    user: state.AddAttendanceR.user,
    type: state.AddAttendanceR.type,
    lng: state.AddAttendanceR.lng,
    error: state.AddAttendanceR.error,
    loading: state.AddAttendanceR.loading,
    Facilities: state.GetAllFacilitiesByUserR.Facilities,
    tasks: state.GetAllTasksByUserR.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (email) =>
      dispatch(GetFacilitiesByUserId.getFacilitiesByUserId(email)),
    getAllTaskInfoByUserId: (email) =>
      dispatch(GetTasksActionCreator.getAllTaskInfoByUserId(email)),
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
    // aspectRatio: 8.6 / 1,
    height: 45,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
    paddingRight: "4%",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "6%",
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
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
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
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    marginLeft: "3%",
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
