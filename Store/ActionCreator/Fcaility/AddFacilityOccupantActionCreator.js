import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getFacilityOccupantInfo = (name, value) => {
  return {
    type: actionTypes.AddFacilityOccupant.ADD_FACILITY_OCC,
    name: name,
    value: value,
  };
};

export const addFacilityOccupant = (
email,
fullName,
phone,
notes,
landline,
jobTitle,
eid
) => {
  return (dispatch) => {
    dispatch(addFacilityOccupantStart());
    var fd = new FormData();
    var occupantData = JSON.stringify({
      "email":email,
      "fullName": fullName,
      "phone": phone,
      "notes": notes,
      "landline": landline,
      "jobTitle":jobTitle
    });
    fd.append("occupantData", occupantData);
    fd.append("profileImage", null);
    fd.append("facility", eid);

    // var token = 'Bearer '+localStorage.getItem('nufmtoken');
    var link = server +  privatePath + "/facility/addOccupant";
    axios
      ({
        method: "post",
        url: link,
        data: fd,
        headers: { "Content-Type": "multipart/form-data", /*'Authorization': token */},
      })
      .then((res) => {
        if (res.data.message === "facility name  already exists") {
          dispatch(addFacilityOccupantFail("facility name  already exists"));
        } else if (res.data.message === "the facility name cannot be null") {
          dispatch(addFacilityOccupantFail("the facility name cannot be null"));
        } else {
          dispatch(addFacilityOccupantEnd(res.data));
        }
      })
      .catch((err) => {
        dispatch(addFacilityOccupantFail(err));
      });
  };
};

export const addFacilityOccupantStart = () => {
  return {
    type: actionTypes.AddFacilityOccupant.ADD_FACILITY_OCC_START,
  };
};

export const addFacilityOccupantFail = (err) => {
  return {
    type: actionTypes.AddFacilityOccupant.ADD_FACILITY_OCC_FAIL,
    error: err,
  };
};

export const addFacilityOccupantEnd = (data) => {
  return {
    type: actionTypes.AddFacilityOccupant.ADD_FACILITY_OCC_END,
    data: data,
  };
};
