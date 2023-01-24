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
          eid:"1",
          name: "Hussam Khaled",
          profileImage: "",
          date: "28-09-2022",
          time: "9:00AM",
          phone: "70580011",
          spec:"Driver"
        },
        {
          eid:"2",
          name: "Jana Zreika",
          profileImage: "",
          date: "28-09-2022",
          time: "9:00AM",
          phone: "03358475",
          spec:"Driver"
        },
        {
          eid:"3",
          name: "Tarek Zreika",
          profileImage: "",
          date: "28-09-2022",
          time: "9:00AM",
          phone: "70322027",
          spec:"Driver"
        },
        {
          eid:"4",
          name: "Hussam Khaled2",
          profileImage: "",
          date: "28-09-2022",
          time: "9:00AM",
          phone: "70580011",
          spec:"Driver"
        },
        {
          eid:"5",
          name: "Jana Zreika9",
          profileImage: "",
          date: "28-09-2022",
          time: "9:00AM",
          phone: "03358475",
          spec:"Driver"
        }
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
