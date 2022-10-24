import * as Actions from '../../actions';

const initialState = {
    foldedOpen: false,
    mobileOpen: false
};

const navbar = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.TOGGLE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: !state.foldedOpen
            }
        }
        default:
        {
            return state;
        }
    }
};

export default navbar;