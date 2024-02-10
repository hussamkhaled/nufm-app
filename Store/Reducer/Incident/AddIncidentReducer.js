import * as actionTypes from "../../Actions/Actions";

const initialState = {
  sender: "",
  facility: "",
  task: "",
  senderId: "",
  facilityId: "",
  taskId: "",
  date: "",
  ihour: "",
  incident: "",
  comment: "",
  error: "",
  loading: false,
  eid: "",
};

const AddIncidentR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AddIncident.ADD_INCIDENT:
      return { ...state, [action.name]: action.value };

    case actionTypes.AddIncident.ADD_INCIDENT_START:
      return { ...state, loading: true };

    case actionTypes.AddIncident.ADD_INCIDENT_END:
      return { ...state, loading: false, error: "Sent Successfully" };

    case actionTypes.AddIncident.ADD_INCIDENT_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default AddIncidentR;
