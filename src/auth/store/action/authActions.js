import {
  USER_REGISTER,
  GET_ERRORS,
  SET_CURRENT_USER
} from '../../../store/actions/actionTypes';
import AuthService from '../../../service/auth.service';
import ToastService from '../../../service/toast.service';
import authRoles from '../../../auth/authRoles';
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
      ToastService('Login Success!', "success");
      if (authRoles.cashier.includes(response.role)) {
        window.location.href = '/adminpanel';
      }
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

export const updateCurrentUser = data => {
  return async dispatch => {
    try {
      const response = await AuthService.update(data);
      return dispatch(setCurrentUser(response));
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