import {
    BET_SELECT, GET_ERRORS
} from '../../store/actions/actionTypes';

function arrayRemove(array, index) {
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

export const betOddSelectAction = (betCollectList, obj) => {

    return async dispatch => {
        let tempBetCollectList = [];
        tempBetCollectList = betCollectList;
        if (tempBetCollectList && tempBetCollectList.length > 0) {
            let flag = false;
            tempBetCollectList.forEach((item, index) => {
                if (item.matchId === obj.matchId) {
                    item.odds.includes(...obj.odds) ? arrayRemove(item.odds, item.odds.indexOf(...obj.odds)) : item.odds.push(...obj.odds);
                    return flag = true;
                }
            });
            if (flag === false) {
                tempBetCollectList.push(obj)
            }
        }
        else {
            tempBetCollectList.push(obj)
        }

        return dispatch({
            type: BET_SELECT,
            payload: {
                list: tempBetCollectList,
            }
        });
    }
};