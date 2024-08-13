import React, { useState, useEffect, useRef  } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Button,
  Linking,
  Alert 
} from "react-native";
import { useStopwatch } from "react-timer-hook";
import BasicInput from "../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import * as Location from "expo-location";
import * as AddAttendanceActionCreator from "../../Store/ActionCreator/Attendance/AddAttendanceActionCreator";
import * as GetFacilitiesByUserId from "../../Store/ActionCreator/Attendance/GetFacilitiesByUserId";
import * as GetTasksActionCreator from "../../Store/ActionCreator/Task/GetTasksByUserId";
import * as AttendanceCheckActionCreator from "../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";
import { CameraView, Camera } from 'expo-camera';
//import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

function AddAttendance({
  link,
  addAttendance,
  facility,
  getAttendanceInfo,
  getCheckById,
  getAttend,
  user,
  type,
  task,
  lng,
  lat,
  attendanceImage,
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
  const [Tasks, setTasks] = useState("");
  const [facing, setFacing] = useState('back');
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
  const [isHiddenCameraOpen, setIsHiddenCameraOpen] = useState(false);
  const cameraRef = useRef(null);

  // console.log(id+"eeee"+email+"eeeee");

  useEffect(() => {
    fN();
    getAttendanceInfo("facility", "");
    getAttendanceInfo("user", "");
    getAttendanceInfo("type", "");
    getAttendanceInfo("lng", "");
    getAttendanceInfo("lat", "");
    getAttendanceInfo("task", "");
    getAttendanceInfo("attendanceImage", "");
    getAttendanceInfo("error", "");
  }, []);

  {}

  {/*
  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // Add your face recognition logic here with the captured photo
      console.log(photo);
      setIsCameraOpen(false);
      setIsHiddenCameraOpen(false); // Close the hidden camera after capturing the photo
      
      setTimeout(() => {
        navigation.navigate(link + "Home");
      }, 1000); 
    }
  };

  */}

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      try {
        // Capture the image
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);

        // Assuming you have these variables set
        const facility = selectedFacility;
        const user = semail;
        const task = task;
        const type = checkType;
        const lng = long;
        const lat = latitude;

        // Post the image and other data to the backend
        await addAttendance(facility, user, task, type, lng, lat, photo);

        // Hide the camera view
        setCameraVisible(false);

        // Navigate or show success message
        setTimeout(() => {
          navigation.navigate(link + "Home");
        }, 2000);
      } catch (error) {
        console.error('Error capturing or posting image:', error.message);
        // Handle error (show an alert or error message)
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const [cameraVisible, setCameraVisible] = useState(true);
  const toggleCameraFacing = () => {
    if (cameraRef.current) {
      setFacing(facing === 'back' ? 'front' : 'back');
    }
  };

  const siteName = Facilities.map((fn) => fn.name);
  // const Tasks = tasks.map((wr) => wr.name);

  useEffect(() => {
    if (facility.length > 0) {
      const ttt = tasks.filter((t) => t.facilityId === facility);
      // console.log(ttt.map((wr) => wr.name))
      setTasks(ttt.map((wr) => wr.name));
    }
  }, [facility]);

  const handleOnChange = (value, name) => {
    getAttendanceInfo(name, value);
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);
  const [disableCheck2, setDisableCheck2] = useState(false);

  const [checkType, setCheckType] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLat] = useState("");
  const [long, setLong] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [scannedButton, setScannedButton] = useState("Waiting Response");

  {/*
  const handleClick = () => {
    // if (checkType === "CheckIn" && checkedIn && saveAttempted && attempts > 0) {
    //   // Display alert indicating that the user cannot check in more than once until they check out
    //   alert("You cannot check in more than once until you check out.");
    // } else {
      
      addAttendance(selectedFacility, semail, task, checkType, long, latitude);
    //   if (checkType === "CheckIn") {
    //     setCheckedIn(true); // Set checkedIn to true when user checks in
    //     setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts when user checks in
    //   }
    //   setSaveAttempted(true); // Set saveAttempted to true on first save attempt
    // }

  };

*/}

const handleClick = async () => {
  try {
    await addAttendance(selectedFacility, semail, task, checkType, long, latitude);
    
    // Delay navigation for 5 seconds
    setTimeout(() => {
      navigation.navigate(link + "Home");
    }, 2000); // 5000 milliseconds = 5 seconds

  } catch (error) {
    console.error("Error adding attendance:", error);
    // Handle error if needed
  }
};


{/*
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location !== null) {
        setLat(JSON.stringify(location.coords.latitude));
        setLong(JSON.stringify(location.coords.longitude));
      }
    })();
  }, []);

*/}
{/*
useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (location !== null) {
      setLat(JSON.stringify(location.coords.latitude));
      setLong(JSON.stringify(location.coords.longitude));
    }
  })();
}, []);

let text = "Waiting..";
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = `Latitude: ${lat}, Longitude: ${long}`;
}
*/}

useEffect(() => {
  (async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location) {
        setLat(location.coords.latitude.toString());
        setLong(location.coords.longitude.toString());
      }
    } catch (error) {
      setErrorMsg("Error fetching location: " + error.message);
    }
  })();
}, []);


  const handleCheck = (value) => {
    if (!toggleCheckBox) {
      if (!checkedIn) {
        // start();
        setCheckType("CheckIn");
        if (location !== null) {
          setLat(JSON.stringify(location.coords.latitude));
          setLong(JSON.stringify(location.coords.longitude));
        }
        setToggleCheckBox(value);
        setDisableCheck2(true);
        setCheckedIn(true); // Set checkedIn to true when user checks in
      } else {
        // Alert user that they cannot check in more than once until they check out
        if (saveAttempted && attempts > 0) {
          alert("You cannot check in more than once until you check out.");
        }
      }
    } else {
      // pause();
      setLat("");
      setLong("");
      setToggleCheckBox(value);
      setDisableCheck2(false);
      setCheckedIn(false); // Reset checkedIn to false when user cancels check in
      setSaveAttempted(false); // Reset saveAttempted when user cancels check in
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
      setCheckedIn(false); // Set checkedIn to false when user checks out
      setSaveAttempted(false); // Reset saveAttempted when user checks out
      setAttempts(0); // Reset attempts when user checks out
    } else {
      setLat("");
      setLong("");
      setToggleCheckBox2(value);
      setDisableCheck(false);
    }
  };

  const handleOnChangeFacility = (i) => {
    console.log(i);
    // console.log(Facilities[i].eid)
    setSelectedFacility(Facilities[i].eid)
    getAttendanceInfo("facility", Facilities[i].eid);

  };

  const handleOnChangeTask = (i) => {
    getAttendanceInfo("task", tasks[i].eid);
  };

  const closeCamera2 = () => {
    setCameraVisible(false);
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null); // Variable to store scanned data
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  useEffect(() => {
    if (scannedData !== null) {
      //  console.log(scannedData); // Log scannedData whenever it changes
    }
  }, [scannedData]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    addAttendance(data, semail, task, checkType, long, latitude);

    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  
    setIsHiddenCameraOpen(true);
    {/*
    setTimeout(captureAndRecognizeFace, 1000); // Delay to ensure the camera is ready

    setTimeout(() => {
      navigation.navigate(link + "Home");
    }, 2000); // 2000 milliseconds = 2 seconds
    */}
  };
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setScanned(false); // Reset scanned state when closing camera
    setScannedData(null); // Reset scanned data when closing camera
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  // useEffect(() => {
  //   if (error.length > 0) {
  //     if (error === "Added Successfully") {
  //       setScannedButton("Added Successfully");
  //     } else {
  //       setScannedButton("Tap to Scan Again");
  //     }
  //   }
  // }, [error]);
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

        {/* {Tasks.length > 0 &&<View style={styles.subCont}>
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
} */}
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
                <Text  >Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "70%" }}>
            <TouchableOpacity>
              <View style={styles.save}>
                <Text >Saving </Text>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.containercam}>
      {!isCameraOpen ? (
        <TouchableOpacity onPress={openCamera} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, justifyContent: 'center', alignItems: 'center' }}>OR Open Camera</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }}>
          <CameraView
        
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'pdf417'],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          <TouchableOpacity onPress={closeCamera} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, justifyContent: 'center', alignItems: 'center' }}>Close Camera</Text>
          </TouchableOpacity>
        </View>
      )}
      {scanned && (
        <TouchableOpacity
          style={styles.scanAgain}
          onPress={() => setScanned(false)}
        >
          <Text style={{ marginBottom: 50 }}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
      </View>
      {isHiddenCameraOpen && cameraVisible &&(
        
<CameraView style={styles.cameracapture} facing={facing} ref={cameraRef}>
  <View style={styles.buttonContainercapture}>
    <TouchableOpacity style={styles.button1capture} onPress={toggleCameraFacing}>
      <Text style={styles.text1}>Flip Camera</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button2capture} onPress={captureAndRecognizeFace}>
      <Text style={styles.text2}>Capture and Recognize Face</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button3capture} onPress={closeCamera2}>
      <Text style={styles.text3}>Close Camera</Text>
    </TouchableOpacity>
  </View>
</CameraView>

      )}
    </View>
  
  );
}

