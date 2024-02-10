import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getContractors = () => {
  return (dispatch) => {
    dispatch(getContractorsStart());

    // var token = 'Bearer '+localStorage.getItem('nufmtoken');

    var link = server + privatePath + "/contractors";
    axios
      .get(link, {
        headers: {
          /*'Authorization': token,*/
        },
      })
      .then((res) => {
        dispatch(getContractorsEnd(res.data));
      })
      .catch((err) => {
        dispatch(getContractorsFail(err));
      });
  };
};

export const getContractorsStart = () => {
  return {
    type: actionTypes.GetContractors.GETCONTRACTORS_START,
  };
};

export const getContractorsFail = (err) => {
  return {
    type: actionTypes.GetContractors.GETCONTRACTORS_FAIL,
    error: err,
  };
};

export const getContractorsEnd = (data) => {
  return {
    type: actionTypes.GetContractors.GETCONTRACTORS_END,
    contractorInfo: data,
  };
};
