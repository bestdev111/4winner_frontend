import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getNormalTable, getFormTable } from '../../store/actions/mobileSportsActions'
import './styles/oddDetailPanel.css'
var isNumber = function isNumber(value) {
    let bool = value * 1 === value ? true : false;
    return bool;
}
const OddDetailPanel = (props) => {
    const dispatch = useDispatch()
    const [matchData, setMatchData] = useState()
    const [tabSelected, setTabSelected] = useState(0)
    const [subTab, setSubTab] = useState(0)
    const get_Matches = useSelector(state => state.mobileSportsReducers.getMatches)
    const get_NormalTable = useSelector(state => state.mobileSportsReducers.getNormalTable)
    const get_FormTable = useSelector(state => state.mobileSportsReducers.getFormTable)
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
    useEffect(() => {
        let obj = {
            sportId: 1,
            categoryId: 99,
            tournamentId: 652
        }
        if (tabSelected === 1) {
            dispatch(getNormalTable(obj))
        }
        if (tabSelected === 2) {
            dispatch(getFormTable(obj))
        }
    }, [tabSelected])
    const calcOdd = (param) => {
        let value = Number(param) / 100;
        return value.toFixed(2)
    }
    const handleChange = e => {
        e.stopPropagation();
    }
    const betOddSelect = (betType, oddType) => {

        console.log(props.matchId, betType, oddType);
    }
    const tendencyParse = (param) => {
        let valList = []
        for (let index = 0; index < param.length; index++) {
            if (isNumber(parseInt(param[index]))) {
                valList.push(parseInt(param[index]));
            }
        }
        const temp = valList.map((val, index) => {
            return <div key={index} className={val === 3 ? 'tendency win' : val === 1 ? 'tendency draw' : val === 0 ? 'tendency loss' : null}></div>
        })
        return temp
    }
    console.log('get_FormTable=>', get_FormTable);
    return <>
        <div className="openDetailOdd" onScroll={handleChange}>
            <div className='match-detail-header'>
                <div className="d-flex">
                    <div className='match-detail-header-info'>
                        <div>
                            <div className='d-flex justify-content-center'>
                                <span className='match-date'>
                                    {matchData ? matchData.betState.matchState === 1 ? props.date ? props.date + ' ' : null : 'Live ' : null}
                                    {matchData ? matchData.betState.matchState > 2 ? props.time ? props.time + "'" : null : props.time ? props.time : null : null}
                                </span>
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
            </div>
            <div className='match-detail-content'>
                {matchData ? <>
                    <>
                        <div className='custom-row line-white'>
                            <div className='tabs'>
                                <p className={tabSelected === 0 ? 'tab tab-selected' : 'tab'} onClick={() => setTabSelected(0)}><img className='stadium' src='assets/images/micons/stadium.png' alt='' /></p>
                                <p className={tabSelected === 1 ? 'tab tab-selected' : 'tab'} onClick={() => setTabSelected(1)}><img src='assets/images/micons/list.png' alt='' /></p>
                                <p className={tabSelected === 2 ? 'tab tab-selected' : 'tab'} onClick={() => setTabSelected(2)}><img src='assets/images/micons/analytic.png' alt='' /></p>
                            </div>
                        </div>
                        {tabSelected === 1 ?
                            <div className="league-table">
                                <div className="table-responsive">
                                    <ul className="nav nav-tab">
                                        <li className={subTab === 0 ? "active" : ''} onClick={() => setSubTab(0)}><p><b>Total</b></p></li>
                                        <li className={subTab === 1 ? "active" : ''} onClick={() => setSubTab(1)}><p><b>Home</b></p></li>
                                        <li className={subTab === 2 ? "active" : ''} onClick={() => setSubTab(2)}><p><b>Away</b></p></li>
                                    </ul>
                                    <table className="table table-fixed">
                                        <thead className="d-block">
                                            <tr>
                                                <th className="w-10">#</th>
                                                <th className="w-40">Team</th>
                                                <th className="w-10">P</th>
                                                <th className="w-10">W</th>
                                                <th className="w-10">D</th>
                                                <th className="w-10">L</th>
                                                <th className="w-20">Goals</th>
                                                <th className="w-10">PTS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="d-block">
                                            {get_NormalTable !== [] && get_NormalTable.data ? get_NormalTable.data.result.map((table, index) =>
                                                <tr key={index}>
                                                    <td className="w-10">{subTab === 0 ? table.positionTotal : subTab === 1 ? table.positionHome : table.positionAway}</td>
                                                    <td className="w-40">{table.teamName}</td>
                                                    <td className="w-10">{subTab === 0 ? table.pointsTotal : subTab === 1 ? table.pointsHome : table.pointsAway}</td>
                                                    <td className="w-10">{subTab === 0 ? table.winTotal : subTab === 1 ? table.winHome : table.winAway}</td>
                                                    <td className="w-10">{subTab === 0 ? table.drawTotal : subTab === 1 ? table.drawHome : table.drawAway}</td>
                                                    <td className="w-10">{subTab === 0 ? table.lostTotal : subTab === 1 ? table.lostHome : table.lostAway}</td>
                                                    <td className="w-20">{subTab === 0 ? table.goalsTotal : subTab === 1 ? table.goalsHome : table.goalsAway}</td>
                                                    <td className="w-10">{subTab === 0 ? table.pointsTotal : subTab === 1 ? table.pointsHome : table.pointsAway}</td>
                                                </tr>
                                            ) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : tabSelected === 2 ?
                                <div className="league-table">
                                    <div className="table-responsive">
                                        <table className="table table-fixed">
                                            <thead className="d-block">
                                                <tr>
                                                    <th className="w-10">#</th>
                                                    <th className="w-40">Team</th>
                                                    <th className="w-40">Tendency</th>
                                                    <th className="w-20">Goals</th>
                                                    <th className="w-10">PTS</th>
                                                </tr>
                                            </thead>
                                            <tbody className="d-block">
                                                {get_FormTable !== [] && get_FormTable.data ? get_FormTable.data.result.map((table, index) =>
                                                    <tr key={index}>
                                                        <td className="w-10">{table.positionTotal}</td>
                                                        <td className="w-40">{table.teamName}</td>
                                                        <td className='w-40'>
                                                            {tendencyParse(table.tendencyTotal)}
                                                        </td>
                                                        <td className="w-20">{table.goalsTotal}</td>
                                                        <td className="w-10">{table.pointsTotal}</td>
                                                    </tr>
                                                ) : null}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td className="tendency win"></td>
                                                    <td className="tendency-title"><b>:Win</b></td>
                                                    <td className="tendency loss"></td>
                                                    <td className="tendency-title"><b>:Loss</b></td>
                                                    <td className="tendency draw"></td>
                                                    <td className="tendency-title"><b>:Draw</b></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                : null
                        }
                    </>
                    {matchData.betState.matchOdds102.released ?
                        <div id="restofmatchwinner">
                            <div className='custom-row match-detail-bet'>
                                <div className="custom-row p-2 match-detail-bet-header">Rest of Match - Winner</div>
                            </div>
                            <div className="custom-row row px-4">
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">1</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('matchOdds102', 'o1')}>{calcOdd(matchData.betState.matchOdds102.o1)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('matchOdds102', 'o0')}>{calcOdd(matchData.betState.matchOdds102.o0)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('matchOdds102', 'o2')}>{calcOdd(matchData.betState.matchOdds102.o2)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('matchWinnerOdds102', 'o1')}>{calcOdd(matchData.betState.matchWinnerOdds102.o1)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('matchWinnerOdds102', 'o0')}>{calcOdd(matchData.betState.matchWinnerOdds102.o0)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('matchWinnerOdds102', 'o2')}>{calcOdd(matchData.betState.matchWinnerOdds102.o2)}</p>
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
                                            <p className="changeable-odd" onClick={() => betOddSelect('matchOddsOU', 'over')}>{calcOdd(matchData.betState.matchOddsOU.over)}</p>
                                        </div>
                                        <div className="col-4 p-2">
                                            <div className="bet-type-line-title">-</div>
                                            <p className="changeable-odd" onClick={() => betOddSelect('matchOddsOU', 'under')}>{calcOdd(matchData.betState.matchOddsOU.under)}</p>
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
                                                    <p className="changeable-odd" onClick={() => betOddSelect('totalsHomeTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsHomeTeamOddsOU.over)}</p>
                                                </div>
                                                <div>
                                                    <div className="bet-type-line-title">-</div>
                                                    <p className="changeable-odd" onClick={() => betOddSelect('totalsHomeTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsHomeTeamOddsOU.under)}</p>
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
                                                    <p className="changeable-odd" onClick={() => betOddSelect('totalsAwayTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsAwayTeamOddsOU.over)}</p>
                                                </div>
                                                <div>
                                                    <div className="bet-type-line-title">-</div>
                                                    <p className="changeable-odd" onClick={() => betOddSelect('totalsAwayTeamOddsOU', 'under')}>{calcOdd(matchData.betState.totalsAwayTeamOddsOU.under)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('nextGoalOdds102', 'o1')}>{calcOdd(matchData.betState.nextGoalOdds102.o1)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('nextGoalOdds102', 'o0')}>{calcOdd(matchData.betState.nextGoalOdds102.o0)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('nextGoalOdds102', 'o2')}>{calcOdd(matchData.betState.nextGoalOdds102.o2)}</p>
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
                                        <p className="changeable-odd" onClick={() => betOddSelect('handicapOdds102', 'o1')}>{calcOdd(matchData.betState.handicapOdds102.BASE.o1)}</p>
                                    </div>
                                    <div>
                                        <div className="bet-type-line-title">X</div>
                                        <p className="changeable-odd" onClick={() => betOddSelect('handicapOdds102', 'o0')}>{calcOdd(matchData.betState.handicapOdds102.BASE.o0)}</p>
                                    </div>
                                    <div>
                                        <div className="bet-type-line-title">2</div>
                                        <p className="changeable-odd" onClick={() => betOddSelect('handicapOdds102', 'o2')}>{calcOdd(matchData.betState.handicapOdds102.BASE.o2)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('doubleChanceOdds102', 'o1')}>{calcOdd(matchData.betState.doubleChanceOdds102.o1)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('doubleChanceOdds102', 'o0')}>{calcOdd(matchData.betState.doubleChanceOdds102.o0)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('doubleChanceOdds102', 'o2')}>{calcOdd(matchData.betState.doubleChanceOdds102.o2)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDoubleChanceOdds102', 'o1')}>{calcOdd(matchData.betState.firstHalftimeDoubleChanceOdds102.o1)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">X</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDoubleChanceOdds102', 'o0')}>{calcOdd(matchData.betState.firstHalftimeDoubleChanceOdds102.o0)}</p>
                                </div>
                                <div className="col-4 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDoubleChanceOdds102', 'o2')}>{calcOdd(matchData.betState.firstHalftimeDoubleChanceOdds102.o2)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('bothToScoreOddsYN', 'yes')}>{calcOdd(matchData.betState.bothToScoreOddsYN.yes)}</p>
                                </div>
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">No</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('bothToScoreOddsYN', 'no')}>{calcOdd(matchData.betState.bothToScoreOddsYN.no)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('drawNoBet12', 'o1')}>{calcOdd(matchData.betState.drawNoBet12.o1)}</p>
                                </div>
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('drawNoBet12', 'o2')}>{calcOdd(matchData.betState.drawNoBet12.o2)}</p>
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
                                    <p className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDrawNoBetOdds12', 'o1')}>{calcOdd(matchData.betState.firstHalftimeDrawNoBetOdds12.o1)}</p>
                                </div>
                                <div className="col-6 p-2">
                                    <div className="bet-type-line-title">2</div>
                                    <p className="changeable-odd" onClick={() => betOddSelect('firstHalftimeDrawNoBetOdds12', 'o2')}>{calcOdd(matchData.betState.firstHalftimeDrawNoBetOdds12.o2)}</p>
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