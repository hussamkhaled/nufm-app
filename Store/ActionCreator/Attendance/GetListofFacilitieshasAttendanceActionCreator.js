import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server } from "../Constants";

export const getFacilitieshasattendance = () => {
  return (dispatch) => {
    dispatch(getFacilitiesattendanceStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + "/avh/nufm/v1/public/attendance/facilities";
    axios
      .get(link, {
        headers: {/*'Authorization': token,*/},})
      .then((res) => {
        dispatch(getFacilitiesattendanceEnd(res.data));
       
      })
      .catch((err) => {
        dispatch(getFacilitiesattendanceFail(err));
      });

  };
};

export const getFacilitiesattendanceStart = () => {
  return {
    type: actionTypes.GetListofFacilitieshasAttendance.GET_FACILITIESATTENDANCE_START,
  };
};

export const getFacilitiesattendanceFail = (err) => {
  return {
    type: actionTypes.GetListofFacilitieshasAttendance.GET_FACILITIESATTENDANCE_FAIL,
    error: err,
  };
};

export const getFacilitiesattendanceEnd = (data) => {
  return {
    type: actionTypes.GetListofFacilitieshasAttendance.GET_FACILITIESATTENDANCE_END,
    data: data,
  };
};
