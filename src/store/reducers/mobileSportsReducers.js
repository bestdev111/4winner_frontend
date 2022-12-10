import { MOBILE_GET_ALL_MATCHES, MOBILE_GET_MATCHES, MOBILE_GET_TOP_LEAGUE, MOBILE_GET_LEAGUE_SORTS } from '../actions/actionTypes';

const initialState = {
    getAllMatches: [],
    getMatches: [],
    getLeagueSorts: [],
    getTopLeague: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MOBILE_GET_ALL_MATCHES:
            return {
                ...state,
                getAllMatches: action.payload.data
            };
        case MOBILE_GET_MATCHES:
            return {
                ...state,
                getMatches: action.payload.data
            };
        case MOBILE_GET_LEAGUE_SORTS:
            return {
                ...state,
                getLeagueSorts: action.payload
            };
        case MOBILE_GET_TOP_LEAGUE:
            return {
                ...state,
                getTopLeague: action.payload
            };
        default:
            return state;
    }
}