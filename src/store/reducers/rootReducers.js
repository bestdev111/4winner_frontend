import { combineReducers } from 'redux';
import authReducers from 'auth/store/reducer';
import sportsReducers from './sportsReducers';

export default combineReducers({
  authReducers,
  sportsReducers,
});
