import axios from "axios";
import jwtDecode from 'jwt-decode';
import { SetAuthToken } from '../utils';
import { ServerURL } from "../utils";
import { Language } from '../utils'
const register = (user) => {
    console.log('register', user);
    return axios.post(ServerURL +'/user/register', user);
};

const userGet = (currentUser) => {
    return axios
        .get("/user", {params: currentUser})
        .then((response) => {
            return response.data;
        });
};
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
const updateUser = (user) => {
    return axios
        .post(ServerURL + "/user/updateuser", user)
        .then((response) => {
            console.log('updateUser', response);
            return response;
        });
};
const deleteOne = (userName) => {
    return axios
        .post(ServerURL + "/user/deleteuser", userName)
        .then((response) => {
            console.log('deleteOne', response);
            return response;
        });
};

const logout = () => {
    localStorage.removeItem('jwtToken');
    SetAuthToken(false);
    window.location.href = '/sportsbetting';
};

const authService = {
    userGet,
    register,
    updateCurrentUser,
    updateUser,
    deleteOne,
    login,
    logout,
};

export default authService;