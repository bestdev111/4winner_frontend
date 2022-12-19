import axios from 'axios';
import { 
    MOBILE_GET_ALL_MATCHES, 
    MOBILE_GET_MATCHES, 
    MOBILE_GET_TOP_LEAGUE, 
    MOBILE_GET_LEAGUE_SORTS, 
    MOBILE_GET_TYPE_LIST, 
    MOBILE_GET_RESULT, 
    GET_ERRORS 
} from './actionTypes';
import { SportTypeList, ServerURL } from '../../utils';

export const getAllMatches = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/m_sports/getAllMatches');
            return dispatch({
                type: MOBILE_GET_ALL_MATCHES,
                payload: response
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getMatches = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/m_sports/getMatches');
            return dispatch({
                type: MOBILE_GET_MATCHES,
                payload: response
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getTopLeague = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/m_sports/getTopLeagues');
            return dispatch({
                type: MOBILE_GET_TOP_LEAGUE,
                payload: response.data
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getLeagueSorts = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/m_sports/getLeagueSorts');
            return dispatch({
                type: MOBILE_GET_LEAGUE_SORTS,
                payload: response
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getTypeList = () => {
    return async dispatch => {
        try {
            return dispatch({
                type: MOBILE_GET_TYPE_LIST,
                payload: SportTypeList
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getResult = options => {
    console.log('=>',options);
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/m_sports/getResult', options);
            return dispatch({
                type: MOBILE_GET_RESULT,
                payload: response
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};