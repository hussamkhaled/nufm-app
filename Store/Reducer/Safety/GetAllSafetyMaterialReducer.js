import * as actionTypes from "../../Actions/Actions";

const initialState = {
  safetyMaterials: [],
  error: "",
};

const GetAllSafetyMaterialR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetAllSafetyMaterial.GET_ALL_SAFETY_MATERIAL_END:
      return { ...state, safetyMaterials: action.safetyMaterials };
    case actionTypes.GetAllSafetyMaterial.GET_ALL_SAFETY_MATERIAL_FAIL:
      return { ...state, error: action.error};
    default:
      return state;
  }
};

export default GetAllSafetyMaterialR;
