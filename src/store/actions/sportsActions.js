import axios from 'axios';
import { GET_ALL_MATCHES, GET_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE, GET_ERRORS } from './actionTypes';
import { SportTypeList, ServerURL } from '../../utils'
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};
export const getAllMatches = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/sports/getAllMatches', config);
            return dispatch({
                type: GET_ALL_MATCHES,
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
            const response = await axios.get(ServerURL + '/sports/getMatches', config);
            return dispatch({
                type: GET_MATCHES,
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
            const response = await axios.get(ServerURL + '/sports/getMatches', config);
            return dispatch({
                type: GET_TYPE_LIST,
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
export const getTopLeague = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/sports/getMatches',config);
            return dispatch({
                type: GET_TOP_LEAGUE,
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