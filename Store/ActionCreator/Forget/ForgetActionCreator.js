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

          
               console.log(res.data);     
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


export const submitSet = (emailS, pwd, token) => {
    return dispatch => {
        dispatch(SetStart());
        const params = {
            newPassword: pwd,
            email: emailS,
        };

        axios
            .put(
                server +
                `/avh/nufm/v1/public/forgetPassword/redirect/${token}`,
                params,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            .then(res => {
                dispatch(SetEnd(res.data));



            }).catch(err => {
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