import {
    BET_SELECT, GET_ERRORS
} from '../../store/actions/actionTypes';

function arrayRemove(array, index) {
    console.log('lets look array:', array, index);
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
                    const tempOdds =
                    item.odds.includes(...obj.odds)
                    ? arrayRemove(item.odds, item.odds.indexOf(...obj.odds))
                    : [item.odds.push(...obj.odds)];

                    console.log('one!!!!!', tempOdds);
                    const tempItem = { matchId: item.matchId, odds: tempOdds }
                    tempBetCollectList.splice(index, 1);
                    tempBetCollectList.push(tempItem);
                    return flag = true;
                }
            });
            if (flag === false) {
                tempBetCollectList.push(...tempBetCollectList, obj)
                console.log('two!!!!!', tempBetCollectList);
            }
        }
        else {
            console.log('three!!!!!');
            tempBetCollectList.push(...tempBetCollectList, obj)
        }

        try {
            // const response = await AuthService.userGet(currentUser);
            return dispatch({
                type: BET_SELECT,
                payload: {
                    list: tempBetCollectList,
                }
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error.response
            });
        }
    }
};