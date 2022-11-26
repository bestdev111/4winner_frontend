import { ADMIN_PANEL } from '../../store/actions/actionTypes';

const initialState = {adminPanel: []}
export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_PANEL:
            return {
                ...state,
                adminPanel: action.payload,
            };
        default:
            return state;
    }
}