import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";


export const getAttendanceInfo = (name, value) => {
  console.log(name +"aaa"+value+"vvv");
  return {
    type: actionTypes.GetCheckById.ADD_ATTENDANCE,
    name: name,
    value: value,
  };
};

export const getCheckById = (id) => {
  console.log(id);
  return (dispatch) => {

    // var token = "Bearer " + localStorage.getItem("nufmtoken"); 
    var link = server + "/avh/nufm/v1/public/attendance/workers?facility=" + id;
    console.log(id +"dataa2");
    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {
    
      
    
          dispatch(getCheckByIdEnd(res.data));
          console.log(res.data +"dataa");
        }
      )
      .catch((err) => {
        dispatch(getCheckByIdFail(err));
        console.log(err + "error")
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

    var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = `${server}/avh/nufm/v1/public/attendance/workerFacility?facility=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`;
    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {

       
          dispatch(getAttendByIdEnd(res.data));
          console.log(res.data +"kkk")
        
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