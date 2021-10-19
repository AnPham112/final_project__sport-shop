import axios from "../helpers/axios";
import { authConstants, cartConstants } from "./constants";
import swal from 'sweetalert2';

export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      res = await axios.post(`/signup`, user);
      if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'sign up successfully'
        });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user }
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error }
        });
      }
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Failure!',
        text: error.response.data.message
      })
    }
  };
}

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post(`/signin`, { ...user });
      if (res.status === 200) {
        let { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { user, token }
        });
        swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successfully'
        })
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: res.data.error }
          });
        }
      }
    } catch (error) {
      const { message } = error.response.data;
      swal.fire({
        icon: 'error',
        title: 'Failure!',
        text: message
      });
    }

  }
}

export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user }
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' }
      });
    }
  }
}

export const signout = () => {
  return async dispatch => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });
  }
}