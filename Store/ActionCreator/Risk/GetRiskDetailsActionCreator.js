import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getRiskDetails = (eid) => {
  return (dispatch) => {
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/riskById?risk=" + eid;

    axios
      .get(link, {
        headers: {
          /*Authorization: token*/
        },
      })
      .then((res) => {
        if (res.data.message === "expectation failed") {
          dispatch(getRiskDetailsFail("expectation failed"));
        } else {
          dispatch(getRiskDetailsEnd(res.data));
        }
      })
      .catch((err) => {
        dispatch(getRiskDetailsFail(err));
      });
  };
};

export const getRiskDetailsEnd = (data) => {
  return {
    type: actionTypes.GetRiskDetails.GET_RISK_DETAILS_END,
    data: data,
  };
};

export const getRiskDetailsFail = (err) => {
  return {
    type: actionTypes.GetRiskDetails.GET_RISK_DETAILS_END,
    error: err,
  };
};
