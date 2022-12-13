import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MobileNavbar, SubMobileNavbar, MobileFooter, LeagueContent } from '../../../mobile/components'
import { getMyBetData } from '../../../store/actions/betActions'
import './myBets.css'

function MyBets() {
    const dispatch = useDispatch()
    const [openBetModal, setOpenBetModal] = useState(true);
    // const [numBet, setNumBet] = useState(Number(0));
    const myBetData = useSelector(state => state.betReducers.myBetData);
    useEffect(()=> {
        dispatch(getMyBetData());
    },[])
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
                            <option value='2'>Today</option>
                            <option value='3'>3 Days</option>
                            <option value='4'>7 Days</option>
                            <option value='5'>30 Days</option>
                        </select>
                    </div>
                    <div className='myaccount-table'>
                        <div className='match-header'>
                            <div className='col-3 text-center'>Type</div>
                            <div className='col-3 text-center'>Date</div>
                            <div className='col-3 text-center'>Stake</div>
                            <div className='col-3 text-center'>Winnings</div>
                        </div>
                        <div className='match-body p-3'>
                            {myBetData.length > 0 ? <div>
                                Bet List
                                </div>
                            :   <div> NO Data Found</div>}
                        </div>
                        <div className='match-footer text-center'></div>
                    </div>
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MyBets;