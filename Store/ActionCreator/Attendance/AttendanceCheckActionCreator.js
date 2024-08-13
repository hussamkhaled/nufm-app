import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";


export const getAttendanceInfo = (name, value) => {
  return {
    type: actionTypes.GetCheckById.ADD_ATTENDANCE,
    name: name,
    value: value,
  };
};

export const getCheckById = (id) => {
  return (dispatch) => {

    // var token = "Bearer " + localStorage.getItem("nufmtoken"); 
    var link = server + "/avh/nufm/v1/public/attendance/workers?facility=" + id;
    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {
    
      
    
          dispatch(getCheckByIdEnd(res.data));
       }
      )
      .catch((err) => {
        dispatch(getCheckByIdFail(err));
      });
  };
};

export const getCheckByIdEnd = (data) => {
  return {
    type: actionTypes.GetCheckById.GET_CHECK_BY_ID_END,
    data: data,
  };
};

export const getCheckByIdFail = (err) => {
  return {
    type: actionTypes.GetCheckById.GET_CHECK_BY_ID_FAIL,
    error: err,
  };
};

export const getAttend = (id, email) => {
  return (dispatch) => {

    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = `${server}/avh/nufm/v1/public/attendance/workerFacility?facility=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`;
    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {

       
          dispatch(getAttendByIdEnd(res.data));
        
      })
      .catch((err) => {
        dispatch(getAttendByIdFail(err));
      });
  };
};

export const getAttendByIdEnd = (data) => {
  return {
    type: actionTypes.GetCheckById.GET_ATTEND_BY_ID_END,
    data: data,
  };
};

export const getAttendByIdFail = (err) => {
  return {
    type: actionTypes.GetCheckById.GET_ATTEND_BY_ID_FAIL,
    error: err,
  };
};