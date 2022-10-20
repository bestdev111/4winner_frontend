import {combineReducers} from 'redux';
import sports from './sports';
// import auth from 'app/auth/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        // auth,
        sports,
        ...asyncReducers
    });

export default createReducer;
