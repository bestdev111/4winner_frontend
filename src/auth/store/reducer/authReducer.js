import { SET_CURRENT_USER, GET_ERRORS } from 'store/actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log('auth', action.payload);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        // case USER_REGISTER:
        //     return {
        //         ...state,
        //         getTypeList: action.payload
        //     };
        default:
            return state;
    }
}