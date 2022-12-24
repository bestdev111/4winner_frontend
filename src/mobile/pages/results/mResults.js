import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'usehooks-ts';
import { MobileNavbar, MobileFooter } from '../../components'
import { getResult } from '../../../store/actions/mobileSportsActions';
import './mResults.css'

function MResults() {

    const dispatch = useDispatch()
    const [date, setDate] = useState();
    const [dateList, setDateList] = useState();
    const [betradarSportType, setBetradarSportType] = useState(1);
    const [category, setCategory] = useState();
    const [leagueList, setLeagueList] = useState([]);

    const getResultList = useSelector(state => state.mobileSportsReducers.getResult);
    const dateSet = e => {
        setDate(e.target.value)
    }
    const sportsTypeSet = e => {
        setBetradarSportType(e.target.value);
    }
    const categorySet = e => {
        setCategory(e.target.value)
    }
    useEffectOnce(() => {
        getResultData();
    })
    useEffect(() => {
        getResultData();
    }, [date, betradarSportType, category])
    useEffect(() => {
        getDate()
        let temp = []
        if (getResultList.data && getResultList.data.length > 0) {
            getResultList.data.forEach(item => {
                if (temp.includes(item.BASE.leagueName + '-' + item.BASE.brCategory.name) === false) {
                    temp.push(item.BASE.leagueName + '-' + item.BASE.brCategory.name);
                }
            });
        }
        setLeagueList(temp);
    }, [getResultList])
    const getResultData = () => {
        if (date === undefined) {
            const todayDay = new Date()
            setDate(todayDay.getFullYear() + '-' + (todayDay.getMonth() + 1) + '-' + todayDay.getDate());
        }
        const obj = {
            date: date,
            betradarSportType: betradarSportType,
            category: category
        }
        dispatch(getResult(obj))
    }
    const getDate = () => {
        let dateListTemp = [];
        const todayDay = new Date()
        const daysAgo = new Date(todayDay.getTime());
        for (let i = 0; i < 12; i++) {
            daysAgo.setDate(todayDay.getDate() - i);
            const day = daysAgo.getDate()
            const year = daysAgo.getFullYear();
            const month = daysAgo.getMonth() + 1;
            let title = day + '.' + month + '.' + year
            const param = year + '-' + month + '-' + day
            title = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : title;
            let obj = {
                title: title,
                param: param
            }
            dateListTemp.push(obj)
        }
        setDateList(dateListTemp)
    }
    return (
        <>
            <MobileNavbar />
            <div className='results'>
                <div className='results-header'>
                    <select className='date' onChange={dateSet}>
                        {dateList ? dateList.map((item, index) =>
                            <option key={index} value={item.param}>{item.title}</option>
                        ) : null}
                    </select>
                    <select onChange={sportsTypeSet}>
                        <option value='1'>Football</option>
                        <option value='2'>Basketball</option>
                        <option value='3'>Baseball</option>
                        <option value='4'>IceHockey</option>
                        <option value='5'>Tennis</option>
                        <option value='6'>Handball</option>
                        <option value='10'>Boxing</option>
                        <option value='12'>Rugby</option>
                        <option value='16'>American Football</option>
                        <option value='19'>Snooker</option>
                        <option value='22'>Darts</option>
                        <option value='23'>Volleyball</option>
                        <option value='29'>Futsol</option>
                    </select>
                    <select onChange={categorySet}>
                        <option value={1}>All</option>
                    </select>
                </div>
                <div className='results-body'>
                    {leagueList ? leagueList.map((league, i) =>
                        <div key={i}>
                            <div className='league-title'>{league}</div>
                            {getResultList.data ? getResultList.data.map((item, index) =>
                                league === item.BASE.leagueName + '-' + item.BASE.brCategory.name ?
                                    <div className='finished-match-item' key={index}>
                                        <div className='team'>{item.BASE.homeTeamName}</div>
                                        <div className='score'>
                                            <p>{item.BASE.matchResults.interimResults !== null ? item.BASE.matchResults.interimResults : "-:-"}</p>
                                            <p>{item.BASE.matchResults.fullTimeResult !== null ? item.BASE.matchResults.fullTimeResult : "-:-"}</p>
                                        </div>
                                        <div className='team'>{item.BASE.awayTeamName}</div>
                                    </div>
                                    : null
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MResults;