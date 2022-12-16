import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { betOddSelectAction } from "../../store/actions/betActions";
import './styles/leagueContent.css'
// import { use } from "i18next";

function LeagueContent(props) {
    const dispatch = useDispatch();
    const matchData = props;
    const [odds, setOdds] = useState([]);
    const [redCardHome, setRedCardHome] = useState(0);
    const [redCardAway, setRedCardAway] = useState(0);
    const betCollectList = useSelector((state) => state.betReducers.betCollectList)
    const matchStatus = () => {
        switch (matchData.matchState) {
            case 0:
                return <span className="not-will-live">{matchData.date} {matchData.time}</span>
            case 1:
                return <span className="will-live">{matchData.date} {matchData.time}</span>
            case 2:
                return (<>
                    <span className="will-live">Live</span>
                    <span className="live-time">{matchData.date} {matchData.time}</span>
                </>)
            case 3:
                return (<>
                    <span className="will-live">Live</span>
                    <span className="live-time">{matchData.time !== null ? matchData.time: null}{"'"}</span>
                </>)
            case 4:
                return (<>
                    <span className="halftime">1Half</span>
                    <span className="live-time">1Half</span>
                </>)
            case 5:
                return (<>
                    <span className="live">Live</span>
                    <span className="live-time d-flex">2. Half {' '}
                        {matchData.time !== null ? 
                            (matchData.time > 90 ? 
                                <p className="pl-1 pr-2">90<span className="mb-3 add-min">+{matchData.time - 90}{"'"}</span></p>
                            :  matchData.time + "'")
                        : null
                        }
                    </span>
                </>)
            default:
                break;
        }
    }
    const betOddSelect = (e, param) => {
        e.stopPropagation()
        let obj = {
            matchId: matchData.matchId,
            homeTeam: matchData.homeTeam,
            awayTeam: matchData.awayTeam,
            homeScore: matchData.score.history[0][0].home,
            awayScore: matchData.score.history[0][0].away,
            betType: props.tipTypes,
            odds: [matchData.odds.matchOdds102],
            selectedOdds: param,
            betSystem: 'Single/Multiple'
        }
        dispatch(betOddSelectAction(betCollectList, obj));
    }
    const openDetailOdd = () => {
        props.openDetailOdd(true, props.matchId);
    }
    const calcOdd = (param) => {
        let value = param / 100;
        return value.toFixed(2)
    }
    useEffect(() => {
        let styleArr = [];
        if (betCollectList && betCollectList.length > 0) {
            betCollectList.forEach(item => {
                if (item.matchId === matchData.matchId) {
                    styleArr.push(item.selectedOdds);
                }
            });
            setOdds(styleArr);
        }else{
            setOdds([]);
        }
    }, [betCollectList])
    useEffect(() => {
        if (matchData !== null){
            matchData.redCard.forEach(item => {
                if(item.home > 0) {
                    console.log('home==>', item);
                    setRedCardHome(item.home);
                }
            })
            matchData.redCard.forEach(item => {
                if(item.away > 0) {
                    console.log('away==>', item);
                    setRedCardAway(item.away);
                }
            })
        }
    }, [matchData])
    return (
        <div className="match d-flex" onClick={openDetailOdd}>
            <div className="m_teams">
                <div className="time">
                    {matchStatus()}
                </div>
                <div className="d-flex team">
                    <div className="team_name">
                        {matchData.homeTeam}
                        {redCardHome > 0? 
                            <div className="red-card">{redCardHome}</div>
                            :null
                        }
                    </div>
                    <div className="wrapper">
                        <div className="score">{matchData.score.history[0][0].home}</div>
                    </div>
                </div>
                <div className="d-flex team">
                    <div className="team_name">
                        {matchData.awayTeam}
                        {redCardAway > 0 ?
                            <div className="red-card">{redCardAway}</div>
                            : null
                        }
                    </div>
                    <div className="wrapper">
                        <div className="score">{matchData.score.history[0][0].away}</div>
                    </div>
                </div>
            </div>
            <div className="odds">
                <div className="o3" onClick={(e) => betOddSelect(e, 'o1')}>
                    <div className={odds.length > 0 && odds.includes('o1') ? 'changeable-odd odd-selected' : 'changeable-odd'}>
                        {matchData.odds ? calcOdd(matchData.odds.matchOdds102.o1) : '-'}
                    </div>
                </div>
                <div className="o3" onClick={(e) => betOddSelect(e, 'o0')}>
                    <div className={odds.length > 0 && odds.includes('o0') ? 'changeable-odd odd-selected' : 'changeable-odd'}>
                        {matchData.odds ? calcOdd(matchData.odds.matchOdds102.o0) : '-'}
                    </div>
                </div>
                <div className="o3" onClick={(e) => betOddSelect(e, 'o2')}>
                    <div className={odds.length > 0 && odds.includes('o2') ? 'changeable-odd odd-selected' : 'changeable-odd'}>
                        {matchData.odds ? calcOdd(matchData.odds.matchOdds102.o2) : '-'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeagueContent