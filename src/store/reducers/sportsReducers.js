import { GET_ALL_MATCHES, GET_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE } from '../actions/actionTypes';

const initialState = {
    getAllMatches: [],
    getMatches: [],
    getTypeList: [],
    getTopLeague: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MATCHES:
            return {
                ...state,
                getAllMatches: action.payload.data
            };
        case GET_MATCHES:
            return {
                ...state,
                getMatches: action.payload.data
            };
        case GET_TYPE_LIST:
            return {
                ...state,
                getTypeList: action.payload
            };
        case GET_TOP_LEAGUE:
            return {
                ...state,
                getTopLeague: action.payload
            };
        default:
            return state;
    }
}