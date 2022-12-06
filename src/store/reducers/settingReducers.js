import { SET_LOCALIZE } from '../actions/actionTypes';
let initialState = { lang: 'en_US' }
if (localStorage.lang){
    let lang = localStorage.getItem('lang');
    initialState = {
        lang: lang,
    };
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOCALIZE:
            return {
                ...state,
                lang: action.payload
            };
        default:
            return state;
    }
}