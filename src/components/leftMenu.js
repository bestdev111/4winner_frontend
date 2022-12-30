import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeList, getAllMatches } from '../store/actions/sportsActions'
import { setCategorySet } from '../store/actions/settingActions'
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import './styles/leftMenu.css'

function LeftMenu() {
    const SportTypeList = useSelector(state => state.sportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.sportsReducers.getAllMatches);
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
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
    const onClickSideItem = (sportType, leagues, subLeague, index) => {
        collapseFunc1()
        setIsCollapse3(index)
        dispatch(setCategorySet(sportType.sportTypeId, leagues.betradarCategoryId, subLeague.name))
    }
    return (
        <div>
            <div className='menu-header'>
                <Trans>Sports Betting</Trans>
            </div>
            <div className='menu-content bordered-top'>
                <div className='menu_main'>
                    {SportTypeList && SportTypeList.map((item, index) =>
                        availableSportTypes ? availableSportTypes.includes(item.sportTypeId) ?
                            <div key={index} className="sportstypes">
                                <p className={isCollapse1[index] ? 'collapsed first-lists' : 'first-lists'} onClick={() => collapseFunc1(index)}>
                                    <img className='leftmenu-icon' src={isCollapse1[index] ? 'assets/images/icons/caret-down-solid-yellow.svg' : 'assets/images/icons/caret-right-solid-black.svg'} alt='' />
                                    <img className='sport-icon' src={iconGet(index)} alt='' />
                                    {item.name}
                                </p>
                                <ul className={isCollapse1[index] ? 'show' : 'hide'}>
                                    {get_AllMatches.data.leagues && get_AllMatches.data.leagues.map((league, index2) =>
                                        league.betradarSportId === item.sportTypeId ?
                                            <li key={index2}>
                                                <p className={isCollapse2[index2] ? 'collapsed lists' : 'lists'} onClick={() => collapseFunc2(index2)}>
                                                    <img className='leftmenu-icon' src={isCollapse2[index2] ? 'assets/images/icons/caret-down-solid-white.svg' : 'assets/images/icons/caret-right-solid-white.svg'} alt='' />
                                                    {league.name}
                                                </p>
                                                <ul className={isCollapse2[index2] ? 'show' : 'hide'}>
                                                    {league.leagueList.map((league1, index3) =>
                                                        <li key={index3}>
                                                            <p onClick={() => onClickSideItem(item, league, league1, index3)} className={isCollapse3 === index3 ? 'collapsed lists last-lists' : 'lists last-lists'} >
                                                                {league1.name}
                                                            </p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </li>
                                            : <li key={index2}></li>
                                    )}
                                </ul>
                            </div>
                            : null : null
                    )}
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;