import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server , privatePath} from "../Constants";

export const getWorkerInfo = (name, value) => {
  return {
    type: actionTypes.AddWorker.ADD_WORKER,
    name: name,
    value: value,
  };
};

export const addWorker = (
  email,
  fullName,
  phone,
  specializations,
  facilityId
  // street,
  // address,
  // facilityId,
  // department,
  // city,
  // dob,
  // jobTitle,
  // startDate,
  // workType,
  // zipCode,
  // linkBack,
  // certification,
  // profileImage,
) => {
  return (dispatch) => {
    dispatch(addWorkerStart());

    // var token = 'Bearer '+localStorage.getItem('nufmtoken');
    var fd = new FormData();
    var data = JSON.stringify({
      "email": email,
      "fullName": fullName,
      "specializations": specializations,
      "phone": phone,
      "street": "",
      "address": "",
      "facilityId": facilityId,
      "department":"",
      "city": "",
      "dob": null,
      "jobTitle": "",
      "startDate": "",
      "workType": "",
      "zipCode":"",
      "linkBack": ""
    });
    fd.append("data", data);
    fd.append("profileImage", null);
    fd.append("certification", null);

    var link = server + privatePath+"/worker/add";
    axios({
      method: "post",
      url: link,
      data: fd,
      headers :{ /*'Authorization': token,*/ "Content-Type": "multipart/form-data" ,} ,
    })
      .then((res) => {
        if (res.data.message === "expectation failed") {
          dispatch(addWorkerFail("expectation failed"));
        } else {
          dispatch(addWorkerEnd(res.data));
        }
      })
      .catch((err) => {
        dispatch(addWorkerFail(err));
      });
  };
};

export const addWorkerStart = () => {
  return {
    type: actionTypes.AddWorker.ADD_WORKER_START,
  };
};

export const addWorkerFail = (err) => {
  return {
    type: actionTypes.AddWorker.ADD_WORKER_FAIL,
    error: err,
  };
};

export const addWorkerEnd = (data) => {
  return {
    type: actionTypes.AddWorker.ADD_WORKER_END,
    data: data,
  };
};