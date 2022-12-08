import {
  GET_ERRORS,
  SET_CURRENT_USER,
  PASSWORD_CHANGE
} from '../../store/actions/actionTypes';
import AuthService from '../../service/auth.service';
import ToastService from '../../service/toast.service';

export const loginUser = user => {
  return async dispatch => {
    try {
      const response = await AuthService.login(user);
      ToastService('Login Success!', "success");
      window.location.href = '/';
      return dispatch(setCurrentUser(response));
    } catch (error) {
      ToastService("Login Error!", 'error');
      return dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  }
};
// updateCurrentUser for update language
export const updateCurrentUser = data => {
  return async dispatch => {
    try {
      const response = await AuthService.updateCurrentUser(data);
      return dispatch(setCurrentUser(response));
    } catch (error) {
      return dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  }
}
// update user password
export const passwordChange = data => {
  return async dispatch => {
    try {
      const response = await AuthService.passwordChange(data);
      ToastService("Update Success!", 'success');
      return dispatch({
        type: PASSWORD_CHANGE,
        payload: response
      });
    } catch (error) {
      ToastService("Update Error!", 'error');
      return dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  }
}
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
export const logoutUser = () => (dispatch) => {
  AuthService.logout();
  dispatch(setCurrentUser({}));
};