import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getAttendanceInfo = (name, value) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE,
    name: name,
    value: value,
  };
};

export const addAttendance = (
  facility,
  task,
  user,
  type,
  lng,
  lat,
  timezone,
  attendanceImage
) => {
  return (dispatch) => {
    dispatch(addAttendanceStart());
    console.log(facility, task, user, type, lng, lat, attendanceImage);
    // Prepare the form data
    var fd = new FormData();
    var data = JSON.stringify({
      facility: facility,
      task: task,
      user: user,
      type: type,
      lng: lng,
      lat: lat,
      timezone: timezone,
    });
    fd.append("data", data);

    fd.append("attendanceImage", {
      uri: attendanceImage.uri, 
      name: attendanceImage.name, 
      type: attendanceImage.type, 
    });

    const link = server + privatePath + "/attendance";
    console.log(link);
    axios({
      method: "post",
      url: link,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization": `Bearer ${localStorage.getItem("nufmtoken")}`
      },
    })
      .then((res) => {
        console.log(res.data);

        dispatch(addAttendanceEnd(res.data));
      })
      .catch((err) => {
        console.log(err);

        dispatch(addAttendanceFail(err));
      });
  };
};

export const addAttendanceStart = () => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_START,
  };
};

export const addAttendanceFail = (err) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_FAIL,
    error: err,
  };
};

export const addAttendanceEnd = (data) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_END,
    data: data,
  };
};
