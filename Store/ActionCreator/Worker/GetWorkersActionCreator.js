import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getWorkers = () => {
  return (dispatch) => {
    // dispatch(getWorkersStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    // var link = server + privatePath + "/workers";
    // axios
    //   .get(link, {
    //     headers: {/*'Authorization': token,*/},})
    //   .then((res) => {
    //     dispatch(getWorkersEnd(res.data));
    //   })
    //   .catch((err) => {
    //     dispatch(getWorkersFail(err));
    //   });

    const Wr = [
        {
          name: "Worker one",
          spec: "Cleaner",
          phone: "78768345",
        },
        {
          name: "Worker two",
          spec: "Driver",
          phone: "78768123",
        },
        {
          name: "Worker three",
          spec: "Driver",
          phone: "9796767",
        },
        {
          name: "Worker four",
          spec: "Driver",
          phone: "78768123",
        },
        {
          name: "Worker five",
          spec: "Driver",
          phone: "78768123",
        },
        {
          name: "Worker six",
          spec: "Driver",
          phone: "78768123",
        },
      ];
      dispatch(getWorkersEnd(Wr));
  };
};

export const getWorkersStart = () => {
  return {
    type: actionTypes.GetWorkers.GETWORKERS_START,
  };
};

export const getWorkersFail = (err) => {
  return {
    type: actionTypes.GetWorkers.GETWORKERS_FAIL,
    error: err,
  };
};

export const getWorkersEnd = (data) => {
  return {
    type: actionTypes.GetWorkers.GETWORKERS_END,
    data: data,
  };
};