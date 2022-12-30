import axios from 'axios';
import { GET_ALL_MATCHES, GET_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE, GET_FINISHED_MATCHES, GET_ERRORS } from './actionTypes';
import { SportTypeList, ServerURL } from '../../utils'

export const getAllMatches = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/sports/getAllMatches');
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
            const response = await axios.post(ServerURL + '/sports/getMatches');
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
            // const response = await axios.post(ServerURL + '/sports/getMatches');
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
            const response = await axios.post(ServerURL + '/sports/getMatches');
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
export const getFinishedMatches = options => {
    return async dispatch => {
        try {
            const response = await axios.post(ServerURL + '/m_sports/getFinishedMatches', options);
            return dispatch({
                type: GET_FINISHED_MATCHES,
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