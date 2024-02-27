import * as actionTypes from '../../Actions/Actions';

const initialState = {
  tasks: [],
  error: "",
  loading: false,
  eid: "",
};

const GetAllDoneTasksR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetAllDoneTasks.GET_ALL_DONE_TASKS_END:
      return { ...state, tasks: action.donetasks };

    case actionTypes.GetAllDoneTasks.GET_ALL_DONE_TASKS_FAIL:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default GetAllDoneTasksR;
