import * as actionTypes from "../../Actions/Actions";

const initialState = {
  user: "",
  facility: "",
  checkIn: "",
  checkOut: "",
  status: "",
  task: "",
  id: "",
  email:"",
  error: "",
  loading: false,
  attendData:""
};

const GetCheckByIdR = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GetCheckById.ADD_ATTENDANCE:
      return { ...state, [action.name]: action.value };

    case actionTypes.GetCheckById.GET_CHECK_BY_ID_END:
      console.log(action.data+ "dllll");
      return {
        ...state,
   
        user: action.data,
     
        loading: false,
      };

    case actionTypes.GetCheckById.GET_CHECK_BY_ID_FAIL:
      return { ...state, error: action.error };
      case actionTypes.GetCheckById.GET_ATTEND_BY_ID_END:
        return {
          ...state,
     
          facility: action.data,
       
          loading: false,
        };
  
      case actionTypes.GetCheckById.GET_ATTEND_BY_ID_FAIL:
        return { ...state, error: action.error };
    default:
      return state;
  }
};
export default GetCheckByIdR;
