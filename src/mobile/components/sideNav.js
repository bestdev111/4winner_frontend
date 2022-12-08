import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeList, getAllMatches, getMatches } from '../../store/actions/sportsActions'
import { logoutUser } from '../../store/actions/authActions'
import { Language } from '../../utils';
const lang_list = [
    { id: 0, name: 'de_DE', icon: 'assets/images/flags/de_DE.png', title: 'Deutsch' },
    { id: 1, name: 'en_US', icon: 'assets/images/flags/en_US.png', title: 'English' },
    { id: 2, name: 'nl_NL', icon: 'assets/images/flags/nl_NL.png', title: 'Dutch' },
    { id: 3, name: 'tr_TR', icon: 'assets/images/flags/tr_TR.png', title: 'Türkçe' },
    { id: 4, name: 'fr_FR', icon: 'assets/images/flags/fr_FR.png', title: 'Français' },
    { id: 5, name: 'el_GR', icon: 'assets/images/flags/el_GR.png', title: 'Ελληνικά' },
    { id: 6, name: 'bu_BU', icon: 'assets/images/flags/bu_BU.png', title: 'български' },
]

function SideNav(props) {
    const [langOpen, setLangOpen] = useState(false);
    const [siteLang, setSiteLang] = useState(1);

    const [isCollapse1, setIsCollapse1] = useState([]);
    const [isCollapse2, setIsCollapse2] = useState([]);
    const [isCollapse3, setIsCollapse3] = useState(undefined);
    const { onClickOutside } = props;
    const ref = useRef(null);
    const dispatch = useDispatch();
    const SportTypeList = useSelector(state => state.sportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.sportsReducers.getAllMatches);
    // const get_Matches = useSelector(state => state.sportsReducers.getMatches);
    const userData = useSelector(state => state.authReducers)
    const isAuth = userData.isAuthenticated
    useEffect(() => {
        dispatch(getTypeList());
        dispatch(getAllMatches());
        // getMatches();
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
    return (
        <div id="mySidenav" className={!props.show ? 'sidenav' : 'sidenav openside'} ref={ref}>
            <div className='p-3'>
                {!isAuth ? <div className='login d-flex justify-content-center p-2'><a href='/m_login'>Login</a></div> :<></>}
            </div>
            <div className='pan'>
                <div>Bets</div>
            </div>
            <div className='sidenav_lists'>
                <p>
                    Outrights
                    <span className="match-count">
                        {get_AllMatches && get_AllMatches.data ?  get_AllMatches.data.totalOutrightsCount : ''}
                    </span>
                </p>
                <p>
                    Highrights
                    <span className="match-count">
                        {get_AllMatches && get_AllMatches.data ? get_AllMatches.data.totalHighLightsCount : ''}
                    </span>
                </p>
                {availableSportTypes && availableSportTypes.map((availableSportType, index1) =>
                    <div key={index1} className="sportstypes">
                        <p className={isCollapse1[index1] ? 'collapse' : ''} onClick={() => collapseFunc1(index1)}>
                            {SportTypeList[availableSportType - 1] ? SportTypeList[availableSportType - 1].name : ''}
                            <span className="match-count">
                                {getLeagueMatchCount(availableSportType)}
                            </span>
                        </p>
                        <ul className={isCollapse1[index1] ? 'show' : 'hide'}>
                            {get_AllMatches.data.leagues && get_AllMatches.data.leagues.map((item, index2) =>
                                item.betradarSportId === availableSportType ?
                                    <li key={index2}>
                                        <p className={isCollapse2[index2] ? 'collapse' : ''} onClick={() => collapseFunc2(index2)}>
                                            {item.name}
                                            <span className="match-count">{item.leagueMatchCount}</span>
                                        </p>
                                        <ul className={isCollapse2[index2] ? 'show' : 'hide'}>
                                            {item.leagueList.map((league, index3) =>
                                                <li key={index3}>
                                                    <p className={isCollapse3 === index3 ? 'collapse' : ''} onClick={() => setIsCollapse3(index3)}>
                                                        {league.name}<span className="match-count">{league.leagueMatchCount}</span>
                                                    </p>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                    : <li key={index2}></li>
                            )}
                        </ul>
                    </div>
                )}
                <p>Results</p>
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
                        <p>My Bets</p>
                        <p>Transactions</p>
                        <p onClick={() => dispatch(logoutUser())}>Logout</p>
                    </div>
                </>
                : <></>
            }
        </div>
    );
}
export default SideNav 