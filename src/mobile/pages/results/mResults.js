import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'usehooks-ts';
import { MobileNavbar, MobileFooter } from '../../components'
import { getResult } from '../../../store/actions/mobileSportsActions';
import './mResults.css'

function MResults() {

    const dispatch = useDispatch()
    const [date, setDate] = useState();
    const [betradarSportType, setBetradarSportType] = useState();
    const [category, setCategory] = useState();
    const [leagueList, setLeagueList] = useState([]);
    
    // const get_AllMatches = useSelector(state => state.mobileSportsReducers.getAllMatches);
    // const SportTypeList = useSelector(state => state.mobileSportsReducers.getTypeList);
    const getResultList = useSelector(state => state.mobileSportsReducers.getResult);
    // let availableSportTypes = '';
    // if (get_AllMatches.data) { availableSportTypes = get_AllMatches.data.availableSportTypes }

    const isLoading = useSelector(state => state.mobileSportsReducers.isLoading);
    const dateSet = e => {
        setDate(e.target.value)
    }
    const sportsTypeSet = e => {
        setBetradarSportType(e.target.value);
    }
    const categorySet = e => {
        setCategory(e.target.value)
    }
    useEffectOnce(()=> {
        getResultData();
    })
    useEffect(()=> {
        getResultData();
    }, [date, betradarSportType, category])
    useEffect(()=> {
        let temp = []
        if (getResultList.data && getResultList.data.length > 0){
            getResultList.data.forEach(item => {
                if(temp.includes(item.BASE.leagueName) === false){
                    temp.push(item.BASE.leagueName);
                }
            });
        }
        // { item.BASE.brCategory.name }
        setLeagueList(temp);
    }, [getResultList])
    const getResultData = () => {
        const obj = {
            date: date,
            betradarSportType: betradarSportType,
            category: category
        }
        dispatch(getResult(obj))
    }
    const getDate = () => {
        const todayDay = new Date().getDate();
        console.log(todayDay);
    }
    return (
        <>
            <MobileNavbar />
            <div className='results'>
                <div className='results-header'>
                    <select onChange={dateSet}>
                        <option value={1}>Today</option>
                        <option value={2}>Yesterday</option>
                    </select>
                    <select onChange={sportsTypeSet}>
                        {/* {availableSportTypes ? availableSportTypes.map((item, index)=> 
                            <option key={index} value={item}>{SportTypeList[item - 1] ? SportTypeList[item - 1].name : ''}</option>
                        ) : null} */}
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
                    {leagueList ? leagueList.map((league, i)=> 
                        <div key={i}>
                            <div className='league-title'>{league} - </div>
                            {getResultList.data ? getResultList.data.map((item, index)=>
                                league === item.BASE.leagueName ? 
                                    <div className='finished-match-item' key={index}>
                                        <div className='team'>{item.BASE.homeTeamName}</div>
                                        <div className='score'>
                                            <p>{item.BASE.matchResults.interimResults !== null ? item.BASE.matchResults.interimResults : "-:-"}</p>
                                            <p>{item.BASE.matchResults.fullTimeResult !== null ? item.BASE.matchResults.fullTimeResult : "-:-"}</p>
                                        </div>
                                        <div className='team'>{item.BASE.awayTeamName}</div>
                                    </div>
                                : null
                            ):null}
                        </div>
                    ):null}
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MResults;