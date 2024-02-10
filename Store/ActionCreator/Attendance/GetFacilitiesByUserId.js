import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getFacilitiesByUserId = (email) => {
    return (dispatch) => {
    //   dispatch(getAttendancesStart());
      // var token = "Bearer " + localStorage.getItem("nufmtoken");
      var link = server + privatePath + "/worker/facilities/"+email;
      axios
        .get(link, {
          headers: {
            /*'Authorization': token,*/
          },
        })
        .then((res) => {
          dispatch(getFacilitiesByUserIdEnd(res.data));
        })
        .catch((err) => {
        //   dispatch(getAttendancesFail(err));
        });
    };
  };

  export const getFacilitiesByUserIdEnd = (data) => {
    return {
      type: actionTypes.GetAllFacilitiesByUserId.GETALLFACILITIESBYUSERID,
      data: data,
    };
  };