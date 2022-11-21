import axios from "axios";
import jwtDecode from 'jwt-decode';
import { SetAuthToken } from '../utils';
// const API_URL = "http://localhost:5000/";
import { Language } from '../utils'
const register = (user) => {
    return axios.post('/user/register', user);
};

const login = (user) => {
    return axios
        .post("/user/login", user)
        .then((response) => {
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            SetAuthToken(token);
            const decoded = jwtDecode(token);
            console.log('decoded', decoded);
            let lang = Language[decoded.lang].name
            localStorage.setItem('lang', lang);
            return decoded;
        });
};
const update = (user) => {
    return axios
        .post("/user/update", user)
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

const logout = () => {
    localStorage.removeItem('jwtToken');
    SetAuthToken(false);
    window.location.href = '/sportsbetting';
};

const authService = {
    register,
    update,
    login,
    logout,
};

export default authService;