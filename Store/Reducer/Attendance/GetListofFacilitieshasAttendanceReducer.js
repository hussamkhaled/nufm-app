import * as actionTypes from "../../Actions/Actions";

const initialState = {
  FacilitieshasAttendance: [],
  error: "",
};

const GetFacilitieshasAttendanceR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetListofFacilitieshasAttendance.GET_FACILITIESATTENDANCE_END:
      return { ...state, FacilitieshasAttendance: action.data };
    case actionTypes.GetListofFacilitieshasAttendance.GET_FACILITIESATTENDANCE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default GetFacilitieshasAttendanceR;

