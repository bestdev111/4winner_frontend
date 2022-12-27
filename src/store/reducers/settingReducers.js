import { 
    SET_LOCALIZE,
    SET_CATEGORY_SET
 } from '../actions/actionTypes';
let initialState = { 
    lang: 'en_US',
    categorySet: {
        sportTypeId: 1,
        betradarCategoryId: 0,
        leagueName: null
    }
}
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
        case SET_CATEGORY_SET:
            return {
                ...state,
                categorySet: action.payload
            }
        default:
            return state;
    }
}