import {
    SET_LOCALIZE,
    SET_CATEGORY_SET
} from '../actions/actionTypes';
let initialState = {
    lang: 'en_US',
    sportTypeId: 1,
    betradarCategoryId: 0,
    leagueName: null
}
if (localStorage.lang) {
    let lang = localStorage.getItem('lang');
    initialState = {
        lang: lang,
    };
}
export default function (state = initialState, action) {
    console.log('=>', state);
    switch (action.type) {
        case SET_LOCALIZE:
            return {
                ...state,
                lang: action.payload
            };
        case SET_CATEGORY_SET:
            return {
                ...state,
                betradarCategoryId: action.payload.betradarCategoryId,
                leagueName: action.payload.leagueName,
                sportTypeId: action.payload.sportTypeId
            }
        default:
            return state;
    }
}