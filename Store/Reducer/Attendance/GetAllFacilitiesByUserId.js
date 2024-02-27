import * as actionTypes from "../../Actions/Actions";

const initialState = {
    Facilities: [],
    error: "",
};

const GetAllFacilitiesByUserR = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GetAllFacilitiesByUserId.GETALLFACILITIESBYUSERID:
          return { ...state, Facilities: action.data };
        // case actionTypes.GetFacilities.GET_FACILITIES_FAIL:
        //   return { ...state, loading: false };
        default:
          return state;
      }
};

export default GetAllFacilitiesByUserR;
