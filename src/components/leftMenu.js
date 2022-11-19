import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeList, getAllMatches } from '../store/actions/sportsActions'
import './styles/leftMenu.css'

function LeftMenu(props) {
    const SportTypeList = useSelector(state => state.sportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.sportsReducers.getAllMatches);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypeList());
        dispatch(getAllMatches());
    }, [dispatch]);
    const [isCollapse1, setIsCollapse1] = useState([]);
    const [isCollapse2, setIsCollapse2] = useState([]);
    const [isCollapse3, setIsCollapse3] = useState(undefined);

    const collapseFunc1 = (index) => {
        if (isCollapse1[index] === undefined) {
            isCollapse1[index] = false;
        }
        let newArr = [...isCollapse1];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = false;
        }
        newArr[index] = !isCollapse1[index];
        setIsCollapse1(newArr);
        setIsCollapse3(undefined);
    }
    const collapseFunc2 = (index) => {
        if (isCollapse2[index] === undefined) {
            isCollapse2[index] = false;
        }
        let newArr = [...isCollapse2];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = false;
        }
        newArr[index] = !isCollapse2[index];
        setIsCollapse2(newArr);
        setIsCollapse3(undefined);
    }
    let availableSportTypes = '';
    if (get_AllMatches.data) {
        availableSportTypes = get_AllMatches.data.availableSportTypes;
    }
    const iconGet = (index) => {
        if (SportTypeList && SportTypeList[index])
            return SportTypeList[index].icon;
        return ''
    }
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <div className='menu_main'>
                    {availableSportTypes && availableSportTypes.map((availableSportType, index1) =>
                        availableSportType && SportTypeList ?
                            <div key={index1} className="sportstypes">
                                <p className={isCollapse1[index1] ? 'collapsed first-lists' : 'first-lists'} onClick={() => collapseFunc1(index1)}>
                                    <img className='leftmenu-icon' src={isCollapse1[index1] ? 'assets/images/icons/caret-down-solid-yellow.svg' : 'assets/images/icons/caret-right-solid-black.svg'} />
                                    <img className='sport-icon' src={iconGet(availableSportType - 1)} />
                                    {SportTypeList[availableSportType - 1] ? SportTypeList[availableSportType - 1].name : ''}
                                </p>
                                <ul className={isCollapse1[index1] ? 'show' : 'hide'}>
                                    {get_AllMatches.data.leagues && get_AllMatches.data.leagues.map((item, index2) =>
                                        item.betradarSportId === availableSportType ?
                                            <li key={index2}>
                                                <p className={isCollapse2[index2] ? 'collapsed lists' : 'lists'} onClick={() => collapseFunc2(index2)}>
                                                    <img className='leftmenu-icon' src={isCollapse2[index2] ? 'assets/images/icons/caret-down-solid-white.svg' : 'assets/images/icons/caret-right-solid-white.svg'} />
                                                    {item.name}
                                                </p>
                                                <ul className={isCollapse2[index2] ? 'show' : 'hide'}>
                                                    {item.leagueList.map((league, index3) =>
                                                        <li key={index3}>
                                                            <p className={isCollapse3 === index3 ? 'collapsed lists last-lists' : 'lists last-lists'} onClick={() => setIsCollapse3(index3)}>
                                                                {league.name}
                                                            </p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </li>
                                            : <div key={index2}></div>
                                    )}
                                </ul>
                            </div>
                            : <div key={index1}></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;