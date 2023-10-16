import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getAttendanceByUser = (email) => {
  return (dispatch) => {
    

    // dispatch(getAttendancesStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/attendanceByUser?email="+ email;
    axios
      .get(link, {
        headers: {
          /*'Authorization': token,*/
        },
      })
      .then((res) => {

        dispatch(getAttendanceByUserEnd(res.data));
      })
      .catch((err) => {
        console.log(err)
        // dispatch(getAttendancesFail(err));
      });
  };
};

// export const getAttendancesStart = () => {
//   return {
//     type: actionTypes.GetAttendances.GET_ATTENDANCES_START,
//   };
// };

// export const getAttendancesFail = (err) => {
//   return {
//     type: actionTypes.GetAttendances.GET_ATTENDANCES_FAIL,
//     error: err,
//   };
// };

export const getAttendanceByUserEnd = (data) => {
  return {
    type: actionTypes.GetAttendances.GET_ATTENDANCES_BY_USER_END,
    data: data,
  };
};
