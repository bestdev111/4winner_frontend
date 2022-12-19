import { MOBILE_GET_ALL_MATCHES, MOBILE_GET_MATCHES, MOBILE_GET_TOP_LEAGUE, MOBILE_GET_LEAGUE_SORTS, MOBILE_GET_TYPE_LIST, MOBILE_GET_RESULT } from '../actions/actionTypes';
import OddCompareFunctions from '../../utils/compare'
const initialState = {
    getAllMatches: [],
    getMatches: [],
    getLeagueSorts: [],
    getTopLeague: [],
    getTypeList: [],
    getResult: [],
    isLoading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MOBILE_GET_ALL_MATCHES:
            return {
                ...state,
                getAllMatches: action.payload.data,
                isLoading: false
            };
        case MOBILE_GET_MATCHES:
            // console.log('reducer get_matches', action.payload.data.data, action.payload.data.data.matches)
            if (state.getMatches.data && action.payload.data)
                OddCompareFunctions.setOddsUpdate(state.getMatches.data.matches, action.payload.data.data.matches)
            return {
                ...state,
                getMatches: action.payload.data,
                isLoading: false
            };
        case MOBILE_GET_LEAGUE_SORTS:
            return {
                ...state,
                getLeagueSorts: action.payload.data,
                isLoading: false
            };
        case MOBILE_GET_TOP_LEAGUE:
            return {
                ...state,
                getTopLeague: action.payload.data,
                isLoading: false
            };
        case MOBILE_GET_TYPE_LIST:
            return {
                ...state,
                getTypeList: action.payload,
                isLoading: false
            };
        case MOBILE_GET_RESULT:
            return {
                ...state,
                getResult: action.payload.data,
                isLoading: false
            };
        default:
            return state;
    }
}