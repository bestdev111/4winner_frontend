import axios from "axios";
import jwtDecode from 'jwt-decode';
import { SetAuthToken } from '../utils';
import { ServerURL } from "../utils";
import { Language } from '../utils'

const login = (user) => {
    return axios
        .post(ServerURL + "/user/login", user)
        .then((response) => {
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            SetAuthToken(token);
            const decoded = jwtDecode(token);
            console.log('login', decoded);
            let lang = Language[decoded.lang].name
            localStorage.setItem('lang', lang);
            return decoded;
        });
};
const updateCurrentUser = (user) => {
    return axios
        .post(ServerURL + "/user/update", user)
        .then((response) => {
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            SetAuthToken(token);
            const decoded = jwtDecode(token);
            let lang = Language[decoded.lang].name
            localStorage.setItem('lang', lang);
            return decoded;
        });
};
const passwordChange = data => {
    return axios
        .post(ServerURL + "/user/changepass", data)
        .then((response) => {
            return response;
        });
};
const logout = () => {
    localStorage.removeItem('jwtToken');
    SetAuthToken(false);
    window.location.href = '/';
};

const authService = {
    updateCurrentUser,
    passwordChange,
    login,
    logout,
};

export default authService;