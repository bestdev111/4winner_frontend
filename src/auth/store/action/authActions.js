import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {SetAuthToken} from 'utils';
import {
  USER_REGISTER,
  GET_ERRORS,
  SET_CURRENT_USER
} from 'store/actions/actionTypes';
import { toast } from "react-toastify";

export const registerUser = user => (dispatch) => {
  axios
    .post('/user/register', user)
    .then((res) => {
      toast.success("Register Success", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-message'
      });
      dispatch({
        type: USER_REGISTER,
        payload: {
          success: true
        }
      });
    })
    .catch((err) => {
      toast.error("Incorrect!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-message'
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => (dispatch) => {
  axios
    .post('/user/login', user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      SetAuthToken(token);
      const decoded = jwtDecode(token);
      toast.success("Login Success!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-message'
      });
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      toast.error("Login Error!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-message'
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const updateCurrentUser = (
  email,
  name,
  userId,
  showEmail
) => dispatch =>
  axios
    .patch(`/users/${userId}`, { email, name, showEmail })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      SetAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  SetAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = '/sportsbetting';
};
