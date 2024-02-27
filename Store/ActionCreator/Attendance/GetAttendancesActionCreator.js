import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getAttendances = () => {
  return (dispatch) => {
    dispatch(getAttendancesStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + '/avh/nufm/v1/public/attendance/facilities';
    axios
      .get(link, {
        headers: {
          /*'Authorization': token,*/
        },
      })
      .then((res) => {
        dispatch(getAttendancesEnd(res.data));
      })
      .catch((err) => {
        dispatch(getAttendancesFail(err));
      });
  };
};

export const getAttendancesStart = () => {
  return {
    type: actionTypes.GetAttendances.GET_ATTENDANCES_START,
  };
};

export const getAttendancesFail = (err) => {
  return {
    type: actionTypes.GetAttendances.GET_ATTENDANCES_FAIL,
    error: err,
  };
};

export const getAttendancesEnd = (data) => {
  return {
    type: actionTypes.GetAttendances.GET_ATTENDANCES_END,
    data: data,
  };
};
