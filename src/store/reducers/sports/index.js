import {combineReducers} from 'redux';
import navigation from './navigation.reducer';
import navbar from './navbar.reducer';
import message from './message.reducer';
import dialog from './dialog.reducer';
import routes from './routes.reducer';

const fuseReducers = combineReducers({
    navigation,
    navbar,
    message,
    dialog,
    routes
});

export default fuseReducers;
