import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import reducer from 'store/sports';
import { getTypeList, getAllMatches, getMatches } from 'store/sports/teamListSlice'
import TreeView from 'react-treeview';

const lang_list = [
    { id: 0, name: 'de_DE', icon: 'assets/images/flags/de_DE.png', title: 'Deutsch' },
    { id: 1, name: 'en_US', icon: 'assets/images/flags/en_US.png', title: 'English' },
    { id: 2, name: 'nl_NL', icon: 'assets/images/flags/nl_NL.png', title: 'Dutch' },
    { id: 3, name: 'tr_TR', icon: 'assets/images/flags/tr_TR.png', title: 'Türkçe' },
    { id: 4, name: 'fr_FR', icon: 'assets/images/flags/fr_FR.png', title: 'Français' },
    { id: 5, name: 'el_GR', icon: 'assets/images/flags/el_GR.png', title: 'Ελληνικά' },
    { id: 6, name: 'bu_BU', icon: 'assets/images/flags/bu_BU.png', title: 'български' },
]
const sportTypeList = [
    { sportTypeId: 1, name: 'Football' },
    { sportTypeId: 2, name: 'Handball' },
    { sportTypeId: 3, name: 'xxx' },
    { sportTypeId: 4, name: 'Basketball' },
    { sportTypeId: 5, name: 'Volleyball' },
    { sportTypeId: 6, name: 'Futsal' },
    { sportTypeId: 7, name: 'xxx' },
    { sportTypeId: 8, name: 'xxx' },
    { sportTypeId: 9, name: 'xxx' },
    { sportTypeId: 10, name: 'Tennis' },
    { sportTypeId: 11, name: 'xxx' },
    { sportTypeId: 12, name: 'Darts' },
    { sportTypeId: 13, name: 'xxx' },
    { sportTypeId: 14, name: 'xxx' },
    { sportTypeId: 15, name: 'xxx' },
    { sportTypeId: 16, name: 'IceHockey' },
    { sportTypeId: 17, name: 'xxx' },
    { sportTypeId: 18, name: 'xxx' },
    { sportTypeId: 19, name: 'Boxing' },
    { sportTypeId: 20, name: 'xxx' },
    { sportTypeId: 21, name: 'xxx' },
    { sportTypeId: 22, name: 'American Football' },
    { sportTypeId: 23, name: 'Snooker' },
    { sportTypeId: 24, name: 'xxx' },
    { sportTypeId: 25, name: 'xxx' },
    { sportTypeId: 26, name: 'xxx' },
    { sportTypeId: 27, name: 'xxx' },
    { sportTypeId: 28, name: 'xxx' },
    { sportTypeId: 29, name: 'Rugby' },
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
    const sports_team_list = useSelector(({ teamList }) => teamList.teamList.sportsTeamList);
    const get_AllMatches = useSelector(({ teamList }) => teamList.teamList.getAllMatches);
    const get_Matches = useSelector(({ teamList }) => teamList.teamList.getMatches);

    useEffect(() => {
        dispatch(getTypeList());
        dispatch(getAllMatches());
        dispatch(getMatches());
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
    const availableSportTypes = get_AllMatches.data.availableSportTypes;
    
    // console.log('here1', get_AllMatches.data.outrightBetCompetitions);
    // console.log('here2', get_Matches.data);
    console.log('here1', get_AllMatches.data);

    const filterSportList = (index) => {
        sportTypeList.forEach(item => {
            if(item.id == index){
                console.log('name:',item.name);
                return <p>{item.name}</p>
            }
        });
    }
    return (
        <div id="mySidenav" className={!props.show ? 'sidenav' : 'sidenav openside'} ref={ref}>
            <div className='p-3'>
                <div className='login d-flex justify-content-center p-2'><a href='/m_login'>Login</a></div>
            </div>
            <div className='pan'>
                <div>Bets</div>
            </div>
            <div className='sidenav_lists'>
                <p>Outrights</p>
                <p>Highrights</p>
                {availableSportTypes.map((availableSportType, index1) =>
                    <div key={index1} className="sportstypes">
                        <p className={isCollapse1[index1] ? 'collapse' : ''} onClick={() => collapseFunc1(index1)}>
                            {/* {availableSportType} */}
                            Football
                            {(availableSportType) => filterSportList(availableSportType)}
                            <span className="match-count">100</span>
                        </p>
                        <ul className={isCollapse1[index1] ? 'show' : 'hide'}>
                            {get_AllMatches.data.leagues && get_AllMatches.data.leagues.map((item, index2) =>
                                item.betradarSportId == availableSportType ?
                                    <li key={index2}>
                                        <p className={isCollapse2[index2] ? 'collapse' : ''} onClick={() => collapseFunc2(index2)}>
                                            {item.name}
                                            <span className="match-count">{item.leagueMatchCount}</span>
                                        </p>
                                        <ul className={isCollapse2[index2] ? 'show' : 'hide'}>
                                            {item.leagueList.map((league, index3) =>
                                                <li key={index3}>
                                                    <p className={isCollapse3 == index3 ? 'collapse' : ''} onClick={() => setIsCollapse3(index3)}>
                                                        {league.name}<span className="match-count">{league.leagueMatchCount}</span>
                                                    </p>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                    : <></>
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
                        <img className='selected_lang' src={lang_list[siteLang].icon} alt='' />
                        {lang_list[siteLang].title}
                    </span>
                    <span className='expand_icon'>{langOpen ? '-' : '+'}</span>
                </p>
                <div className={langOpen ? 'lang_list lang_list_expand' : 'lang_list'}>
                    {lang_list.map((lang, key) =>
                        <div className='d-flex align-items-center' key={key} onClick={() => setSiteLang(key)}>
                            <img src={lang.icon} alt={lang.title} />
                            <p>{lang.title}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default withReducer('teamList', reducer)(SideNav)