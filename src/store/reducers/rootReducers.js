import { combineReducers } from 'redux';
import authReducers from './authReducers';
import sportsReducers from './sportsReducers';
import settingReducers from './settingReducers';

export default combineReducers({
  authReducers,
  sportsReducers,
  settingReducers,
});
