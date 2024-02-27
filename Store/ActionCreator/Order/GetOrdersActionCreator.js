import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getOrders = () => {
  return (dispatch) => {
    dispatch(getOrdersStart());
    // var token = "Bearer " + localStorage.getItem("nufmtoken");
    var link = server + privatePath + "/orders";
    axios
      .get(link, {
        headers: {/*'Authorization': token,*/},})
      .then((res) => {
        dispatch(getOrdersEnd(res.data));
      })
      .catch((err) => {
        dispatch(getOrdersFail(err));
      });

    
  };
};

export const getOrdersStart = () => {
  return {
    type: actionTypes.GetOrders.GET_ORDERS_START,
  };
};

export const getOrdersFail = (err) => {
  return {
    type: actionTypes.GetOrders.GET_ORDERS_FAIL,
    error: err,
  };
};

export const getOrdersEnd = (data) => {
  return {
    type: actionTypes.GetOrders.GET_ORDERS_END,
    data: data,
  };
};
