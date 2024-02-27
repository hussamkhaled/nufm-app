import * as actionTypes from "../../Actions/Actions";

const initialState = {
  email: "",
  fullName: "",
  phone: "",
  specializations: [],
  street: "",
  address: "",
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
  success:"",
  loading: false,
  eid: "",
  facilityId: [],
  dataFetched: false,
  wwcc:"",
  wwccExpDate:"",
  police:"",
  policeExpDate:"",
};

const UpdateWorkerR = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.UpdateWorker.UPDATEWORKER:
      return { ...state, [action.name]: action.value };

    case actionTypes.UpdateWorker.UPDATEWORKER_START:
      return { ...state, loading: true };

    case actionTypes.UpdateWorker.UPDATEWORKER_END:
      return {
        ...state,
        loading: false,
        success: "Updated Successfully"
      };

    case actionTypes.UpdateWorker.UPDATEWORKER_FAIL:
      return { ...state, loading: false };

    case actionTypes.GetWorker.GET_WORKER_END:
      return {
        ...state,
        email: action.wr.email,
        fullName: action.wr.fullName,
        phone: action.wr.phone,
        specializations: action.wr.specializations,
        profileImage: action.wr.profileImage,
        startDate: action.wr.startDate,
        street: action.wr.street,
        department: action.wr.department,
        address: action.wr.address,
        city: action.wr.city,
        dob: action.wr.dob,
        jobTitle: action.wr.jobTitle,
        zipCode: action.wr.zipCode,
        linkBack: action.wr.linkBack,
        certification: action.wr.certification,
        workType: action.wr.workType,
        facilityId: action.wr.facilitiesOut,
        dataFetched: true,
        eid: action.wr.eid,
        loading: false,
        wwcc: action.wr.wwcc,
        wwccExpDate: action.wr.wwccExpDate,
        police: action.wr.police,
        policeExpDate: action.wr.policeExpDate
      };

    case actionTypes.GetWorker.GET_WORKER_FAIL:
      return { ...state, error: action.error, error:"User already registered" };
    default:
      return state;
  }
};

export default UpdateWorkerR;
