import { 
    SET_LOCALIZE,
    SET_CATEGORY_SET
 } from './actionTypes';

export const setLocalize = lang => dispatch => {
    localStorage.setItem('lang', lang);
    return dispatch({
        type: SET_LOCALIZE,
        payload: lang
    });
};

export const setCategorySet = (sportTypeId, betradarCategoryId, leagueName) => dispatch => {
    if(leagueName == 'All')
        leagueName = null;
    leagueName = encodeURI(leagueName)
    return dispatch({
        type: SET_CATEGORY_SET,
        payload: {
            sportTypeId: sportTypeId,
            betradarCategoryId: betradarCategoryId,
            leagueName: leagueName
        }
    })
}