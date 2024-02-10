import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getCheckById = (eid) => {
  return (dispatch) => {
   
    // var token = "Bearer " + localStorage.getItem("nufmtoken"); 
    var link = server + privatePath + "/attendanceById?attendance=" + eid;

    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {
        if (res.data.message === "expectation failed") {
          dispatch(getCheckByIdFail("expectation failed"));
        } else {
          dispatch(getCheckByIdEnd(res.data));
        }
      })
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
