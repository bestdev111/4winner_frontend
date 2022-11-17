import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {SetAuthToken} from '../../../utils';
import {
  USER_REGISTER,
  GET_ERRORS,
  SET_CURRENT_USER
} from '../../../store/actions/actionTypes';
import AuthService from '../../../service/auth.service';
import ToastService from '../../../service/toast.service';

export const registerUser = user => {
  return async dispatch => {
    try {
      const response = await AuthService.register(user);
      ToastService("Register Success", 'success');
      return dispatch({
        type: USER_REGISTER,
        payload: {
          success: true,
        }
      });
    } catch (error) {
      console.log(error.response.data.error, typeof error.response.data.error);
      ToastService(error.response.data.error, error);
      return dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};
export const loginUser = user => {
  return async dispatch => {
    try {
      const response = await AuthService.login(user);
      ToastService("Login Success!", "success");
      return dispatch(setCurrentUser(response));
    } catch (error) {
      ToastService("Login Error!", 'error');
      return dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
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
  AuthService.logout();
  dispatch(setCurrentUser({}));
};
