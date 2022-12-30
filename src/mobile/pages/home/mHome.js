import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce } from "usehooks-ts";
import {
    MobileNavbar,
    FootballLeagueNavbar,
    SportsTypeNavbar,
    MobileFooter,
    LeagueContent,
    OddDetailPanel,
} from "../../../mobile/components";
import {
    getMatches,
    getAllMatches,
    getTopLeague,
    getLeagueSorts,
    getTypeList,
} from "../../../store/actions/mobileSportsActions";
import { setCategorySet } from '../../../store/actions/settingActions'
import { FadeInOut } from "../../../utils";
import { tipTypesList, leagueNameRadarId } from "../../../utils/dataUtils";
import "./mHome.css";

function MHome(props) {
    const dispatch = useDispatch();
    const prevScrollY = useRef(0);
    const [tipTypes, setTipTypes] = useState(0);
    const [liveLeagueType, setLiveLeagueType] = useState([]);
    const [willLeagueType, setWillLeagueType] = useState([]);
    const [openOddDetailVal, setOpenOddDetailVal] = useState(false);
    const [selectMatchId, setSelectMatchId] = useState();
    const [selectMatchDate, setSelectMatchDate] = useState();
    const [selectMatchTime, setSelectMatchTime] = useState();
    const [hideSubNav, setHideSubNav] = useState(true);
    const [timer, setTimer] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [liveMatches, setLiveMatches] = useState(null);
    const [willMatches, setWillMatches] = useState(null);
    const [liveBetRadarName, setLiveBetRadarName] = useState(null);
    const [willBetRadarName, setWillBetRadarName] = useState(null);
    const [onlyLive, setOnlyLive] = useState(false);

    const [sportTypeId, setSportTypeId] = useState(1);
    const [betradarCategoryId, setBetradarCategoryId] = useState(0);
    const [leagueName, setLeagueName] = useState();
    const [matchState, setMatchState] = useState("home");
    const [startIndex, setStartIndex] = useState(0);
    const [orderByLeague, setOrderByLeague] = useState(false);

    const get_Matches = useSelector(
        (state) => state.mobileSportsReducers.getMatches
    );
    const SportTypeList = useSelector(
        (state) => state.mobileSportsReducers.getTypeList
    );
    const categorySet = useSelector(
        (state) => state.settingReducers
    );
    const dataFetch = () => {
        let sportTypeId1 = localStorage.getItem("sportTypeId") ? localStorage.getItem("sportTypeId") : categorySet.sportTypeId;
        let betradarCategoryId1 = localStorage.getItem("betradarCategoryId") ? localStorage.getItem("betradarCategoryId") : categorySet ? categorySet.betradarCategoryId : null;
        let leagueName1 = localStorage.getItem("leagueName") ? localStorage.getItem("leagueName") : categorySet.leagueName;
        let obj = {
            sportTypeId: sportTypeId1,
            betradarCategoryId: betradarCategoryId1,
            leagueName: leagueName1,
            matchState: matchState,
            startIndex: startIndex,
            orderByLeague: orderByLeague,
        };
        dispatch(getMatches(obj));
        dispatch(getAllMatches());
        dispatch(getTopLeague());
        dispatch(getLeagueSorts());
        dispatch(getTypeList());
        clearTimeout(timer);
        setTimer(setTimeout(dataFetch, 5000));
    };
    useEffect(() => {
        if (!isMounted) {
            dataFetch();
            setIsMounted(true);
        }
    });
    useEffectOnce(() => {
        dataFetch();
        let index = localStorage.getItem("tipTypes");
        if (index === undefined || index === null) {
            index = 0
        }
        setTipTypes(index);
    });
    const sportActiveFunc = (index) => {
        setSportTypeId(index);
        localStorage.setItem("sportTypeId", index);
    };
    useEffect(() => {
        let tempType1 = [];
        let tempBetRadar1 = [];
        let tempType2 = [];
        let tempBetRadar2 = [];
        if (get_Matches && get_Matches.length !== 0) {
            let live_leagues = get_Matches.data.matches.filter(
                (item) => item.betState.matchState >= 3
            );
            let will_leagues = get_Matches.data.matches.filter(
                (item) => item.betState.matchState < 3
            );
            setLiveMatches(live_leagues);
            setWillMatches(will_leagues);
            live_leagues.forEach((item) => {
                if (!tempType1.includes(item.match.league)) {
                    tempType1.push(item.match.league);
                    tempBetRadar1.push(item.match.betradarCategory.name)
                }
            });
            will_leagues.forEach((item) => {
                if (!tempType2.includes(item.match.league)) {
                    tempType2.push(item.match.league);
                    tempBetRadar2.push(item.match.betradarCategory.name)
                }
            });
            setLiveLeagueType(tempType1);
            setLiveBetRadarName(tempBetRadar1)
            setWillLeagueType(tempType2);
            setWillBetRadarName(tempBetRadar2);
        }
    }, [get_Matches]);
    useEffect(() => {
        if (props && props.onlyLive) {
            setOnlyLive(props.onlyLive);
        }
    }, [props]);
    useEffect(() => {
        //football navbar with scroll
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current < currentScrollY - 15 && hideSubNav) {
                setHideSubNav(false);
            }
            if (prevScrollY.current > currentScrollY && !hideSubNav) {
                setHideSubNav(true);
            }
            prevScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [hideSubNav]);
    useEffect(() => {
        if (categorySet.sportTypeId !== null && categorySet.sportTypeId !== undefined)
            localStorage.setItem("sportTypeId", categorySet.sportTypeId)
        if (categorySet.betradarCategoryId !== null && categorySet.betradarCategoryId !== undefined)
            localStorage.setItem("betradarCategoryId", categorySet.betradarCategoryId)
        if (categorySet.leagueName !== null && categorySet.leagueName !== undefined)
            localStorage.setItem("leagueName", categorySet.leagueName)

        let sportTypeId1 = localStorage.getItem("sportTypeId") ? localStorage.getItem("sportTypeId") : categorySet.sportTypeId;
        let betradarCategoryId1 = localStorage.getItem("betradarCategoryId") ? localStorage.getItem("betradarCategoryId") : categorySet.letbetradarCategoryId;
        let leagueName1 = localStorage.getItem("leagueName") ? localStorage.getItem("leagueName") : categorySet.leagueName;
        let obj = {
            sportTypeId: sportTypeId1,
            betradarCategoryId: betradarCategoryId1,
            leagueName: leagueName1,
            matchState: matchState,
            startIndex: startIndex,
            orderByLeague: orderByLeague,
        };
        dispatch(getMatches(obj));
    }, [categorySet])

    // useEffect(() => {
    //     dataFetch()
    // }, [leagueName, betradarCategoryId, sportTypeId])

    const getTipTypes = (index) => {
        localStorage.setItem("tipTypes", index);
        setTipTypes(index);
    };
    const getLeagueName = (leagueName) => {
        dispatch(setCategorySet(1, leagueNameRadarId[leagueName.replaceAll(" ", "%20")], leagueName));
    };
    const openDetailOdd = (index, id, date, time) => {
        setOpenOddDetailVal(index);
        setSelectMatchId(id);
        setSelectMatchDate(date);
        setSelectMatchTime(time);
    };
    const getTime = (param) => {
        let timestamp = new Date(param.betState.timestamp).getTime();
        let virtualStartTime = new Date(
            param.betState.virtualStartTime
        ).getTime();
        let t;
        if (virtualStartTime !== 0) {
            t = (timestamp - virtualStartTime) / (60 * 1000);
            t = Math.round(t + 0.96442) >= 0 ? Math.round(t + 0.96442) : 0;
        } else {
            const dateString = param.europeanStartTime;
            const userOffset = new Date().getTimezoneOffset() / 60;
            const localDate = new Date(dateString);
            const utcDate = new Date(
                localDate.getTime() - (userOffset + 1) * 60 * 60 * 1000
            );
            const h = new Date(utcDate).getHours();
            const m =
                new Date(utcDate).getMinutes() === 0
                    ? "00"
                    : new Date(utcDate).getMinutes();
            t = h + ":" + m;
        }
        return t;
    };
    const getDate = (param) => {
        let date;
        const dateString = param.europeanStartTime;
        const userOffset = new Date().getTimezoneOffset() / 60;
        const localDate = new Date(dateString);
        const utcDate = new Date(
            localDate.getTime() - (userOffset + 1) * 60 * 60 * 1000
        );

        const todayDay = new Date().getDate();
        let matchDay = new Date(utcDate).getDate();
        let matchMonth = new Date(utcDate).getMonth() + 1;
        if (todayDay === matchDay) {
            date = "Today";
        }
        if (matchDay === todayDay + 1) {
            date = "Tomorrow";
        }
        if (matchDay > todayDay + 1) {
            if (matchDay < 10) {
                matchDay = '0' + matchDay
            }
            if (matchMonth < 10) {
                matchMonth = '0' + matchMonth
            }
            date = matchDay + "." + matchMonth;
        }
        return date;
    };
    return (
        <>
            <MobileNavbar />
            <SportsTypeNavbar
                sportActiveFunc={(index) => sportActiveFunc(index)}
            />
            {sportTypeId === 1 && hideSubNav ? (
                <FadeInOut show='true' duration={400}>
                    <FootballLeagueNavbar
                        parentCallback={getTipTypes}
                        tipTypes={getTipTypes}
                        leagueName={getLeagueName}
                    />
                </FadeInOut>
            ) : <></>}
            <div
                className={
                    sportTypeId === 1 ? "m_content custom-top" : "m_content"
                }
            >
                <div className="m_header">
                    <div className="odds">
                        {tipTypes !== undefined
                            ? tipTypesList[tipTypes].map((item, index) => (
                                <p key={index}>{item}</p>
                            ))
                            : null}
                    </div>
                </div>
                <div className="m_body">
                    {liveLeagueType
                        ? liveLeagueType.map((league, index1) => (
                            <div key={index1}>
                                <div className="league-content">
                                    {SportTypeList.map((item) =>
                                        item.sportTypeId === sportTypeId
                                            ? item.name
                                            : null
                                    )}/
                                    {liveBetRadarName ? liveBetRadarName[index1] : null}
                                    /{league}
                                </div>
                                {liveMatches.map((match, i) =>
                                    league === match.match.league ? (
                                        <div key={i}>
                                            <LeagueContent
                                                sportTypeId={sportTypeId}
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
                                    ) : null
                                )}
                            </div>
                        ))
                        : null}
                    {!onlyLive && willLeagueType
                        ? willLeagueType.map((league, index2) => (
                            <div key={index2}>
                                <div className="league-content">
                                    {SportTypeList.map((item) =>
                                        item.sportTypeId === sportTypeId
                                            ? item.name
                                            : null
                                    )}/
                                    {willBetRadarName ? willBetRadarName[index2] : null}
                                    /{league}
                                </div>
                                {willMatches.map((match, i) =>
                                    league === match.match.league ? (
                                        <div key={i}>
                                            <LeagueContent
                                                sportTypeId={sportTypeId}
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
                                    ) : null
                                )}
                            </div>
                        ))
                        : null}
                </div>
            </div>
            <MobileFooter />
            {openOddDetailVal ? (
                <OddDetailPanel
                    openDetailOdd={openDetailOdd}
                    matchId={selectMatchId}
                    date={selectMatchDate}
                    time={selectMatchTime}
                />
            ) : (
                <></>
            )}
        </>
    );
}
export default MHome;
