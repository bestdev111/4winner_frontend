import axios from 'axios';
import { GET_ALL_MATCHES, GET_MATCHES, GET_TYPE_LIST, GET_TOP_LEAGUE, GET_ERRORS } from './actionTypes';
import { SportTypeList, ServerURL } from '../../utils'
import ToastService from '../../service/toast.service';
const topLeague = [
    { m_icon: 'assets/images/micons/champions_league1.png', type: 'CHAMPIONS LEAGUE' },
    { m_icon: 'assets/images/micons/europe_league.png', type: 'EUROPA LEAGUE' },
    { m_icon: 'assets/images/micons/premier_league.png', type: 'PREMIER LEAGUE' },
    { m_icon: 'assets/images/micons/la_liga.png', type: 'LA LIGA' },
    { m_icon: 'assets/images/micons/bundesliga.png', type: '1.BUNDESLIGA' },
    { m_icon: 'assets/images/micons/serie_a.png', type: 'SERIE A' },
    { m_icon: 'assets/images/micons/league_1.png', type: 'LEAGUE 1' },
    { m_icon: 'assets/images/micons/super_lig.png', type: 'SUPER LIG' },
    { m_icon: 'assets/images/micons/eredivisie.png', type: 'EREDIVISIE' },
    { m_icon: 'assets/images/micons/liga_portugal.png', type: 'LIGA PORTUGAL' },
    { m_icon: '', type: 'World Cup Group A' },
    { m_icon: '', type: 'World Cup Group B' },
    { m_icon: '', type: 'World Cup Group C' },
    { m_icon: '', type: 'World Cup Group D' },
    { m_icon: '', type: 'World Cup Group E' },
    { m_icon: '', type: 'World Cup Group F' },
    { m_icon: '', type: 'World Cup Group G' },
    { m_icon: '', type: 'World Cup Group H' },
]

export const getAllMatches = () => {
    return async dispatch => {
        try {
            const instance = axios.create({ baseURL: 'http://volley90.com:5000' })
            const response = await instance.get(ServerURL +'/sports/getAllMatches');
            ToastService("getAllMatches Success");
            return dispatch({
                type: GET_ALL_MATCHES,
                payload: response
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getMatches = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/sports/getMatches');
            return dispatch({
                type: GET_MATCHES,
                payload: response
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getTypeList = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/sports/getMatches');
            return dispatch({
                type: GET_TYPE_LIST,
                payload: SportTypeList
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};
export const getTopLeague = () => {
    return async dispatch => {
        try {
            const response = await axios.get(ServerURL + '/sports/getMatches');
            return dispatch({
                type: GET_TOP_LEAGUE,
                payload: topLeague
            });
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error
            });
        }
    }
};