import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getIncidentDetails = (eid) => {
  return (dispatch) => {
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/incidentById?incident=" + eid;

    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {
        if (res.data.message === "expectation failed") {
          dispatch(getIncidentDetailsFail("expectation failed"));
        } else {
          dispatch(getIncidentDetailsEnd(res.data));
        }
      })
      .catch((err) => {
        dispatch(getIncidentDetailsFail(err));
      });
  };
};

export const getIncidentDetailsEnd = (data) => {
  return {
    type: actionTypes.GetIncidentDetails.GET_INCIDENT_DETAILS_END,
    data: data,
  };
};

export const getIncidentDetailsFail = (err) => {
  return {
    type: actionTypes.GetIncidentDetails.GET_INCIDENT_DETAILS_END,
    error: err,
  };
};
