import * as actionTypes from "../../Actions/Actions";

const initialState = {
  Attendances: [],
  error: "",
};

const GetAttendanceByUserR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetAttendances.GET_ATTENDANCES_BY_USER_END:
      return { ...state, Attendances: action.data };
    // case actionTypes.GetAttendances.GET_ATTENDANCES_FAIL:
    //   return { ...state, loading: false };
    default:
      return state;
  }
};

export default GetAttendanceByUserR;
