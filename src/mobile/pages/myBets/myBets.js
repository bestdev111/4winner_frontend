import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MobileNavbar, SubMobileNavbar, MobileFooter, LeagueContent } from '../../../mobile/components'
// import ToastService from '../../../service/toast.service';
import './myBets.css'
// import './mHome.css'

function MyBets() {
    const [openBetModal, setOpenBetModal] = useState(true);
    // const [numBet, setNumBet] = useState(Number(0));
    const [betCollectorHome, setBetCollectorHome] = useState([]);
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
                            No records found
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