import { SET_LOCALIZE } from './actionTypes';

export const setLocalize = lang => dispatch => {
    localStorage.setItem('lang', lang);
    return dispatch({
        type: SET_LOCALIZE,
        payload: lang
    });
};