import {combineReducers} from 'redux';
import navbar from './navbar.reducer';
import routes from './routes.reducer';

const fuseReducers = combineReducers({
    navbar,
    routes
});

export default fuseReducers;
