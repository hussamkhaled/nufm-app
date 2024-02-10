import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getIncidentsByUser = (email) => {
  return (dispatch) => {
    var link = server + privatePath + "/incidentsByUser?email="+email;
    axios
      .get(link, {
        headers: {/*'Authorization': token,*/},})
      .then((res) => {
        dispatch(getIncidentsByUserEnd(res.data));
      })
      .catch((err) => {
        // dispatch(getIncidentsFail(err));
      });

  
  };
};

export const getIncidentsByUserEnd = (data) => {
  return {
    type: actionTypes.GetIncidents.GET_INCIDENTS_BY_USER_END,
    data: data,
  };
};
