import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MobileNavbar, MobileFooter } from '../../../mobile/components'
import { getMyTransactions } from '../../../store/actions/betActions'
import { GetTime } from '../../../utils';
import './mTransactions.css'

function MTransactions() {
    const dispatch = useDispatch()
    const [period, setPeriod] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const transactionsList = useSelector(state => state.betReducers.transactionsList);
    useEffect(() => {
        let data = {
            period : period,
            startIndex: startIndex
        }
        dispatch(getMyTransactions(data));
    }, [])
    console.log('transactionsList', transactionsList);
    return (
        <>
            <MobileNavbar />
            <div className='m-body'>
                <div className='transactions'>
                    <div className='status'>
                        <label>Period:</label>
                        <select id='bets_period' className='' defaultValue={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value='1'>All</option>
                            <option value='2'>Today</option>
                            <option value='3'>3 Days</option>
                            <option value='4'>7 Days</option>
                            <option value='5'>30 Days</option>
                        </select>
                    </div>
                    <div className='match-header'>
                        <div className='col-3 text-center'>Date</div>
                        <div className='col-5 text-center'>Type</div>
                        <div className='col-2 text-center'>Amount</div>
                        <div className='col-2 text-center'>Balance after</div>
                    </div>
                    {transactionsList && transactionsList.length > 0 ? transactionsList.map((list, index) => 
                        <div className={list.type === 1 || list.type === 4 ? 'transaction-item win' : 'transaction-item'}>
                            <div className='col-3 text-center'>{GetTime(list.date)}</div>
                            <div className='col-5 text-center'>
                                {list.type === 1 ? 'Deposit' : list.type === 3 ? 'Bet' : list.type === 4 ? 'Win' : null}
                                {'('}{list.betAPIId}{')'}
                            </div>
                            <div className='col-2 text-center'>{(list.amount / 100).toFixed(2)}</div>
                            <div className='col-2 text-center'>{(list.balanceAfter / 100).toFixed(2)}</div>
                        </div>
                    ): <div className='d-flex justify-content-center'>No Data Found</div>}
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MTransactions;