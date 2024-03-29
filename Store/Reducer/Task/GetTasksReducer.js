import * as actionTypes from "../../Actions/Actions";

const initialState = {
  tasks: [],
  error: "",
  loading: false,
};

const GetAllTasksR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetAllTasks.GET_ALL_TASKS_END:
      return { ...state, tasks: action.tasksInfo };

    case actionTypes.GetAllTasks.GET_ALL_TASKS_FAIL:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default GetAllTasksR;
