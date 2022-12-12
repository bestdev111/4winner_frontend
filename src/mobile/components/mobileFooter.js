import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useSelector } from 'react-redux';
import './styles/mobileFooter.css'
import ToastService from '../../service/toast.service';
import Calculator from './calculator';
function MobileFooter(props) {
    const mFooterList = [
        { icon: 'fa fa-home', title: 'Home', },
        { icon: 'fa fa-clock-o', title: 'Live' },
        { icon: 'fa fa-file-o', title: 'Bet Slip' },
        { icon: 'fa fa-thumbs-o-up', title: 'Highlights' },
        { icon: 'fa fa-list-alt', title: 'Results' },
    ];
    const mFooterListAuthor = [
        { icon: 'fa fa-home', title: 'Home' },
        { icon: 'fa fa-clock-o', title: 'Live' },
        { icon: 'fa fa-file-o', title: 'Bet Slip' },
        { icon: 'fa fa-heartbeat', title: 'My Bets' },
    ]
    const [openCalc, setOpenCalc] = useState(false);
    const [numActive, setNumActive] = useState(0);
    const [betSlipNum, setBetSlipNum] = useState(0);
    const [openBetModal, setOpenBetModal] = useState(true);
    const betCollectList = useSelector((state) => state.betReducers.betCollectList)
    const userData = useSelector(state => state.authReducers)
    const isAuth = userData.isAuthenticated;
    var temp1 = 1
    var temp2 = 0
    const [tab, setTab] = useState(true);
    const amountRef = useRef(Number(5));
    const [totalStake, setTotalStake] = useState(temp1.toFixed(2));
    const [tax, setTax] = useState(temp2.toFixed(2));
    const [stakeBet, setStakeBet] = useState(temp2.toFixed(2));
    const [numBet, setNumBet] = useState(Number(0));
    const [maxWinning, setMaxWinning] = useState(temp2.toFixed(2));

    let footerList = isAuth ? mFooterListAuthor : mFooterList;

    const goActive = (index) => {
        setNumActive(index);
    }
    const openModal = () => {
        setOpenBetModal(false)
    }
    const goTo = (title) => {
        if (title === 'Home') {
            window.location.href = '/';
            localStorage.setItem('path', 'Home');
        }
        if (title === 'Live') {
            window.location.href = '/';
            localStorage.setItem('path', 'Live');
        }
        if (title === 'Bet Slip') {
            openModal()
            localStorage.setItem('path', 'Bet Slip');
        }
        // if (title === 'Highlights') window.location.href = '/m_highlights'
        // if (title === 'Results') window.location.href = '/m_results'
        if (title === 'My Bets') {
            window.location.href = '/mybets';
            localStorage.setItem('path', 'My Bets');
        }
    }
    useEffect(() => {
        let num = 0;
        if (betCollectList.length > 0) {
            betCollectList.forEach(list => {
                num = num + list.odds.length;
            });
        }
        setBetSlipNum(num);
    }, [betCollectList])

    // bet slip board
    const calcStake = (param) => {
        let temp = param === 1 ? Number(totalStake) * 1 + 1 : totalStake > 1 ? Number(totalStake) * 1 - 1 : 1;
        setTotalStake(temp.toFixed(2));
    }
    const placeBet = () => {
        if (!isAuth) {
            ToastService("Please Login", 'error');
        } else {
            ToastService("Bet Success!", 'success');
        }
    }
    const oddsReset = () => {
        setOpenBetModal(true);
        var temp1 = 1
        var temp2 = 0
        setTotalStake(temp1.toFixed(2));
        setTax(temp2.toFixed(2));
        setStakeBet(temp2.toFixed(2))
        setMaxWinning(temp2.toFixed(2))
    }
    // console.log('Footer ===>', betCollectList);
    return (
        <>
            {!openBetModal ?
                <div className='bet-pan'>
                    <div className='oddmodal-header'>
                        <div className='title d-flex justify-content-between'>
                            <div>
                                <div onClick={() => setOpenBetModal(true)} ><i className="fa fa-times-circle-o fa-3x" aria-hidden="true"></i></div>
                            </div>
                            <div className='d-flex align-items-center'><span>BETTING SLIP</span></div>
                            <div onClick={oddsReset}><span className='btn btn-success'>Reset</span></div>
                        </div>
                    </div>
                    <div className='oddmodal-body'>
                        <div className="betslip-type">
                            <p
                                className={tab ? "btn btn-orange btn-group-justified single-multiple-button tab-selected" : "btn btn-orange btn-group-justified single-multiple-button"}
                                onClick={() => setTab(true)}
                            >SINGLE/MULTIPLE</p>
                            <p
                                className={!tab ? "btn btn-orange btn-group-justified single-multiple-button tab-selected" : "btn btn-orange btn-group-justified single-multiple-button"}
                                onClick={() => setTab(false)}
                            >SYSTEM</p>
                        </div>
                        <div className='tips'>
                            <div>{/* virtual data */}
                                <div className='tip'>
                                    <div className='d-flex justify-content-center'>
                                        {!tab ? <span className='btn-bank'>B</span> : <span></span>}
                                    </div>
                                    <div className='float'>
                                        <div className='tip-row'>
                                            <div className="tip-col middle-col bold">Ferroviaria SP (F)</div>
                                            <div className="tip-col right-col bold">5.00</div>
                                        </div>
                                        <div className='tip-row'>
                                            <div className="tip-col middle-col">Rest of Match</div>
                                            <div className="tip-col right-col bold">
                                                <div className=" currentscore-green">4-4</div>
                                            </div>
                                        </div>
                                        <div className='tip-row'>
                                            <div className="tip-col middle-col">Ferroviaria SP (F) - SE Palmeiras SP(F)</div>
                                            <div className="tip-col right-col bold">
                                                <div className=" currentscore-green"> 86'</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className='remove-btn'><i className="fa fa-times-circle-o fa-2x" aria-hidden="true"></i></p>
                            </div>
                            {!tab ?
                                <div className='combinations'>
                                    <div>Combinations: </div>
                                    <div>
                                        <input type="checkbox" id='cbCombination_0' className='cbCombination' value='0' />
                                        <label className='bold pl-2' htmlFor='cbCombination_0'>1 Out of 4 = 4 bets</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='cbCombination_0' className='cbCombination' value='0' />
                                        <label className='bold pl-2' htmlFor='cbCombination_0'>2 Out of 4 = 6 bets</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='cbCombination_0' className='cbCombination' value='0' />
                                        <label className='bold pl-2' htmlFor='cbCombination_0'>3 Out of 4 = 4 bets</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id='cbCombination_0' className='cbCombination' value='0' />
                                        <label className='bold pl-2' htmlFor='cbCombination_0'>4 Out of 4 = 1 bets</label>
                                    </div>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                    <div className='oddmodal-footer'>
                        <div className='betslip-stake'>
                            <p className="stake-button" onClick={() => calcStake(0)}>-</p>
                            <span ref={amountRef} className="stake-input" onClick={() => setOpenCalc(true)}>{totalStake}</span>
                            <p className="stake-button" onClick={() => calcStake(1)}>+</p>
                        </div>
                        <div>
                            <p className="place-bet bold">Create Barcode</p>
                            <div className="summary">
                                <div className="summary-row">
                                    <span>Total stake:</span>
                                    <span className="value bold">{totalStake}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax:</span>
                                    <span className="value bold">{tax}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Stake per bet:</span>
                                    <span className="value bold">{stakeBet}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Number of bets:</span>
                                    <span className="value bold">{numBet}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Max Winning :</span>
                                    <span className="value bold">{maxWinning}</span>
                                </div>
                            </div>
                            <p className="place-bet bold" onClick={placeBet}>Place bet</p>
                        </div>
                    </div>
                </div>
                : <></>
            }
            <Calculator show={openCalc} onClickOutside={() => setOpenCalc(false)} />
            {/* main footer bar */}
            <div className="m-footer pl-5 pr-5">
                <div className='d-flex justify-content-between'>
                    {
                        footerList.map((item, index) =>
                            <div className='item' key={index} onClick={() => goActive(index)}>
                                <div className='d-flex justify-content-center'>
                                    {betSlipNum > 0 && index === 2 ?
                                        <span onClick={openModal} className='bet-slip-active'>{betSlipNum}</span> :
                                        <i onClick={() => goTo(item.title)} className={localStorage.getItem('path') === item.title ? `footer-active ${item.icon}` : item.icon} ></i>
                                    }
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <p className={localStorage.getItem('path') === item.title ? 'footer-active' : ''}>{item.title}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}
export default MobileFooter