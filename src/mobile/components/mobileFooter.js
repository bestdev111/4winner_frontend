import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ToastService from '../../service/toast.service';
import Calculator from './calculator';
import BarcodeContainer from './barcode';
import { betRemoveOddsAction, removeAllBet, placeMyBet, generateBarcode } from "../../store/actions/betActions";
import { FadeInOut } from '../../utils';
import { betTypesList } from '../../utils/dataUtils'
import './styles/mobileFooter.css'

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
        { icon: 'fa fa-list-alt', title: 'Results' },
    ]
    const dispatch = useDispatch()
    const [openCalc, setOpenCalc] = useState(false);
    const [numActive, setNumActive] = useState(0);
    const [openBetModal, setOpenBetModal] = useState(true);
    const [barCodeShow, setBarCodeShow] = useState(false);
    const betCollectList = useSelector((state) => state.betReducers.betCollectList)
    const getBarCodeJson = useSelector(state => state.betReducers.getBarCodeJson)
    const userData = useSelector(state => state.authReducers)
    const get_Matches = useSelector(state => state.mobileSportsReducers.getMatches)

    const isAuth = userData.isAuthenticated;
    var temp1 = 5
    var temp2 = 0
    const [tab, setTab] = useState(true);
    const [barCodeJsonString, setBarCodeJsonString] = useState('');
    const amountRef = useRef(Number(5));
    const [totalStake, setTotalStake] = useState(temp1.toFixed(2));
    const [tax, setTax] = useState(temp2.toFixed(2));
    const [stakeBet, setStakeBet] = useState(temp2.toFixed(2));
    const [numBet, setNumBet] = useState();
    const [slipNum, setSlipNum] = useState();
    const [maxWinning, setMaxWinning] = useState(temp2.toFixed(2));
    const [confirmVal, setConfirmVal] = useState(false);
    let footerList = isAuth ? mFooterListAuthor : mFooterList;
    let barCodeJson = {
        userData: '',
        barCodeJson: ''
    }

    const openModal = () => {
        setOpenBetModal(false)
    }
    const goTo = (title, index) => {
        setNumActive(index);
        if (title === 'Home') {
            window.location.href = '/m_home';
            localStorage.setItem('path', 'Home');
            localStorage.setItem('leagueName', '');
        }
        if (title === 'Live') {
            window.location.href = '/m_live';
            localStorage.setItem('path', 'Live');
        }
        if (title === 'Bet Slip') {
            openModal()
            localStorage.setItem('path', 'Bet Slip');
        }
        if (title === "Highlights") {
            window.location.href = "/m_highlights";
            localStorage.setItem("path", "Highlights");
            localStorage.setItem("leagueName", "");
        }
        if (title === 'Results') {
            window.location.href = '/m_results'
            localStorage.setItem('path', 'Results');
        }
        if (title === 'My Bets') {
            window.location.href = '/mybets';
            localStorage.setItem('path', 'My Bets');
        }
    }
    useEffect(() => {
        let tempVal = 1;
        if (betCollectList && betCollectList.length > 0) {
            setSlipNum(betCollectList.length);
            let matchList = [];
            let matchCounts = [];
            betCollectList.forEach(item => {
                if (!matchList.includes(item.matchId)) {
                    matchList.push(item.matchId);
                }
            });
            for (let index = 0; index < matchList.length; index++) {
                let matchCount = 0
                betCollectList.forEach(item => {
                    if (item.matchId === matchList[index]) matchCount++
                });
                matchCounts.push(matchCount);
            }
            matchCounts.forEach(item => {
                tempVal = item * tempVal
            })
            setNumBet(tempVal);
        } else {
            setSlipNum(0);
            setNumBet(0)
        }
        let tempStack = totalStake / tempVal
        setStakeBet(tempStack.toFixed(2));
        calcMaxWinnings(betCollectList, tempVal)
    }, [betCollectList, totalStake])

    useEffect(() => {
        let tempStack = totalStake / numBet
        setStakeBet(tempStack.toFixed(2))
    }, [totalStake])

    // bet slip board
    const calcStake = (param) => {
        let temp = param === 1 ? Number(totalStake) * 1 + 1 : totalStake > 1 ? Number(totalStake) * 1 - 1 : 1;
        setTotalStake(temp.toFixed(2));
    }
    //bet 
    const confirmBet = () => {
        if (!isAuth) {
            ToastService("Please Login", 'error');
            setConfirmVal(false);
        } else {
            const betState = {
                initialStake: totalStake,
                tax: tax,
                stakeBet: (totalStake / numBet).toFixed(2),
                maxWinning: maxWinning,
                numBet: numBet,
                betSystem: 'Single/Multiple',
            }
            dispatch(placeMyBet(betCollectList, betState));
            setConfirmVal(false);
            oddsReset();
        }
    }
    const placeBet = () => {
        if (numBet === 0 && slipNum === 0) {
            ToastService("Please Add Bet!", 'info');
            return;
        }
        setConfirmVal(true)
    }
    //odd manage
    const oddsReset = () => {
        setOpenBetModal(true);
        var temp1 = 5
        var temp2 = 0
        setTotalStake(temp1.toFixed(2));
        setTax(temp2.toFixed(2));
        setStakeBet(temp2.toFixed(2))
        setMaxWinning(temp2.toFixed(2))
        dispatch(removeAllBet());
    }
    const removeBetOdd = (item) => {
        dispatch(betRemoveOddsAction(betCollectList, item))
    }
    //
    const onClickOutside = (param) => {
        setOpenCalc(false);
        if (param) setTotalStake(param);
    }
    // const objFunc = (obj, index, betType) => {
    //     for (let key in obj) {
    //         if (key === index && obj.hasOwnProperty(index)) {
    //             var value = obj[index];
    //             value = value / 100
    //             return value.toFixed(2);
    //         }
    //     }
    //     return null
    // }
    const calcMaxWinnings = (betCollectList, index) => {
        let temp = 1;
        let tempList = [];
        let tempMatchIds = [];
        betCollectList.forEach(item => {
            if (!tempMatchIds.includes(item.matchId)) {
                tempMatchIds.push(item.matchId);
            }
        })
        for (let index = 0; index < tempMatchIds.length; index++) {
            let sum = 0
            betCollectList.forEach(item => {
                if (item.matchId === tempMatchIds[index]) {
                    sum = sum + item.odds[0][item.selectedOdds] / 100
                }
            })
            temp = temp * sum;
        }
        const value = parseFloat(temp) * totalStake / index;
        setMaxWinning(value.toFixed(2))
    }
    const clickCreateBarcode = () => {
        if (!isAuth) {
            ToastService("Please Login", 'error');
            setConfirmVal(false);
        }else {
            setBarCodeShow(true)
            barCodeJson = {
                userData: userData,
                betCollectList: betCollectList
            }
            let JsonString = JSON.stringify(barCodeJson)
            if (barCodeJson.userData === null || barCodeJson.betCollectList.length === 0) { }
            else {
                let postData = { barcodeJsonString: JsonString }
                dispatch(generateBarcode(postData));
            }
        }
    }
    useEffect(() => {
        if (getBarCodeJson) setBarCodeJsonString(getBarCodeJson.barcode)
    }, [getBarCodeJson])
    const onClickConfirm = () => {
        setBarCodeJsonString('')
    }
    return (
        <>
            {!openBetModal && barCodeJsonString === '' ?
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
                        {betCollectList !== undefined && betCollectList !== [] ?
                            <div className='tips'>
                                {betCollectList.map((item, index) =>
                                    <div className='d-flex' key={index}>
                                        <div className='tip'>
                                            <div className='d-flex justify-content-center'>
                                                {!tab ? <span className='btn-bank'>B</span> : <span></span>}
                                            </div>
                                            <div className='tip-body'>
                                                <div className='tip-row'>
                                                    <div className="tip-col middle-col bold">{item.selectedOdds === 'o0' ? 'Draw' : item.selectedOdds === 'o1' ? item.homeTeam : item.awayTeam}</div>
                                                    <div className="tip-col right-col bold">{(item.odds[0][item.selectedOdds] / 100).toFixed(2)}</div>
                                                    {/* <div className="tip-col right-col bold">{objFunc(item.odds[0], item, item.betType)}</div> */}
                                                </div>
                                                <div className='tip-row'>
                                                    <div className="tip-col middle-col">{betTypesList[item.betType].title}</div>
                                                    <div className="tip-col right-col bold">
                                                        <div className=" currentscore-green">{item.homeScore}:{item.awayScore}</div>
                                                    </div>
                                                </div>
                                                <div className='tip-row'>
                                                    <div className="tip-col middle-col">{item.homeTeam} - {item.awayTeam}</div>
                                                    <div className="tip-col right-col bold">
                                                        <div className=" currentscore-green">
                                                            {item.matchState > 2 ? item.matchTime + "'" : item.matchDate + " " + item.matchTime}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='remove-btn' onClick={() => removeBetOdd(item)}><i className="fa fa-times-circle-o fa-2x" aria-hidden="true"></i></p>
                                    </div>
                                )}
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
                            : null}
                    </div>
                    <div className='oddmodal-footer'>
                        <div className='betslip-stake'>
                            <p className="stake-button" onClick={() => calcStake(0)}>-</p>
                            <span ref={amountRef} className="stake-input" onClick={() => setOpenCalc(true)}>{totalStake}</span>
                            <p className="stake-button" onClick={() => calcStake(1)}>+</p>
                        </div>
                        <div>
                            <p onClick={() => clickCreateBarcode()} className="place-bet bold">Create Barcode</p>
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
                : null
            }
            {barCodeShow && barCodeJsonString !== '' ?
                <BarcodeContainer
                    barCodeJsonString={barCodeJsonString}
                    totalStake={totalStake}
                    maxWinning={maxWinning}
                    betCollectList={betCollectList}
                    onClickConfirm={onClickConfirm}
                />
                : null
            }
            {confirmVal && barCodeJsonString === '' ?
                <FadeInOut show="true" duration={800}>
                    <div className='bet-confirm-modal'>
                        <div className='opacity-back'>
                            <div className='bet-confirm-modal bet-confirm'>
                                <p className='btn btn-success m-4' onClick={confirmBet}>Confirm</p>
                                <p className='btn btn-danger m-4' onClick={() => setConfirmVal(false)}>Cancel</p>
                            </div>
                        </div>
                    </div>
                </FadeInOut>
                : null}
            <Calculator show={openCalc} onClickOutside={onClickOutside} maxWinning={maxWinning} />
            {/* main footer bar */}
            <div className="m-footer px-2">
                <div className='d-flex justify-content-around'>
                    {
                        footerList.map((item, index) =>
                            <div className='item' key={index} onClick={() => goTo(item.title, index)}>
                                <div className='d-flex justify-content-center'>
                                    {slipNum > 0 && index === 2 ?
                                        <span onClick={openModal} className='bet-slip-active'>{slipNum}</span> :
                                        <i className={localStorage.getItem('path') === item.title ? `footer-active ${item.icon}` : item.icon} ></i>
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