import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'usehooks-ts';
import { MobileNavbar, FootballLeagueNavbar, SportsTypeNavbar, MobileFooter, LeagueContent, OddDetailPanel } from '../../../mobile/components'
import { getMatches, getAllMatches, getTopLeague, getLeagueSorts, getTypeList } from '../../../store/actions/mobileSportsActions';
import { FadeInOut } from "../../../utils";
import { tipTypesList } from '../../../utils/dataUtils'
import './mHome.css'

function MHome(props) {

    const dispatch = useDispatch()
    const [tipTypes, setTipTypes] = useState();
    const [liveLeagueType, setLiveLeagueType] = useState([]);
    const [willLeagueType, setWillLeagueType] = useState([]);
    const [openOddDetailVal, setOpenOddDetailVal] = useState(false);
    const [selectMatchId, setSelectMatchId] = useState();
    const [sportActive, setSportActive] = useState(1);
    const [hideSubNav, setHideSubNav] = useState(true);
    const [sportTypeName, setSportTypeName] = useState('Football');
    const prevScrollY = useRef(0)
    const [timer, setTimer] = useState(null)
    const [isMounted, setIsMounted] = useState(false)
    const [liveMatches, setLiveMatches] = useState(null);
    const [willMatches, setWillMatches] = useState(null);
    const [onlyLive, setOnlyLive] = useState(false);
    const get_Matches = useSelector(state => state.mobileSportsReducers.getMatches)
    const dataFetch = () => {
        dispatch(getMatches())
        dispatch(getAllMatches())
        dispatch(getTopLeague())
        dispatch(getLeagueSorts())
        dispatch(getTypeList())
        clearTimeout(timer)
        setTimer(setTimeout(dataFetch, 5000))
    }
    useEffect(() => {
        if (!isMounted) {
            dataFetch()
            setIsMounted(true)
        }
    })
    useEffect(() => {
        let tempType1 = [];
        let tempType2 = [];
        if (get_Matches && get_Matches.length !== 0) {
            let live_leagues = get_Matches.data.matches.filter(item => item.betState.matchState >= 3)
            let will_leagues = get_Matches.data.matches.filter(item => item.betState.matchState < 3)
            setLiveMatches(live_leagues);
            setWillMatches(will_leagues);
            live_leagues.forEach(item => {
                if (!tempType1.includes(item.match.league)) {
                    tempType1.push(item.match.league)
                }
            });
            will_leagues.forEach(item => {
                if (!tempType2.includes(item.match.league)) {
                    tempType2.push(item.match.league)
                }
            });
            setLiveLeagueType(tempType1);
            setWillLeagueType(tempType2)
        }
    }, [get_Matches])
    useEffectOnce(() => {
        dataFetch()
    })
    useEffect(() => {
        if (props && props.onlyLive) {
            setOnlyLive(props.onlyLive)
        }
    }, [props])
    useEffect(() => { //football navbar with scroll
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current < (currentScrollY - 15) && hideSubNav) {
                setHideSubNav(false);
            }
            if (prevScrollY.current > currentScrollY && !hideSubNav) {
                setHideSubNav(true);
            }
            prevScrollY.current = currentScrollY;
        }
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [hideSubNav])

    const getTipTypes = (index) => {
        setTipTypes(index);
    }
    const openDetailOdd = (index, id) => {
        setOpenOddDetailVal(index);
        setSelectMatchId(id);
    }
    const sportActiveFunc = (index, typeName) => {
        setSportActive(index);
        setSportTypeName(typeName);
    }
    const getTime = (param) => {
        let timestamp = new Date(param.betState.timestamp).getTime();
        let virtualStartTime = new Date(param.betState.virtualStartTime).getTime();
        let t;
        if(virtualStartTime !== 0){
            t = (timestamp - virtualStartTime) / (60 * 1000);
            // t = (timestamp - virtualStartTime) / (60 * 1000);
            // let y = (timestamp / 60000) - (virtualStartTime / 60000)
            t = Math.round(t + 0.96442) >= 0 ? Math.round(t + 0.96442) : 0;
        }else{
            const dateString = param.europeanStartTime;
            const userOffset = (new Date().getTimezoneOffset()) / 60;
            const localDate = new Date(dateString);
            const utcDate = new Date(localDate.getTime() - (userOffset + 1) * 60 * 60 * 1000);
            const h = new Date(utcDate).getHours();
            const m = new Date(utcDate).getMinutes() === 0 ? '00' : new Date(utcDate).getMinutes();
            t = h + ':' + m;
        }
        return t;
    }
    const getDate = (param)=> {
        let date;
        const dateString = param.europeanStartTime;
        const userOffset = (new Date().getTimezoneOffset()) / 60;
        const localDate = new Date(dateString);
        const utcDate = new Date(localDate.getTime() - (userOffset + 1) * 60 * 60 * 1000);
        const todayDay = new Date().getDate();
        const matchDay = new Date(utcDate).getDate(); 
        const matchMonth = new Date(utcDate).getMonth(); 
        if(todayDay === matchDay){
            date = 'Today'
        }
        if (matchDay === todayDay + 1){
            date = 'Tomorrow'
        }
        if (matchDay > todayDay + 1){
            date = matchDay + '.'+ matchMonth
        }
        return date;
    }
    // console.log('==>', liveLeagueType);
    return (
        <>
            <MobileNavbar />
            <SportsTypeNavbar sportActiveFunc={sportActiveFunc} />
            {sportActive === 1 && hideSubNav ?
                <FadeInOut show="true" duration={400}>
                    <FootballLeagueNavbar parentCallback={getTipTypes} sportActive={sportActive} tipTypes={getTipTypes} />
                </FadeInOut>
                : <></>}
            <div className={sportActive === 1 ? 'm_content custom-top' : 'm_content'}>
                <div className='m_header'>
                    <div className='odds'>
                        {tipTypes !== undefined ? tipTypesList[tipTypes].map((item, index) => <p key={index}>{item}</p>) : null}
                    </div>
                </div>
                <div className='m_body'>
                    {liveLeagueType ? liveLeagueType.map((league, index1) => <div key={index1}>
                        <div className="league-content">{sportTypeName}/{league}</div>
                        {liveMatches.map((match, i) => (
                            league === match.match.league ?
                                <div key={i}>
                                    <LeagueContent
                                        tipTypes={tipTypes}
                                        openDetailOdd={openDetailOdd}
                                        matchId={match.id}
                                        homeTeam={match.match.homeTeam}
                                        awayTeam={match.match.awayTeam}
                                        matchResults={match.matchResults}
                                        score={match.scoreCache}
                                        matchState={match.betState.matchState}
                                        redCard={match.redCards}
                                        betState={match.betState}
                                        isTop={match.isTop}
                                        odds={match.betState}
                                        time={getTime(match)}
                                        date={getDate(match)}
                                    />
                                </div>
                                : null
                        ))}
                    </div>
                    ) : null}
                    {!onlyLive && willLeagueType ? willLeagueType.map((league, index1) => <div key={index1}>
                        <div className="league-content">{sportTypeName}/{league}</div>
                        {willMatches.map((match, i) => (
                            league === match.match.league ?
                                <div key={i}>
                                    <LeagueContent
                                        tipTypes={tipTypes}
                                        openDetailOdd={openDetailOdd}
                                        matchId={match.id}
                                        homeTeam={match.match.homeTeam}
                                        awayTeam={match.match.awayTeam}
                                        matchResults={match.matchResults}
                                        score={match.scoreCache}
                                        redCard={match.redCards}
                                        betState={match.betState}
                                        willBeLive={match.match.willBeLive}
                                        matchState={match.betState.matchState}
                                        isTop={match.isTop}
                                        time={getTime(match)}
                                        date={getDate(match)}
                                    />
                                </div>
                                : null
                        ))}
                    </div>
                    ) : null}
                </div>
            </div>
            <MobileFooter />
            {openOddDetailVal ? <OddDetailPanel openDetailOdd={openDetailOdd} matchId={selectMatchId} /> : <></>}
        </>
    );
};
export default MHome;