const mapStateToProps = (state) => {
  return {
    facility: state.AddAttendanceR.facility,
    task: state.AddAttendanceR.task,
    lat: state.AddAttendanceR.lat,
    attendanceImage: state.AddAttendanceR.attendanceImage,
    user: state.AddAttendanceR.user,
    type: state.AddAttendanceR.type,
    lng: state.AddAttendanceR.lng,
    error: state.AddAttendanceR.error,
    loading: state.AddAttendanceR.loading,
    Facilities: state.GetAllFacilitiesByUserR.Facilities,
    checkIn: state.GetCheckByIdR.checkIn,
    checkOut: state.GetCheckByIdR.checkOut,
    user: state.GetCheckByIdR.user,
    task: state.GetCheckByIdR.task,
    facility: state.GetCheckByIdR.facility,
    status: state.GetCheckByIdR.status,
    id: state.GetCheckByIdR.id,
    email: state.GetCheckByIdR.email,
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
    addAttendance: (facility, user, task, type, lng, lat,attendanceImage) =>
      dispatch(
        AddAttendanceActionCreator.addAttendance(
          facility,
          user,
          task,
          type,
          lng,
          lat,
          attendanceImage
        )
      ),

    getAttend: (id, email) =>
      dispatch(AttendanceCheckActionCreator.getAttend(id, email)),

    getAttendanceInfo: (name, value) =>
      dispatch(AttendanceCheckActionCreator.getAttend(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance);

const styles = StyleSheet.create({
  initialCont: {
    justifyContent: "space-between",
    flexDirection: "column",
    height:100,
    marginTop:200,
   
    // height: "100%"
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
    // fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "white",
    paddingLeft: "2%",
    height: '10%'
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
    color: "white",
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
  containercam: {
    flex: 1,
    height: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  
  
  },
  cameraView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  captureButton: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
  },
  captureButtonText: {
    fontSize: 16,
    color: '#000',
  },
  initialCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containercam: {
    flex: 1,
    width: '50%',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },

   camera: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
  },
  buttonContainer: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent:"center",
    alignItems:"center",
    marginTop: 80,
  },
  button1: {
    marginTop:50,
   
    
  },
  button2: {
    marginTop:20,
  },

  cameracapture: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,

  },
  button1capture: {
    marginTop:10,
  
    
  },
  button2capture: {
    marginTop:10,
  },
  button3capture:{
    marginTop:10,
  },
  buttonContainercapture: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent:"center",
    alignItems:"center",
    marginTop: 80,
  }
});



