import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MobileNavbar, MobileFooter } from '../../../mobile/components'
import { getMyBet, generateBarcode } from '../../../store/actions/betActions'
import { GetTime } from '../../../utils';
import { betTypesList } from '../../../utils/dataUtils';
import BarcodeContainer from '../../components/barcode';
import './myBets.css'
function MyBets() {
    const dispatch = useDispatch()
    const [detailOpen, setDetailOpen] = useState(null);
    const [hold, setHold] = useState(null);
    const [barCodeShow, setBarCodeShow] = useState(false);
    const [barCodeJsonString, setBarCodeJsonString] = useState('');
    const myBetData = useSelector(state => state.betReducers.myBetData);
    const getBarCodeJson = useSelector(state => state.betReducers.getBarCodeJson)
    const userData = useSelector(state => state.authReducers)
    let barCodeJson = {
        userData: '',
        barCodeJson: ''
    }
    useEffect(() => {
        dispatch(getMyBet());
    }, [])
    const funcHold = (index) => {
        index === hold ? setHold(null) : setHold(index);
    }
    useEffect(() => {
        if (getBarCodeJson) setBarCodeJsonString(getBarCodeJson.barcode)
    }, [getBarCodeJson])
    const createBarcode = (index) => {
        if (!isAuth) {
            ToastService("Please Login", 'error');
            setConfirmVal(false);
        } else {
            if (myBetData){
                setBarCodeShow(true)
                barCodeJson = {
                    userData: userData,
                    betCollectList: myBetData[detailOpen].bettingEvents
                }
                let JsonString = JSON.stringify(barCodeJson)
                if (barCodeJson.userData === null || barCodeJson.betCollectList.length === 0) { }
                else {
                    let postData = { barcodeJsonString: JsonString }
                    dispatch(generateBarcode(postData));
                }
            }
        }
    }
    const onClickConfirm = () => {
        setBarCodeJsonString('')
    }
    console.log('=>',myBetData);
    return (
        <>
            {barCodeShow && barCodeJsonString !== '' && myBetData ?
                <BarcodeContainer
                    barCodeJsonString={barCodeJsonString}
                    totalStake={myBetData[detailOpen].initialStake}
                    maxWinning={myBetData[detailOpen].maxWinning}
                    betCollectList={myBetData[detailOpen].bettingEvents}
                    onClickConfirm={onClickConfirm}
                />
                : null
            }
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
                        <div className='myaccount-table'>
                            {detailOpen === null ?
                                <>
                                    <div className='match-header'>
                                        <div className='col-3 text-center'>Type</div>
                                        <div className='col-4 text-center'>Date</div>
                                        <div className='col-2 text-center'>Stake</div>
                                        <div className='col-3 text-center'>Winnings</div>
                                    </div>
                                    <div className='match-body'>
                                        {myBetData !== null && myBetData.length > 0 ?
                                            myBetData.map((item, index) =>
                                                <div key={index} onClick={() => setDetailOpen(index)} className={item.state === 0 ? 'bet-result-wait' : item.state === 1 ? 'bet-result-win' : 'bet-result-lost'}>
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
                                                            :   <div className='d-flex justify-content-center'>
                                                                    <p>Lost</p>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                            : <div> NO Data Found</div>}
                                    </div>
                                    <div className='match-footer text-center'></div>
                                </>
                            :
                            <div className='p-3 pt-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='back-button' onClick={() => setDetailOpen(null)}>Back</div>
                                    <div className='betslip-createbarcode-button' onClick={() => createBarcode(detailOpen)}>Create Barcode</div>
                                </div>
                                <div className='d-flex status mt-3'>
                                    <div className={myBetData[detailOpen].state === 0 ? 'result-awaited' : myBetData[detailOpen].state === 1 ? 'win' : 'lost'}>
                                        {myBetData[detailOpen].state === 0 ? 'Result Awaited' : myBetData[detailOpen].state === 1 ? 'Win' : 'Lose'}
                                    </div>
                                </div>
                                <div className='pt-2'>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Betting slip number:</div>
                                        <div className='col-6'>{myBetData[detailOpen]._id}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Date:</div>
                                        <div className='col-6'>{GetTime(myBetData[detailOpen].date)}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Number of bets:</div>
                                        <div className='col-6'>{myBetData[detailOpen].numBet}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Stake per bet:</div>
                                        <div className='col-6'>{myBetData[detailOpen].stakePerBet}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Tax:</div>
                                        <div className='col-6'>{myBetData[detailOpen].tax}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Total stake:</div>
                                        <div className='col-6'>{myBetData[detailOpen].initialStake}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Payout:</div>
                                        <div className='col-6'>{(myBetData[detailOpen].payout).toFixed(2)}</div>
                                    </div>
                                    <div className='pt-1 row row-data'>
                                        <div className='yellow-text col-6'>Max winning:</div>
                                        <div className='col-6'>{myBetData[detailOpen].maxWinning}</div>
                                    </div>
                                </div>
                                <div className='betslip-detail-rows mt-3'>
                                    <div className='betslip-detail-row text-center'>Betting Events</div>
                                    {myBetData[detailOpen].bettingEvents.length > 0 ?
                                        myBetData[detailOpen].bettingEvents.map((item, index) => 
                                            <div key={index} className='betslip-detail-row' onClick={() => funcHold(index)}>
                                                <div className='d-flex pt-2'>
                                                    <div className='col-4'>Date</div>
                                                    <div className='col-5'>{item.matchDate}</div>
                                                    <div className='bet-detail-icon bets-waiting col-3 d-flex justify-content-end'>
                                                        <p className={item.state === 0 ? 'result-awaited' : item.state === 1 ? 'win' : 'lost'}>
                                                            <svg className={hold !== index ? "svg-inline--fa fa-arrow-alt-circle-down fa-w-16 direction-rotate" : "svg-inline--fa fa-arrow-alt-circle-down fa-w-16"} aria-hidden="true" data-fa-processed="" data-prefix="far" data-icon="arrow-alt-circle-down"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z"></path></svg>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='col-4'>Betting Event</div>
                                                    <div className='col-8'>{item.homeTeam}{" - "}{item.awayTeam}</div>
                                                </div>
                                                <div className={hold === index ? '' : 'hold'}>
                                                    <div className='d-flex'>
                                                        <div className='col-4'>Score</div>
                                                        <div className='col-8'>{item.homeTeamScore}{":"}{item.awayTeamScore}</div>
                                                    </div>
                                                    {/* <div className='d-flex'>
                                                        <div className='col-4'>Bank</div>
                                                        <div className='col-8'></div>
                                                    </div> */}
                                                    <div className='d-flex'>
                                                        <div className='col-4'>Result</div>
                                                        <div className='col-8'></div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-4'>Tip</div>
                                                        <div className='col-8'>{item.selectedOdds === 'o1' ? item.homeTeam : item.selectedOdds === 'o2' ? item.awayTeam : 'Draw' }{'('}{betTypesList[item.betType].title}{')'}</div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-4'>Odds</div>
                                                        <div className='col-8'>{item.odd}</div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='col-4'>Winnings</div>
                                                        <div className={item.state === 0 ? 'result-awaited col-8 status' : item.state === 1 ? 'win col-8 status' : 'lost col-8 status'}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    : null}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MyBets;