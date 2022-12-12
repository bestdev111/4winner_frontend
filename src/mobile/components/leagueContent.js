import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles/leagueContent.css'
import { betOddSelectAction } from "../../store/actions/betActions";
import { use } from "i18next";

function LeagueContent(props) {
    const dispatch = useDispatch();
    const matchData = props;
    const betCollectList = useSelector((state) => state.betReducers.betCollectList)
    // const get_Matches = useSelector(state => state.mobileSportsReducers.getMatches);
    // let matches = [];
    // useEffect(()=> {
    //     if (get_Matches.data) {
    //         matches = get_Matches.data.matches;
    //         console.log('Mobile_matches', matches);
    //     }
    // }, [get_Matches]);
    // const [betCollectList, setBetCollectList] = useState([]);
    const matchStatus = () => {
        switch (matchData.status) {
            case 0:
                return <span className="not-will-live">Today 09:00</span>
            case 1:
                return <span className="will-live">Today 09:00</span>
            case 2:
                return (
                    <>
                        <span className="halftime">1Half</span>
                        <span className="live-time">1Half</span>
                    </>
                )
            case 3:
                return (
                    <>
                        <span className="live">Live</span>
                        <span className="live-time">2. Half 70'</span>
                    </>
                )
            default:
                break;
        }
    }
    const betOddSelect = (index, param) => {
        const obj = {
            matchId: props.content_Id,
            odds: []
        }
        obj.odds.push(index)
        dispatch(betOddSelectAction(betCollectList, obj));
    }
    const openDetailOdd = () => {
        props.openDetailOdd(true, props.matchId);
    }
    return (
        <div className="match d-flex" onClick={openDetailOdd}>
            <div className="m_teams">
                <div className="time">
                    {matchStatus()}
                </div>
                <div className="d-flex team">
                    <div className="team_name">
                        {matchData.homeTeam}
                        {matchData.redCard1 && matchData.redCard1 !== 0 ? <div className="red-card">{matchData.redCard1}</div> : <></>}
                    </div>
                    <div className="wrapper">
                        <div className="score">{matchData.score.history[0][0].home}</div>
                    </div>
                </div>
                <div className="d-flex team">
                    <div className="team_name">
                        {matchData.awayTeam}
                        {matchData.redCard2 && matchData.redCard2 !== 0 ? <div className="red-card">{matchData.redCard2}</div> : <></>}
                    </div>
                    <div className="wrapper">
                        <div className="score">{matchData.score.history[0][0].away}</div>
                    </div>
                </div>
            </div>
            <div className="odds">
                <div className="o3">
                    <div className="changeable-odd">{matchData.odds ? matchData.odds.matchOdds102.o1 / 100 : '-'}</div>
                </div>
                <div className="o3">
                    <div className="changeable-odd">{matchData.odds ? matchData.odds.matchOdds102.o0 / 100 : '-'}</div>
                </div>
                <div className="o3">
                    <div className="changeable-odd">{matchData.odds ? matchData.odds.matchOdds102.o2 / 100 : '-'}</div>
                </div>
            </div>
        </div>
    );
}

export default LeagueContent