import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const deleteRiskInfo = (name, value) => {
  return {
    type: actionTypes.DeleteRisk.DELETE_RISK_INFO,
    name: name,
    value: value,
  };
};

export const deleteRisk = (eid) => {
  return (dispatch) => {
    // var token = 'Bearer '+localStorage.getItem('nufmtoken');
    var link = server + privatePath + "/risk/delete?risk=" + eid;

    axios
      .delete(link, {
        headers: {
          /*'Authorization': token*/
        },
      })
      .then((res) => {
        dispatch(deleteRiskEnd(res.data));
      })
      .catch((err) => {
        dispatch(deleteRiskFail(err));
      });
  };
};

export const deleteRiskEnd = (data) => {
  return {
    type: actionTypes.DeleteRisk.DELETE_RISK_END,
    data: data,
  };
};

export const deleteRiskFail = (err) => {
  return {
    type: actionTypes.DeleteRisk.DELETE_RISK_FAIL,
    error: err,
  };
};
