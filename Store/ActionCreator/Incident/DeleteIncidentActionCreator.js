import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const deleteIncidentInfo = (name, value) => {
  return {
    type: actionTypes.DeleteIncident.DELETE_INCIDENT_INFO,
    name: name,
    value: value,
  };
};

export const deleteIncident = (eid) => {
  return (dispatch) => {
    // var token = 'Bearer '+localStorage.getItem('nufmtoken');
    var link = server + privatePath + "/incident/delete?incident=" + eid;

    axios
      .delete(link, {
        headers: {
          /*'Authorization': token*/
        },
      })
      .then((res) => {
        dispatch(deleteIncidentEnd(res.data));
      })
      .catch((err) => {
        dispatch(deleteIncidentFail(err));
      });
  };
};

export const deleteIncidentEnd = (data) => {
  return {
    type: actionTypes.DeleteIncident.DELETE_INCIDENT_END,
    data: data,
  };
};

export const deleteIncidentFail = (err) => {
  return {
    type: actionTypes.DeleteIncident.DELETE_INCIDENT_FAIL,
    error: err,
  };
};
