import { combineReducers } from 'redux';
import authReducers from './authReducers';
import sportsReducers from './sportsReducers';
import mobileSportsReducers from './mobileSportsReducers';
import settingReducers from './settingReducers';
import betReducers from './betReducers';

export default combineReducers({
  authReducers,
  sportsReducers,
  mobileSportsReducers,
  betReducers,
  settingReducers,
});
