import * as actionTypes from "../../Actions/Actions";

const initialState = {
  email: "",
  fullName: "",
  phone: "",
  specializations: [],
  street: "",
  address: "",
  facilityId: "",
  department: "",
  city: "",
  dob: "",
  jobTitle: "",
  startDate: "",
  workType: "",
  zipCode: "",
  linkBack:"",
  certification:"",
  profileImage: "",
  error: "",
  loading: false,
  eid: "",
  wwcc:"",
  wwccExpDate:"",
  police:"",
  policeExpDate:"",
};

const AddWorkerR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AddWorker.ADD_WORKER:
      return { ...state, [action.name]: action.value };

    case actionTypes.AddWorker.ADD_WORKER_START:
      return { ...state, loading: true };

    case actionTypes.AddWorker.ADD_WORKER_END:
      return {...state,loading: false,error:'Added Successfully'};

    case actionTypes.AddWorker.ADD_WORKER_FAIL:
      return { ...state, loading: false ,error:'User already registered'};

    default:
      return state;
  }
};

export default AddWorkerR;
