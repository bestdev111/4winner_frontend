import {combineReducers} from 'redux';
import navbar from './navbar.reducer';
import sportsbetting from './sportsbetting.reducer';
import outrights from './outrights.reducer';
import inplay from './inplay.reducer';
import results from './results.reducer';

const sports = combineReducers({
    navbar,
    sportsbetting,
    outrights,
    inplay,
    results
});

export default sports;
