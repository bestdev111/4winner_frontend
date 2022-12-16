import axios from 'axios';
import { GET_ALL_MATCHES, GET_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE, GET_ERRORS } from './actionTypes';
import { SportTypeList, ServerURL } from '../../utils'

const getMatchUrl = "https://m.4winners.bet/Home/GetMatches?sportTypeId=1&betradarCategoryId=0&leagueName=&matchState=home&startIndex=0&orderByLeague=false"
const getAllMatchUrl = "https://m.4winners.bet/Home/GetAllMatches";
const leagueUrl = "https://m.4winners.bet/Home/GetLeagueSorts";
const topUrl = "https://m.4winners.bet/Home/GetTopLeages";

export const getAllMatches = () => {
    return async dispatch => {
        try {
            const response = await axios.get(getAllMatchUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36' } });
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
            const response = await axios.get(getMatchUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36' } });
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
            const response = await axios.get(leagueUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36' } });
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
            const response = axios.get(topUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36' } });
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