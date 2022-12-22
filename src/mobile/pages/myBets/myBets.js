import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MobileNavbar, MobileFooter } from '../../../mobile/components'
import { getMyBet } from '../../../store/actions/betActions'
import { GetTime } from '../../../utils';
import './myBets.css'

function MyBets() {
    const dispatch = useDispatch()
    const [openBetModal, setOpenBetModal] = useState(true);
    const [detailOpen, setDetailOpen] = useState(true);
    const myBetData = useSelector(state => state.betReducers.myBetData);
    useEffect(() => {
        dispatch(getMyBet());
    }, [])
    console.log('myBetData', myBetData);
    return (
        <>
            <MobileNavbar />
            <div className='m-body'>
                <div className='transactions'>
                    <div className='status'>
                        <label>Period:</label>
                        <select id='bets_period' className='' defaultValue='1'>
                            <option value='1'>All</option>
                            <option value='2'>Today</option>
                            <option value='3'>3 Days</option>
                            <option value='4'>7 Days</option>
                            <option value='5'>30 Days</option>
                        </select>
                        <label>Bet Status:</label>
                        <select id='bets_status' className='' defaultValue='1'>
                            <option value='1'>All</option>
                            <option value='2'>Results Awaited</option>
                            <option value='3'>Lost</option>
                            <option value='4'>Won</option>
                            <option value='5'>Payed Out</option>
                        </select>
                    </div>
                    {detailOpen ? 
                        <div className='myaccount-table'>
                            <div className='match-header'>
                                <div className='col-3 text-center'>Type</div>
                                <div className='col-4 text-center'>Date</div>
                                <div className='col-2 text-center'>Stake</div>
                                <div className='col-3 text-center'>Winnings</div>
                            </div>
                            <div className='match-body'>
                                {myBetData !== null && myBetData.length > 0 ?
                                    myBetData.map((item, index) =>
                                        <div key={index} onClick={()=>setDetailOpen(false)} className={item.state === 0 ? 'bet-result-wait' : item.state === 1 ? 'bet-result-win' : 'bet-result-lose'}>
                                            <div className='col-3 text-center p-2'>{item.betSystem}</div>
                                            <div className='col-4 text-center p-2'>{GetTime(item.date)}</div>
                                            <div className='col-2 text-center p-2'>{item.initialStake.toFixed(2)}</div>
                                            <div className='col-3 text-center p-2'>
                                                {item.state === 0 ? <p>Result Awaited</p>
                                                    : item.state === 1 ?
                                                    <>
                                                        <div className='d-flex justify-content-center'>
                                                            <p>{item.maxWinning}</p>
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <p>Win</p>
                                                        </div>
                                                    </>
                                                    : <>
                                                        <div className='d-flex justify-content-center'>
                                                            <p>{item.maxWinning}</p>
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <p>Lose</p>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    )
                                    : <div> NO Data Found</div>}
                            </div>
                            <div className='match-footer text-center'></div>
                        </div>
                    :
                        <div className='myaccount-table'>
                            <div></div>
                        </div>
                    }
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MyBets;