import { BET_SELECT } from '../../store/actions/actionTypes';

const initialState = { betCollectList: [] }

export default function (state = initialState, action) {
    switch (action.type) {
        case BET_SELECT:
            console.log('reducer:::', action.payload.list);
            return {
                ...state,
                betCollectList: action.payload.list,
            };
        default:
            return state;
    }
}