{/*

//old code :




import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Button,
  Linking,
} from "react-native";
import { useStopwatch } from "react-timer-hook";
import BasicInput from "../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import * as Location from "expo-location";
import * as AddAttendanceActionCreator from "../../Store/ActionCreator/Attendance/AddAttendanceActionCreator";
import * as GetFacilitiesByUserId from "../../Store/ActionCreator/Attendance/GetFacilitiesByUserId";
import * as GetTasksActionCreator from "../../Store/ActionCreator/Task/GetTasksByUserId";
import * as AttendanceCheckActionCreator from "../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";
import { Camera } from "expo-camera";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

function AddAttendance({
  link,
  addAttendance,
  facility,
  getAttendanceInfo,
  getCheckById,
  getAttend,
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
  const [Tasks, setTasks] = useState("");
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

  // console.log(id+"eeee"+email+"eeeee");

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
  // const Tasks = tasks.map((wr) => wr.name);

  useEffect(() => {
    if (facility.length > 0) {
      const ttt = tasks.filter((t) => t.facilityId === facility);
      // console.log(ttt.map((wr) => wr.name))
      setTasks(ttt.map((wr) => wr.name));
    }
  }, [facility]);

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
  const [checkedIn, setCheckedIn] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [scannedButton, setScannedButton] = useState("Waiting Response");

  const handleClick = () => {
    if (checkType === "CheckIn" && checkedIn && saveAttempted && attempts > 0) {
      // Display alert indicating that the user cannot check in more than once until they check out
      alert("You cannot check in more than once until you check out.");
    } else {
      addAttendance(facility, semail, task, checkType, long, latitude);
      if (checkType === "CheckIn") {
        setCheckedIn(true); // Set checkedIn to true when user checks in
        setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts when user checks in
      }
      setSaveAttempted(true); // Set saveAttempted to true on first save attempt
    }
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
      if (location !== null) {
        setLat(JSON.stringify(location.coords.latitude));
        setLong(JSON.stringify(location.coords.longitude));
      }
    })();
  }, []);

  const handleCheck = (value) => {
    if (!toggleCheckBox) {
      if (!checkedIn) {
        // start();
        setCheckType("CheckIn");
        if (location !== null) {
          setLat(JSON.stringify(location.coords.latitude));
          setLong(JSON.stringify(location.coords.longitude));
        }
        setToggleCheckBox(value);
        setDisableCheck2(true);
        setCheckedIn(true); // Set checkedIn to true when user checks in
      } else {
        // Alert user that they cannot check in more than once until they check out
        if (saveAttempted && attempts > 0) {
          alert("You cannot check in more than once until you check out.");
        }
      }
    } else {
      // pause();
      setLat("");
      setLong("");
      setToggleCheckBox(value);
      setDisableCheck2(false);
      setCheckedIn(false); // Reset checkedIn to false when user cancels check in
      setSaveAttempted(false); // Reset saveAttempted when user cancels check in
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
      setCheckedIn(false); // Set checkedIn to false when user checks out
      setSaveAttempted(false); // Reset saveAttempted when user checks out
      setAttempts(0); // Reset attempts when user checks out
    } else {
      setLat("");
      setLong("");
      setToggleCheckBox2(value);
      setDisableCheck(false);
    }
  };

  const handleOnChangeFacility = (i) => {
    getAttendanceInfo("facility", Facilities[i].eid);

    console.log(getAttendanceInfo("facility", Facilities[i].eid));
  };

  const handleOnChangeTask = (i) => {
    getAttendanceInfo("task", tasks[i].eid);
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null); // Variable to store scanned data

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (scannedData !== null) {
      //  console.log(scannedData); // Log scannedData whenever it changes
    }
  }, [scannedData]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data); // Store scanned data in variable
    // alert(`Scanned QR code with type ${type} and data: ${data}`);
    // let { status } =  Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   setErrorMsg("Permission to access location was denied");
    //   return;
    // }

    let location = await Location.getCurrentPositionAsync({});
    // setLocation(location);
    // if (location !== null) {
    //   setLat(JSON.stringify(location.coords.latitude));
    //   setLong(JSON.stringify(location.coords.longitude));
    // }
    console.log("*******************");
    addAttendance(
      data,
      semail,
      "",
     "CheckOut",
      JSON.stringify(location.coords.longitude),
      JSON.stringify(location.coords.latitude)
    );
    console.log("*******************");
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setScanned(false); // Reset scanned state when closing camera
    setScannedData(null); // Reset scanned data when closing camera
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  // useEffect(() => {
  //   if (error.length > 0) {
  //     if (error === "Added Successfully") {
  //       setScannedButton("Added Successfully");
  //     } else {
  //       setScannedButton("Tap to Scan Again");
  //     }
  //   }
  // }, [error]);
  return (
    <View style={styles.initialCont}>
      <View style={styles.containercam}>
      
        <View style={{ flex: 1, width: "100%" }}>
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        
        </View>
       
        {scanned && (
          <View style={{ width: "70%"}}>
            <TouchableOpacity onPress={() => setScanned(false)}>
              <View style={styles.save}>
            
                <Text style={styles.addSite}>{error}</Text>
              </View>
            </TouchableOpacity>
          </View>

          // <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        )}
        
        {/*
      {scannedData && (
        <Text style={{marginTop:20}}>Scanned Data: {scannedData} </Text>
        
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
    checkIn: state.GetCheckByIdR.checkIn,
    checkOut: state.GetCheckByIdR.checkOut,
    user: state.GetCheckByIdR.user,
    task: state.GetCheckByIdR.task,
    facility: state.GetCheckByIdR.facility,
    status: state.GetCheckByIdR.status,
    id: state.GetCheckByIdR.id,
    email: state.GetCheckByIdR.email,
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

    getAttend: (id, email) =>
      dispatch(AttendanceCheckActionCreator.getAttend(id, email)),

    getAttendanceInfo: (name, value) =>
      dispatch(AttendanceCheckActionCreator.getAttend(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance);

const styles = StyleSheet.create({
  initialCont: {
    justifyContent: "space-between",
    flexDirection: "column",
    // height: "100%"
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
    // fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "white",
    paddingLeft: "2%",
    height: '10%'
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
  containercam: {
    flex: 1,
    height: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});


*/}