import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getFacilityInfo = (name, value) => {
  return {
    type: actionTypes.AddFacility.ADD_FACILITY,
    name: name,
    value: value,
  };
};

export const addFacility = (
  parentId,
  name,
  type,
  location,
  sqm,
  const_year,
  date_opened,
  street,
  post_code,
  description,
  primaryEmail,
  workSchedule,
) => {
  return (dispatch) => {
    dispatch(addFacilityStart());
    var fd = new FormData();
    var facilityData = JSON.stringify({
      "parentId": parentId,
      "name": name,
      "type": type,
      "location": location,
      "sqm": sqm,
      "const_year":const_year,
      "date_opened":date_opened,
      "street": street,
      "post_code": post_code,
      "description": description,
    });
    fd.append("facilityDoc", null);
    fd.append("facilityData", facilityData);
    fd.append("facilityPrimaryEmail", JSON.stringify(primaryEmail));
    fd.append("facilityWorkSchedule", JSON.stringify(workSchedule));
    // var token = 'Bearer '+localStorage.getItem('nufmtoken');
    var link = server + privatePath+"/facility/add";
    axios
      ({
        method: "post",
        url: link,
        data: fd,
        headers: { "Content-Type": "multipart/form-data", /*'Authorization': token*/ },
      })
      .then((res) => {
        if (res.data.message === "facility name  already exists") {
          dispatch(addFacilityFail("facility name  already exists"));
        } else if (res.data.message === "the facility name cannot be null") {
          dispatch(addFacilityFail("the facility name cannot be null"));
        } else {
          dispatch(addFacilityEnd(res.data));
        }
      })
      .catch((err) => {
        dispatch(addFacilityFail(err));
      });
  };
};

export const addFacilityStart = () => {
  return {
    type: actionTypes.AddFacility.ADD_FACILITY_START,
  };
};

export const addFacilityFail = (err) => {
  return {
    type: actionTypes.AddFacility.ADD_FACILITY_FAIL,
    error: err,
  };
};

export const addFacilityEnd = (data) => {
  return {
    type: actionTypes.AddFacility.ADD_FACILITY_END,
    data: data,
  };
};
