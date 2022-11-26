import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import adminReducer from '../../../admin/store/adminReducers';
const authReducers = combineReducers({
    authReducer,
    adminReducer
});

export default authReducers;