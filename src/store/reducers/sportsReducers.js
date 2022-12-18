import { GET_ALL_MATCHES, GET_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE } from '../actions/actionTypes';
import OddCompareFunctions from '../../utils/compare'

const initialState = {
    getAllMatches: [],
    getMatches: [],
    getTypeList: [],
    getTopLeague: [],
    isLoading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MATCHES:
            return {
                ...state,
                getAllMatches: action.payload.data,
                isLoading: false
            };
        case GET_MATCHES:
            if (state.getMatches.data && action.payload.data)
                OddCompareFunctions.setOddsUpdate(state.getMatches.data.matches, action.payload.data.data.matches)
            return {
                ...state,
                getMatches: action.payload.data,
                isLoading: false
            };
        case GET_TYPE_LIST:
            return {
                ...state,
                getTypeList: action.payload,
                isLoading: false
            };
        case GET_TOP_LEAGUE:
            return {
                ...state,
                getTopLeague: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}