import { SET_CURRENT_USER, GET_ALL_USERS } from '../../../store/actions/actionTypes';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { isAuthenticated: true, user }
    : { isAuthenticated: false, user: null };

export default function (state = initialState, action) {
    console.log('initialState', state);
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
}