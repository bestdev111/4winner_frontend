// import * as Actions from '../actions';

const initialState = null;

const sportsBettingReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.UPDATE_COURSE:
            {
                return {
                    ...state,
                    ...action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default sportsBettingReducer;