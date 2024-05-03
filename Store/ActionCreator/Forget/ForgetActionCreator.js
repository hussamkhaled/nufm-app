import axios from 'axios';
import * as actionTypes from '../../Actions/Actions';
import { server } from '../Constants'

export const getForgetInfo = (name, value) => {
    return {
        type: actionTypes.Forget.FORGET,
        name: name,
        value: value
    }
}


export const submitForget = (forgemail) => {

    return dispatch => {
        dispatch(ForgetStart());
        const params = {
            "password": "",
            "email": forgemail,
            "fullName": "",
            "phone": "",
            "nationalIdentity": ""
        }
        axios.post(server + '/avh/nufm/v1/public/forgetPassword', params, { headers: { "Content-Type": "application/json", }, })
            .then(res => {
                dispatch(ForgetEnd(res.data));


            }).catch(err => {

                dispatch(ForgetFail(err));
            })
    }
}


export const ForgetStart = () => {

    return {
        type: actionTypes.Forget.FORGET_START
    }
}

export const ForgetEnd = (data) => {

    return {
        type: actionTypes.Forget.FORGET_END,
        userData: data


    }
}

export const ForgetFail = (err) => {

    return {
        type: actionTypes.Forget.FORGET_FAIL,
        error: err
    }
}


export const submitSet = (emailS, oldpwd, pwd) => {
    return dispatch => {
        dispatch(SetStart());
        const params = {
            email: emailS,
            oldPassword: oldpwd,
            newPassword: pwd,
        };

        axios
            .put(
                `https://services.facilify.com.au/avh/nufm/v1/public/resetPassword`,
                params,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            .then(res => {
           
                dispatch(SetEnd(res.data));



            }).catch(err => {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
               
                } else if (err.request) {
                    // The request was made but no response was received
                  
                } else {
                    // Something happened in setting up the request that triggered an Error
                  
                }
                dispatch(SetFail(err));
            })
    }
}


export const SetStart = () => {

    return {
        type: actionTypes.Forget.SET_START
    }
}

export const SetEnd = (data) => {

    return {
        type: actionTypes.Forget.SET_END,
        SetData: data
    }
}

export const SetFail = (err) => {

    return {
        type: actionTypes.Forget.SET_FAIL,
        error: err
    }
}