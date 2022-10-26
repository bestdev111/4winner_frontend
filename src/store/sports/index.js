import { combineReducers } from '@reduxjs/toolkit';
import teamList from './teamListSlice';

const sportsReducers = combineReducers({
  teamList,
});

export default sportsReducers;
