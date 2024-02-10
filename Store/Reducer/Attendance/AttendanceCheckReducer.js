import * as actionTypes from "../../Actions/Actions";

const initialState = {
  user: "",
  facility: "",
  checkIn: "",
  checkOut: "",
  status: "",
  task: "",
  eid: "",
  error: "",
  loading: false,
};

const GetCheckByIdR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetCheckById.GET_CHECK_BY_ID_END:
      return {
        ...state,
        checkIn: action.data.checkIn,
        checkOut: action.data.checkOut,
        user: action.data.user,
        facility: action.data.facility,
        status: action.data.status,
        task: action.data.task,
        eid: action.data.eid,
        loading: false,
      };

    case actionTypes.GetCheckById.GET_CHECK_BY_ID_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default GetCheckByIdR;
