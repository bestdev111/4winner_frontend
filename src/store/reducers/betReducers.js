import { BET_SELECT, GET_MY_BETS, NEW_BETS, GENERATE_BARCODE } from '../../store/actions/actionTypes';

const initialState = { betCollectList: [], myBetData: [], isLoading: true }

export default function (state = initialState, action) {
    switch (action.type) {
        case BET_SELECT:
            return {
                ...state,
                betCollectList: [...action.payload.list],
            };
        case GET_MY_BETS:
            return {
                ...state,
                myBetData: [...action.payload.myBetData],
                isLoading: false
            };
        case NEW_BETS:
            return {
                ...state,
                isLoading: false
            };
        case GENERATE_BARCODE:
            return {
                ...state,
                getBarCodeJson: action.payload
                // isLoading: false
            };
        default:
            return state;
    }
}