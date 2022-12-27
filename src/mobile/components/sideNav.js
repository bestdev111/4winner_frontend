import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatches, getTypeList } from '../../store/actions/mobileSportsActions'
import { logoutUser } from '../../store/actions/authActions'
import { Language } from '../../utils';

function SideNav(props) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { onClickOutside } = props;
    const [langOpen, setLangOpen] = useState(false);
    const [siteLang, setSiteLang] = useState(1);
    const [isCollapse1, setIsCollapse1] = useState([]);
    const [isCollapse2, setIsCollapse2] = useState([]);
    const [isCollapse3, setIsCollapse3] = useState(undefined);

    const SportTypeList = useSelector(state => state.mobileSportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.mobileSportsReducers.getAllMatches);
    const userData = useSelector(state => state.authReducers)
    const isAuth = userData.isAuthenticated
    useEffect(() => {
        dispatch(getTypeList());
        dispatch(getAllMatches());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside, props.show]);
    const goTo = (title) => {
        if (title === 'Results') {
            window.location.href = '/m_results'
            localStorage.setItem('path', 'Results');
        }
        if (title === "Highlights") {
            window.location.href = "/m_highlights";
            localStorage.setItem("path", "Highlights");
            localStorage.setItem("leagueName", "");
        }
        if (title === 'My Bets') {
            window.location.href = '/mybets';
            localStorage.setItem('path', 'My Bets');
        }
    }
    if (!props.show)
        return null;

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
    const availableSportTypes = get_AllMatches && get_AllMatches.data ? get_AllMatches.data.availableSportTypes : [];
    function getLeagueMatchCount(params) {
        let sum = 0;
        get_AllMatches.data.leagues.forEach(element => {
            if (element.betradarSportId === params) {
                sum = sum + element.leagueMatchCount
            }
        });
        return sum;
    }
    const changePassword = () => {
        window.location.href = '/m_changepassword'
    }
    const onHandleChange = e => {
        e.stopPropagation();
    }
    const onClickSideItem = (sportType, leagues, subLeague, index) => {
        onClickOutside()
        setIsCollapse3(index)
        
        console.log(sportType.name, leagues.name, subLeague.name)
    }
    return (
        <div className='opacity-back' onScroll={onHandleChange}>
            <div id="mySidenav" className={!props.show ? 'sidenav' : 'sidenav openside'} ref={ref}>
                <div className='p-3'>
                    {!isAuth ? <div className='login d-flex justify-content-center p-2'><a href='/m_login'>Login</a></div> : <></>}
                </div>
                <div className='pan'>
                    <div>Bets</div>
                </div>
                <div className='sidenav_lists'>
                    <p>
                        Outrights
                        <span className="match-count">
                            {get_AllMatches && get_AllMatches.data ? get_AllMatches.data.totalOutrightsCount : ''}
                        </span>
                    </p>
                    <p onClick={() => goTo('Highlights')}>
                        Highlights
                        <span className="match-count">
                            {get_AllMatches && get_AllMatches.data ? get_AllMatches.data.totalHighLightsCount : ''}
                        </span>
                    </p>
                    {SportTypeList && SportTypeList.map((item, index) =>
                        availableSportTypes ? availableSportTypes.includes(item.sportTypeId) ?
                            <div key={index} className="sportstypes">
                                <p className={isCollapse1[index] ? 'collapse' : ''} onClick={() => collapseFunc1(index)}>
                                    {item.name}
                                    <span className="match-count">
                                        {getLeagueMatchCount(item.sportTypeId)}
                                    </span>
                                </p>
                                <ul className={isCollapse1[index] ? 'show' : 'hide'}>
                                    {get_AllMatches.data.leagues && get_AllMatches.data.leagues.map((league, index2) =>
                                        league.betradarSportId === item.sportTypeId ?
                                            <li key={index2}>
                                                <p className={isCollapse2[index2] ? 'collapse' : ''} onClick={() => collapseFunc2(index2)}>
                                                    {league.name}
                                                    <span className="match-count">{league.leagueMatchCount}</span>
                                                </p>
                                                <ul className={isCollapse2[index2] ? 'show' : 'hide'}>
                                                    {league.leagueList.map((league1, index3) =>
                                                        <li key={index3}>
                                                            <p onClick={()=>onClickSideItem(item, league, league1, index3)} className={isCollapse3 === index3 ? 'collapse' : ''} >
                                                                {league1.name}<span className="match-count">{league1.leagueMatchCount}</span>
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
                    <p onClick={() => goTo('Results')}>Results</p>
                </div>
                <div className='pan'>
                    <div>Language Selection</div>
                </div>
                <div className='sidenav_lists'>
                    <p className='d-flex justify-content-between' onClick={() => setLangOpen(!langOpen)}>
                        <span>
                            <img className='selected_lang' src={Language[siteLang].icon} alt='' />
                            {Language[siteLang].title}
                        </span>
                        <span className='expand_icon'>{langOpen ? '-' : '+'}</span>
                    </p>
                    <div className={langOpen ? 'lang_list lang_list_expand' : 'lang_list'}>
                        {Language.map((lang, key) =>
                            <div className='d-flex align-items-center' key={key} onClick={() => setSiteLang(key)}>
                                <img src={lang.icon} alt={lang.title} />
                                <p>{lang.title}</p>
                            </div>
                        )}
                    </div>
                </div>
                {isAuth ?
                    <>
                        <div className='pan'>
                            <div>Account</div>
                        </div>
                        <div className='account'>
                            <p onClick={changePassword}>Change Password</p>
                            <p onClick={() => window.location.href = '/mybets'}>My Bets</p>
                            <p>Transactions</p>
                            <p onClick={() => dispatch(logoutUser())}>Logout</p>
                        </div>
                    </>
                    : <></>
                }
            </div>
        </div>
    );
}
export default SideNav 