import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getOccupants = () => {
  return (dispatch) => {
    dispatch(getOccupantsStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/occupants";
    axios
      .get(link, {
        headers: {/*'Authorization': token,*/},})
      .then((res) => {
        dispatch(getOccupantsEnd(res.data));
      })
      .catch((err) => {
        dispatch(getOccupantsFail(err));
      });


  };
};

export const getOccupantsStart = () => {
  return {
    type: actionTypes.GetOccupants.GETOCCUPANTS_START,
  };
};

export const getOccupantsFail = (err) => {
  return {
    type: actionTypes.GetOccupants.GETOCCUPANTS_FAIL,
    error: err,
  };
};

export const getOccupantsEnd = (data) => {
  return {
    type: actionTypes.GetOccupants.GETOCCUPANTS_END,
    data: data,
  };
};
