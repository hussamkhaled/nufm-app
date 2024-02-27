import axios from 'axios';
import * as actionTypes from '../../Actions/Actions';
import { server , privatePath}from '../Constants'

//---------------------Worker Id ----------------------

export const updateWorkerInfo = (name, value) => {
  console.log(name+"sss"+value+"uuu");
    return {
      type: actionTypes.UpdateWorker.UPDATEWORKER,
      name: name,
      value: value,
    };
  };

  export const updateWorker = (
    email,
    fullName,
    phone,
    specializations,
    street,
    address,
    department,
    city,
    dob,
    jobTitle,
    startDate,
    workType,
    zipCode,
    linkBack,
    certification,
    profileImage,
    eid,
    facilityId,
    wwcc,
    wwccExpDate,
    police,
    policeExpDate
  ) => {
    return (dispatch) => {
      console.log(fullName+"aaa");
      dispatch(updateWorkerStart());
  
      var fd = new FormData();
      var data = JSON.stringify({
        "email": email,
        "fullName": fullName,
        "specializations": specializations,
        "phone": phone,
        "street": street,
        "address": address,
        "department": department,
        "city": city,
        "dob": dob,
        "jobTitle": jobTitle,
        "startDate": startDate,
        "workType": workType,
        "zipCode": zipCode,
        "linkBack": linkBack,
        "facilities": facilityId,
        "wwcc": wwcc,
        "wwccExpDate": wwccExpDate,
        "police": police,
        "policeExpDate": policeExpDate,
      });
  
      fd.append("data", data);
      fd.append("profileImage", profileImage);
      fd.append("certification", certification);
      fd.append("workerId", eid);
  
      var token = "Bearer " + localStorage.getItem("nufmtoken");
  
  
      var link = server + privatePath + "/worker/update";
      axios({
        method: "put",
        url: link,
        data: fd,
        headers: {/* 'Authorization': token,*/ "Content-Type": "multipart/form-data", },
      })
        .then((res) => {
          if (res.data.message === "expectation failed") {
            dispatch(updateWorkerFail("expectation failed"));
          } else {
            dispatch(updateWorkerEnd(res.data));
         
          }
        })
        .catch((err) => {
  
          dispatch(updateWorkerFail(err));
        });
    };
  };
  
  export const updateWorkerStart = () => {
    return {
      type: actionTypes.UpdateWorker.UPDATEWORKER_START,
    };
  };
  
  export const updateWorkerEnd = (updateddata) => {
    return {
      type: actionTypes.UpdateWorker.UPDATEWORKER_END,
      data: updateddata,
    };
  };
  
  export const updateWorkerFail = (err) => {
    return {
      type: actionTypes.UpdateWorker.UPDATEWORKER_FAIL,
      error: err,
    };
  };
  
  


export const getWorkerById = (eid) =>{

    return dispatch =>{
        // var token = 'Bearer '+localStorage.getItem('nufmtoken');
        var link = server +  privatePath + '/worker/'+ eid;
            
           axios.get(link,{headers: {/*'Authorization': token,*/}})
                .then(res=>{
                        console.log(res.data)
                        dispatch(getWorkerByIdEnd(res.data));            
                }).catch(err => {
                    dispatch(getWorkerByIdFail(err));
                })     
      
    
}
}

export const getWorkerByIdEnd = (data) => {
       
    return{
        type: actionTypes.GetWorker.GET_WORKER_END,
        wr: data
    }
}

export const getWorkerByIdFail = (err) => {

    return{
        type: actionTypes.GetWorker.GET_WORKER_FAIL,
        error: err
    }
}