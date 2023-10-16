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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useStopwatch } from "react-timer-hook";
import * as GetAttendanceByUserActionCreator from "../../Store/ActionCreator/Attendance/GetAttendanceByUser";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingComponent = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text></Text>
  </View>
);

function StopWatch({ getAttendanceByUser, Attendances }) {
  const fN = async () => {
    try {
      const adname = await AsyncStorage.getItem("email");
      if (adname !== null) {
        getAttendanceByUser(adname);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    fN();
  }, []);

  // useEffect(()=>{
  //   console.log(Attendances)
  // },[Attendances])
  const [loading, setLoading] = useState(true);
  const [initDate, setInitDate] = useState("");

  const [elapsedSeconds, setElapsedSeconds] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (elapsedSeconds > 0) {
      setTimerInterval(setInterval(updateTimer, 2000));
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [elapsedSeconds]);

  const updateTimer = () => {
    setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // return `${hours}:${minutes}:${Math.floor(seconds)}`;

    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.timer}>{hours}</Text>
          </View>
          <View>
            <Text> : </Text>
          </View>
          <View>
            <Text style={styles.timer}>{minutes}</Text>
          </View>
          <View>
            <Text> : </Text>
          </View>
          <View>
            <Text style={styles.timer}>{Math.floor(seconds)}</Text>
          </View>
        </View>
      </>
    );
  };

  const stopwatchOffset = new Date("2023-10-16T08:30:00.000Z");

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false, offsetTimestamp: stopwatchOffset });

  useEffect(() => {
    if (
      Attendances &&
      Attendances.checkIn &&
      Attendances.checkIn.date.length > 0
    ) {
      setInitDate(Attendances.checkIn.date);
      const diffDate = (new Date() - new Date(Attendances.checkIn.date)) / 1000;
      console.log(diffDate);
      setElapsedSeconds(diffDate);
      setLoading(false);
      start();
    }
  }, [Attendances]);

  return (
    <>
      {loading ? (
        // Display a loading indicator or placeholder content
        <LoadingComponent />
      ) : (
        // <Timer initDate={Attendances.checkIn.date} />
        <View style={styles.container}>
          {/* <View > */}
            {formatTime(elapsedSeconds)}
          {/* </View> */}
        </View>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    Attendances: state.GetAttendanceByUserR.Attendances,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttendanceByUser: (email) =>
      dispatch(GetAttendanceByUserActionCreator.getAttendanceByUser(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: hp("1%"),
    paddingRight: "4%",
  },
  timer: {
    backgroundColor: "#858585",
    borderRadius: 5,
    textAlign: "center",
    paddingHorizontal: "1%",
    color: "white",
  },
});
