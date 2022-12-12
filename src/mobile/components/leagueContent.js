import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { betOddSelectAction } from "../../store/actions/betActions";
import './styles/leagueContent.css'
// import { use } from "i18next";
function arrayRemove(array, index) {
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}
function LeagueContent(props) {
    const dispatch = useDispatch();
    const matchData = props;
    const [odds, setOdds] = useState([]);
    const betCollectList = useSelector((state) => state.betReducers.betCollectList)
    const matchStatus = () => {
        switch (matchData.matchState) {
            case 0:
                return <span className="not-will-live">Today 09:00</span>
            case 1:
                return <span className="will-live">Today 09:00</span>
            case 2:
                return (<>
                    <span className="will-live">Live</span>
                    <span className="live-time">Today 09:00</span>
                </>) 
            case 3:
                return (<>
                    <span className="will-live">Live</span>
                    <span className="live-time">37'</span>
                </>)
            case 4:
                return (<>
                    <span className="halftime">1Half</span>
                    <span className="live-time">1Half</span>
                </>)
            case 5:
                return (<>
                    <span className="live">Live</span>
                    <span className="live-time">2. Half 70'</span>
                </>)
            default:
                break;
        }
    }
    const betOddSelect = (e, param) => {
        e.stopPropagation()
        let obj = {
            matchId: matchData.matchId,
            // betType: matchData.,
            odds: []
        }
        obj.odds.push(param)
        func(param);
        dispatch(betOddSelectAction(betCollectList, obj));
    }
    const func = param => {
        let temp = odds;
        if (odds.includes(param)) {
            temp = arrayRemove(temp, temp.indexOf(param))
            setOdds([...temp]);
        } else {
            setOdds([...odds, param]);
        }
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
                <div className="o3" onClick={(e) => betOddSelect(e, 1)}>
                    <div className={odds.length > 0 && odds.includes(1) ? "changeable-odd odd-selected" : 'changeable-odd'}>{matchData.odds ? matchData.odds.matchOdds102.o1 / 100 : '-'}</div>
                </div>
                <div className="o3" onClick={(e) => betOddSelect(e, 0)}>
                    <div className={odds.length > 0 && odds.includes(0) ? "changeable-odd odd-selected" : 'changeable-odd'}>{matchData.odds ? matchData.odds.matchOdds102.o0 / 100 : '-'}</div>
                </div>
                <div className="o3" onClick={(e) => betOddSelect(e, 2)}>
                    <div className={odds.length > 0 && odds.includes(2) ? "changeable-odd odd-selected" : 'changeable-odd'}>{matchData.odds ? matchData.odds.matchOdds102.o2 / 100 : '-'}</div>
                </div>
            </div>
        </div>
    );
}

export default LeagueContent