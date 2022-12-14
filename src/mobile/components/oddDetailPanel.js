import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import './styles/oddDetailPanel.css'

const OddDetailPanel = (props) => {
    const [matchData, setMatchData] = useState()
    const get_Matches = useSelector(state => state.mobileSportsReducers.getMatches)
    const matchList = get_Matches.data.matches;
    useEffect(() => {
        if (props.matchId && matchList) {
            matchList.forEach(match => {
                if (match.id === props.matchId) {
                    setMatchData(match);
                }
            });
        }
    }, [props.matchId]);
    const calcOdd = (param) => {
        let value = param / 100;
        return value.toFixed(2)
    }
    const handleChange = e => {
        e.stopPropagation();
    }
    const betOddSelect = (betType, oddType) => {
        
        console.log(props.matchId,betType, oddType);
    }
    return <>
        <div className="openDetailOdd" onScroll={handleChange}>
            <div className='match-detail-header'>
                <div className="d-flex">
                    <div className='match-detail-header-info'>
                        <div>
                            <div className='d-flex justify-content-center'>
                                <span className='match-date'>Match Date</span>
                            </div>
                            <div>
                                <span>{matchData ? matchData.match.homeTeam : null}</span>
                                <span className='px-4'>
                                    {matchData ? matchData.betState.score.home + ":" + matchData.betState.score.away : '0:0'}
                                </span>
                                <span>{matchData ? matchData.match.awayTeam : null}</span>
                            </div>
                        </div>
                    </div>
                    <div className='match-detail-modal-close' onClick={() => props.openDetailOdd(false)}>
                        <i className="fa fa-times-circle-o fa-3x" aria-hidden="true"></i>
                    </div>
                </div>
                <div className='custom-row line-white'>
                    <div className='tabs'>
                        <a className='tab tab-selected'><img className='stadium' src='assets/images/micons/stadium.png' alt='' /></a>
                        <a className='tab'><img src='assets/images/micons/list.png' alt='' /></a>
                        <a className='tab'><img src='assets/images/micons/analytic.png' alt='' /></a>
                    </div>
                </div>
            </div>
            <div className='match-detail-content'>
                {matchData ? <>
                    <div className='custom-row center'>
                        <div className='matchtracker-holder'><div id='live-center'></div></div>
                    </div>
                    {matchData.betState.matchOdds102.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Rest of Match - Winner</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('matchOdds102', 'o1')}>{calcOdd(matchData.betState.matchOdds102.o1)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('matchOdds102', 'o0')}>{calcOdd(matchData.betState.matchOdds102.o0)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('matchOdds102', 'o2')}>{calcOdd(matchData.betState.matchOdds102.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.matchWinnerOdds102.released ?
                        <div id="winner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Winner</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('matchWinnerOdds102', 'o1')}>{calcOdd(matchData.betState.matchWinnerOdds102.o1)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('matchWinnerOdds102', 'o0')}>{calcOdd(matchData.betState.matchWinnerOdds102.o0)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('matchWinnerOdds102', 'o2')}>{calcOdd(matchData.betState.matchWinnerOdds102.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.matchOddsOU.released || (matchData.betState.totalsHomeTeamOddsOU.released && matchData.betState.totalsAwayTeamOddsOU.released) ?
                        <div id="winner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Over/Under</div>
                            </div>
                            <div className="custom-row">
                                {matchData.betState.matchOddsOU.released ?
                                    <div className="row px-4">
                                        <div className="col-4 p-2 d-flex justify-content-center align-items-center">
                                            <div className="bet-type-line-title bet-name">{matchData.betState.matchOddsOU.threshold / 10}</div>
                                        </div>
                                        <div className="col-4 p-2" >
                                            <div className="bet-type-line-title">+</div>
                                            <a className="changeable-odd" onClick={() => betOddSelect('matchOddsOU', 'over')}>{calcOdd(matchData.betState.matchOddsOU.over)}</a>
                                        </div>
                                        <div className="col-4 p-2">
                                            <div className="bet-type-line-title">-</div>
                                            <a className="changeable-odd" onClick={() => betOddSelect('matchOddsOU', 'under')}>{calcOdd(matchData.betState.matchOddsOU.under)}</a>
                                        </div>
                                    </div>
                                    : <></>}
                                {matchData.betState.totalsHomeTeamOddsOU.released && matchData.betState.totalsAwayTeamOddsOU.released ?
                                    <>
                                        <div className="row px-4">
                                            <div className="col-6 p-2 d-flex justify-content-center align-items-center">
                                                <div className="bet-type-line-title bet-name">Home Over/Under {matchData.betState.totalsHomeTeamOddsOU.threshold}</div>
                                            </div>
                                            <div className="col-6 p-2 d-flex justify-content-around">
                                                <div>
                                                    <div className="bet-type-line-title">+</div>
                                                    <a className="changeable-odd" onClick={() => betOddSelect('totalsHomeTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsHomeTeamOddsOU.over)}</a>
                                                </div>
                                                <div>
                                                    <div className="bet-type-line-title">-</div>
                                                    <a className="changeable-odd" onClick={() => betOddSelect('totalsHomeTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsHomeTeamOddsOU.under)}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row px-4">
                                            <div className="col-6 p-2 d-flex justify-content-center align-items-center">
                                                <div className="bet-type-line-title bet-name">Away Over/Under {matchData.betState.totalsAwayTeamOddsOU.threshold}</div>
                                            </div>
                                            <div className="col-6 p-2 d-flex justify-content-around">
                                                <div>
                                                    <div className="bet-type-line-title">+</div>
                                                    <a className="changeable-odd" onClick={() => betOddSelect('totalsAwayTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsAwayTeamOddsOU.over)}</a>
                                                </div>
                                                <div>
                                                    <div className="bet-type-line-title">-</div>
                                                    <a className="changeable-odd" onClick={() => betOddSelect('totalsAwayTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsAwayTeamOddsOU.under)}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : <></>}
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.nextGoalOdds102.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Next Goal</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('nextGoalOdds102', 'o1')}>{calcOdd(matchData.betState.nextGoalOdds102.o1)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('nextGoalOdds102', 'o0')}>{calcOdd(matchData.betState.nextGoalOdds102.o0)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('nextGoalOdds102', 'o2')}>{calcOdd(matchData.betState.nextGoalOdds102.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.handicapOdds102.BASE.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Handicap</div>
                            </div>
                            <div className="row px-4">
                                <div className="col-6 p-2 d-flex justify-content-center align-items-center">
                                    <div className="bet-type-line-title bet-name">
                                        Rest of Match - Handicap {matchData.betState.handicapOdds102.handicap.home}:{matchData.betState.handicapOdds102.handicap.away}
                                    </div>
                                </div>
                                <div className="col-6 p-2 d-flex justify-content-around">
                                    <div>
                                        <div className="bet-type-line-title">1</div>
                                        <a className="changeable-odd" onClick={() => betOddSelect('handicapOdds102', 'o1')}>{calcOdd(matchData.betState.handicapOdds102.BASE.o1)}</a>
                                    </div>
                                    <div>
                                        <div className="bet-type-line-title">X</div>
                                        <a className="changeable-odd" onClick={() => betOddSelect('handicapOdds102', 'o0')}>{calcOdd(matchData.betState.handicapOdds102.BASE.o0)}</a>
                                    </div>
                                    <div>
                                        <div className="bet-type-line-title">2</div>
                                        <a className="changeable-odd" onClick={() => betOddSelect('handicapOdds102', 'o2')}>{calcOdd(matchData.betState.handicapOdds102.BASE.o2)}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.doubleChanceOdds102.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Double Chance</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('doubleChanceOdds102', 'o1')}>{calcOdd(matchData.betState.doubleChanceOdds102.o1)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('doubleChanceOdds102', 'o0')}>{calcOdd(matchData.betState.doubleChanceOdds102.o0)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('doubleChanceOdds102', 'o2')}>{calcOdd(matchData.betState.doubleChanceOdds102.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.firstHalftimeDoubleChanceOdds102.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">1st Half Double Chance</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDoubleChanceOdds102', 'o1')}>{calcOdd(matchData.betState.firstHalftimeDoubleChanceOdds102.o1)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDoubleChanceOdds102', 'o0')}>{calcOdd(matchData.betState.firstHalftimeDoubleChanceOdds102.o0)}</a>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDoubleChanceOdds102', 'o2')}>{calcOdd(matchData.betState.firstHalftimeDoubleChanceOdds102.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.bothToScoreOddsYN.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Both Teams To Score</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">YES</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('bothToScoreOddsYN', 'yes')}>{calcOdd(matchData.betState.bothToScoreOddsYN.yes)}</a>
                                </div>
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">No</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('bothToScoreOddsYN', 'no')}>{calcOdd(matchData.betState.bothToScoreOddsYN.no)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.drawNoBet12.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Draw No Bet</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('drawNoBet12', 'o1')}>{calcOdd(matchData.betState.drawNoBet12.o1)}</a>
                                </div>
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('drawNoBet12', 'o2')}>{calcOdd(matchData.betState.drawNoBet12.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    {matchData.betState.firstHalftimeDrawNoBetOdds12.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">1st Half Draw No Bet</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDrawNoBetOdds12', 'o1')}>{calcOdd(matchData.betState.firstHalftimeDrawNoBetOdds12.o1)}</a>
                                </div>
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <a className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDrawNoBetOdds12', 'o2')}>{calcOdd(matchData.betState.firstHalftimeDrawNoBetOdds12.o2)}</a>
                                </div>
                            </div>
                        </div>
                        : <></>}
                    <div className="margin-bottom-30"></div>
                </>
                    : <></>}
            </div>
        </div>
    </>
}
export default OddDetailPanel;