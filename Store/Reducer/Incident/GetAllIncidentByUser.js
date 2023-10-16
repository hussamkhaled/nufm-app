import * as actionTypes from "../../Actions/Actions";

const initialState = {
  Incidents: [],
  error: "",
};

const GetIncidentsByUserR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetIncidents.GET_INCIDENTS_BY_USER_END:
      return { ...state, Incidents: action.data };
    // case actionTypes.GetIncidents.GET_INCIDENTS_FAIL:
    //   return { ...state, loading: false };
    default:
      return state;
  }
};

export default GetIncidentsByUserR;
