import * as actionTypes from '../../Actions/Actions';

const initialState = {
    token: '',
    forgemail: '',
    isSetting: false,
    isSetSuccess: false,
    isSetError: false,
    setData: null,
    setEmail: '',
    token: '',
    pwd: '',
    emailS: '',
    loading: false,
    buttonText: "Reset Password",
    buttonResetText: "Reset Password",
    loadingReset: false
}


const ForgetR = (state = initialState, action) => {



    switch (action.type) {
        case actionTypes.Forget.FORGET:
            return { ...state, [action.name]: action.value }

        case actionTypes.Forget.FORGET_START:
            return { ...state, loading: true }

        case actionTypes.Forget.FORGET_END:
            return { ...state, roles: action.userData, loading: false, buttonText: "Check Your Email" }

        case actionTypes.Forget.FORGET_FAIL:
            return { ...state, loading: false, error: 'Wrong' }
        case actionTypes.Forget.SET_START:
            return {
                ...state,
                isSetting: true,
                isSetSuccess: false,
                isSetError: false,
                loadingReset: true
            };
        case actionTypes.Forget.SET_END:
            return {
                ...state,
                isSetting: false,
                isSetSuccess: true,
                isSetError: false,
                setData: action.setData,
                loadingReset: false, buttonResetText: "Password Changed"
            };
        case actionTypes.SET_FAIL:
            return {
                ...state,
                isSetting: false,
                isSetSuccess: false,
                isSetError: true,
                loadingReset: false, buttonResetText: "Password is used before"
            };
        default:
            return state
    }
}

export default ForgetR;
