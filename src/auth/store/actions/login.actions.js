import {setUserData} from './user.actions';
import * as Actions from 'store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({email, password})
{
    return (dispatch) =>{alert('hello')}
}

export function submitLoginWithFireBase({username, password})
{
    return (dispatch) => {alert('hello');}
}
