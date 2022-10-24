// import history from 'history.js';
import store from 'store';
import * as Actions from 'store/actions';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

export function setUserData(user)
{
    return (dispatch) => {

        dispatch({
            type   : SET_USER_DATA,
            payload: user
        })
    }
}

export function updateUserShortcuts(shortcuts)
{
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts
            }
        };

        updateUserData(newUser);

        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData()
{
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser()
{

    return (dispatch, getState) => {

        const user = getState().auth.user;

        if ( user.role === 'guest' )
        {
            return null;
        }

        // history.push({
        //     pathname: '/'
        // });

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

/**
 * Update User Data
 */
function updateUserData(user)
{
    if ( user.role === 'guest' )
    {
        return;
    }
}
