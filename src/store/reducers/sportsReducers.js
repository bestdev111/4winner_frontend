import { GET_ALL_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE } from '../actions/actionTypes';

const initialState = {
    getAllMatches: [],
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
        case GET_TYPE_LIST:
            console.log('GET_TYPE_LIST', action.payload);
            return {
                ...state,
                getTypeList: action.payload
            };
        case GET_TOP_LEAGUE:
            console.log('GET_TOP_LEAGUE', action.payload);
            return {
                ...state,
                getTopLeague: action.payload
            };
        default:
            return state;
    }
}