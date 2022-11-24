import {
  USER_REGISTER,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ALL_USERS
} from '../../../store/actions/actionTypes';
import AuthService from '../../../service/auth.service';
import ToastService from '../../../service/toast.service';
import authRoles from '../../../auth/authRoles';

export const userGet = () => {
  return async dispatch => {
    try {
      const response = await AuthService.userGet();
      return dispatch({
        type: GET_ALL_USERS,
        payload: {
          users: response,
        }
      });
    } catch (error) {
      return dispatch({
        type: GET_ERRORS,
        payload: error.response
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
export const registerUser = user => {
  return async dispatch => {
    try {
      const response = await AuthService.register(user);
      ToastService("Create User Success", 'success');
      return dispatch(userGet());
    } catch (error) {
      ToastService(error.response.data.error, error);
      return dispatch({
        type: GET_ERRORS,
        payload: error.response.data
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
// update user information
export const updateUser = data => {
  return async dispatch => {
    try {
      const response = await AuthService.updateUser(data);
      ToastService("Update Success!", 'success');
      return dispatch(userGet());
    } catch (error) {
      ToastService("Update Error!", 'error');
      return dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  }
}
export const deleteUser = data => {
  return async dispatch => {
    try {
      const response = await AuthService.deleteOne(data);
      ToastService("Delete Success!", 'success');
      return dispatch(userGet());
    } catch (error) {
      ToastService("Delete Error!", 'error');
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