import {
    BET_SELECT, GET_MY_BETS, NEW_BETS, GENERATE_BARCODE, GET_ERRORS
} from '../../store/actions/actionTypes';
import axios from 'axios';
import { ServerURL } from '../../utils'
import ToastService from '../../service/toast.service';

export const betOddSelectAction = (betCollectList, obj) => {

    return async dispatch => {
        let tempBetCollectList = [];
        tempBetCollectList = betCollectList;
        if (tempBetCollectList && tempBetCollectList.length > 0) {
            let flag = false;
            tempBetCollectList.forEach((item, index) => {
                if (item.matchId === obj.matchId && item.betType === obj.betType && item.selectedOdds === obj.selectedOdds) {
                    tempBetCollectList.splice(index, 1)
                    flag = true;
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
export const betRemoveOddsAction = (betCollectList, obj) => {
    return async dispatch => {
        let tempBetCollectList = [];
        tempBetCollectList = betCollectList;
        if (tempBetCollectList && tempBetCollectList.length > 0) {
            tempBetCollectList.forEach((item, index) => {
                if (item.matchId === obj.matchId && item.selectedOdds === obj.selectedOdds) {
                    tempBetCollectList.splice(index, 1)
                }
            });
        }
        return dispatch({
            type: BET_SELECT,
            payload: {
                list: tempBetCollectList,
            }
        });
    }
}
export const removeAllBet = () => {
    let tempBetCollectList = [];
    return async dispatch => {
        return dispatch({
            type: BET_SELECT,
            payload: {
                list: tempBetCollectList,
            }
        });
    }
}
export const getMyBet = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/betting/getmybet');
            return dispatch({
                type: GET_MY_BETS,
                payload: {
                    myBetData: response.data.betData
                }
            });
        } catch (error) {
            ToastService('error!', 'error')
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
}
export const placeMyBet = (betsData, betState) => {
    return async dispatch => {
        try {
            const response = await axios.post(ServerURL + '/betting/newbet', {betsData, betState});
            ToastService('Successfully Bet!', 'success')
            return dispatch({
                type: NEW_BETS,
                payload: {
                    message: 'success'
                }
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
}

export const generateBarcode = postData => {
    return async dispatch => {
        try {
            const response = await axios.post(ServerURL + '/betting/barcode', postData);
            return dispatch({
                type: GENERATE_BARCODE,
                payload: response.data
            });
        }catch(err){
            return dispatch({
                type: GET_ERRORS,
                payload: err
            });
        }
    }
}