import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getAllTaskInfoByUserId = (email) => {
  return (dispatch) => {
    // var token = 'Bearer '+localStorage.getItem('nufmtoken');

    var link = server + privatePath + "/tasksByUser/"+ email;

    axios
      .get(link, {
        headers: {
          /*'Authorization': token,*/
        },
      })
      .then((res) => {
        dispatch(getAllTaskInfoByUserIdEnd(res.data));
      })
      .catch((err) => {
        // dispatch(getAllTaskInfoFail(err));
      });
  };
};

export const getAllTaskInfoByUserIdEnd = (data) => {
  return {
    type: actionTypes.GetAllTasks.GET_ALL_TASKS_BYUSER_END,
    tasksInfo: data,
  };
};


