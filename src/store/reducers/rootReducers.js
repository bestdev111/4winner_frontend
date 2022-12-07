import { combineReducers } from 'redux';
import authReducers from './authReducers';
import sportsReducers from './sportsReducers';
import settingReducers from './settingReducers';
import betReducers from './betReducers';

export default combineReducers({
  authReducers,
  sportsReducers,
  betReducers,
  settingReducers,
});
