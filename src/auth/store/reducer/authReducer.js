import { SET_CURRENT_USER, GET_ERRORS } from '../../../store/actions/actionTypes';
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isAuthenticated: true, user }
    : { isAuthenticated: false, user: null};
    
export default function (state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                // role: action.payload.
            };
        default:
            return state;
    }
}