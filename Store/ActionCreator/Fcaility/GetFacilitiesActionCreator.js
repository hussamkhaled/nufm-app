import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getFacilities = () => {
  return (dispatch) => {
    dispatch(getFacilitiesStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/facilities";
    axios
      .get(link, {
        headers: {/*'Authorization': token,*/},})
      .then((res) => {
        dispatch(getFacilitiesEnd(res.data));
      })
      .catch((err) => {
        dispatch(getFacilitiesFail(err));
      });

  };
};

export const getFacilitiesStart = () => {
  return {
    type: actionTypes.GetFacilities.GET_FACILITIES_START,
  };
};

export const getFacilitiesFail = (err) => {
  return {
    type: actionTypes.GetFacilities.GET_FACILITIES_FAIL,
    error: err,
  };
};

export const getFacilitiesEnd = (data) => {
  return {
    type: actionTypes.GetFacilities.GET_FACILITIES_END,
    data: data,
  };
};
