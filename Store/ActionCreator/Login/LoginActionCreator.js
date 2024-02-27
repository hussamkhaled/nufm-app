import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server } from "../Constants";

export const getLoginInfo = (name, value) => {
  return {
    type: actionTypes.Login.LOGIN,
    name: name,
    value: value,
  };
};

export const submitLogin = (username, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    const params = {};
    axios
      .post(
        server +
          "/avh/nufm/v1/public/login?username=" +
          username +
          "&password=" +
          password,
        params,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.message === "wrong password for the user " + username) {
          dispatch(loginFail("wrong password"));
        } else if (
          res.data.message ===
          "the user " + username + " is not defined"
        ) {
          dispatch(loginFail("user is not defined"));
        } else if (
          res.data.message ===
          "the user " + username + " is not confirmed"
        ) {
          dispatch(loginFail("user is not confirmed"));
        } else {
          dispatch(loginEnd(res.data));
        }
      })
      .catch((err) => {
        dispatch(loginFail(err));
      });
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.Login.LOGIN_START,
  };
};

export const loginEnd = (data) => {
  return {
    type: actionTypes.Login.LOGIN_END,
    userData: data,
  };
};

export const loginFail = (err) => {
  return {
    type: actionTypes.Login.LOGIN_FAIL,
    error: err,
  };
};
