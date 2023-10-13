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

function StopWatch() {
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
  } = useStopwatch({ autoStart: false });

  const timeSpent = () => {
    const currentDate = new Date();
    const showTime =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    let hoursSpent = currentDate.getHours() - hours;
    let minutesSpent = currentDate.getMinutes() - minutes;
    let secondsSpent = currentDate.getSeconds() - seconds;

    if (secondsSpent < 0) {
      minutesSpent--;
      secondsSpent += 60;
    }
    if (minutesSpent < 0) {
      hoursSpent--;
      minutesSpent += 60;
    }

    const res = hoursSpent + ":" + minutesSpent + ":" + secondsSpent;

    console.log(`Current Time: ${showTime}`);
    console.log(`Time Spent: ${res}`);
  };

  const handlePauseClick = () => {
    pause();
    timeSpent(); // Log the time when pausing
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.timer}>{days}</Text>
        </View>
        <View>
          <Text> : </Text>
        </View>
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
          <Text style={styles.timer}>{seconds}</Text>
        </View>
      </View>
      {/* <Text>{isRunning ? "Running" : "Not running"}</Text> */}
      {/* <TouchableOpacity onPress={reset}>
        <Text>Reset</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default StopWatch;

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
