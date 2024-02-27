import * as actionTypes from "../../Actions/Actions";

const initialState = {
  token: "",
  email: "",
  password: "",
  fullName: "",
  profileImage: "",
  phone: "",
  roles: [],
  creationDate: "",
  message: "",
  loading: false,
  error: "",
};

const LoginR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.Login.LOGIN:
      return { ...state, [action.name]: action.value };

    case actionTypes.Login.LOGIN_START:
      return { ...state, /*loading: true*/ };

    case actionTypes.Login.LOGIN_END:
      return {
        ...state,
        roles: action.userData.roles,
        token: action.userData.token,
        email: action.userData.email,
        fullName: action.userData.fullName,
        profileImage: action.userData.profileImage,
        phone: action.userData.phone,
        creationDate: action.userData.creationDate,
        /*loading: false,*/
      };

    case actionTypes.Login.LOGIN_FAIL:
      return { ...state, loading: false, error: "Wrong password" };

    default:
      return state;
  }
};

export default LoginR;
