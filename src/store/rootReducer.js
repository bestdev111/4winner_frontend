import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from 'auth/store';
import sportsReducers from './sports';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    // authReducer,
    sportsReducers,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/user/userLoggedOut') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
