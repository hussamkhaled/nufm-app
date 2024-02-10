import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getIncidents = () => {
  return (dispatch) => {
    dispatch(getIncidentsStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/incidents";
    axios
      .get(link, {
        headers: {/*'Authorization': token,*/},})
      .then((res) => {
        dispatch(getIncidentsEnd(res.data));
      })
      .catch((err) => {
        dispatch(getIncidentsFail(err));
      });

  
  };
};

export const getIncidentsStart = () => {
  return {
    type: actionTypes.GetIncidents.GET_INCIDENTS_START,
  };
};

export const getIncidentsFail = (err) => {
  return {
    type: actionTypes.GetIncidents.GET_INCIDENTS_FAIL,
    error: err,
  };
};

export const getIncidentsEnd = (data) => {
  return {
    type: actionTypes.GetIncidents.GET_INCIDENTS_END,
    data: data,
  };
};
