import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
const authReducers = combineReducers({
    authReducer,
});

export default authReducers;