import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ToastService from '../service/toast.service';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import './styles/rightPanel.css'
import { useEffectOnce } from 'usehooks-ts'

const RightPanel = () => {
    const amountRef = useRef(Number(5));
    const [open, setOpen] = useState(false);
    const [stake, setStake] = useState(Number(0));
    const [totalStake, setTotalStake] = useState(Number(0));
    const [tax, setTax] = useState(Number(0));
    const [stakeBet, setStakeBet] = useState(Number(0));
    const [numBet, setNumBet] = useState(Number(0));
    const [maxWinning, setMaxWinning] = useState(Number(0));

    const [bet, setBet] = useState(true);
    const userData = useSelector(state => state.authReducers)
    const { i18n } = useTranslation();
    useEffect(() => {
        if (userData && userData.user) {
            // setCurrentLang(Language[userData.user.lang])
        }
    })
    useEffectOnce(() => {
        if (localStorage.lang) {
            let lang = localStorage.getItem('lang')
            i18n.changeLanguage(lang);
        }
    })
    const resetAll = () => {
        setStake(Number(0));
        setTotalStake(Number(0));
        setTax(Number(0));
        setStakeBet(Number(0));
        setNumBet(Number(0));
        setMaxWinning(Number(0));
        amountRef.current.value = Number(0.00);
    }
    const amountCount = (param) => {
        console.log('here', typeof Number(amountRef.current.value));
        if (param === 1) {
            setStake(Number(stake)+ Number(amountRef.current.value));
            setTotalStake(Number(totalStake) *1 + Number(amountRef.current.value) *1);
        }
        else{
            setStake(Number(stake) - Number(amountRef.current.value));
            setTotalStake(Number(totalStake) - Number(amountRef.current.value));
        }
    }
    const placeBet = () => {
        if (!userData.isAuthenticated) {
            ToastService("Please Login", 'error');
            return;
        }
        setBet(false)
    }
    const betConfirm = () => {
        ToastService('betConfirm', 'success')
    }
    return (
        <div className='betpanel'>
            {userData.isAuthenticated ?
                <div className='row chashoutbtn'>
                    <div className='d-flex justify-content-center'>
                        <svg aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="dollar-sign" className="svg-inline--fa fa-dollar-sign fa-w-10 fa-2x" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M113.411 169.375c0-23.337 21.536-38.417 54.865-38.417 26.726 0 54.116 12.263 76.461 28.333 5.88 4.229 14.13 2.354 17.575-4.017l23.552-43.549c2.649-4.898 1.596-10.991-2.575-14.68-24.281-21.477-59.135-34.09-91.289-37.806V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v49.832c-58.627 13.29-97.299 55.917-97.299 108.639 0 123.533 184.765 110.81 184.765 169.414 0 19.823-16.311 41.158-52.124 41.158-30.751 0-62.932-15.88-87.848-35.887-5.31-4.264-13.082-3.315-17.159 2.14l-30.389 40.667c-3.627 4.854-3.075 11.657 1.302 15.847 24.049 23.02 59.249 41.255 98.751 47.973V500c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-47.438c65.72-10.215 106.176-59.186 106.176-116.516.001-119.688-184.764-103.707-184.764-166.671z"></path></svg>
                    </div>
                    <div className='d-flex justify-content-center pb-1'>
                        <p>Cashout</p>
                    </div>
                </div>
                : <></>
            }
            <div className="bet-type-btn d-flex">
                <p className={open ? "bet-type-btn-child" : "bet-type-btn-child focus"} onClick={() => setOpen(false)}><Trans>Single/Multiple</Trans></p>
                <p className={open ? "bet-type-btn-child focus" : "bet-type-btn-child"} onClick={() => setOpen(true)}><Trans>SYSTEM</Trans></p>
            </div>
            <div className="bet-slip">
                <div className="selected-bets selected-bets-l"></div>
                {open ? <div className='comb'>
                    <label><Trans>Combinations:</Trans></label>
                </div>
                    : <></>
                }
                <div className="bet-totals d-flex">
                    <p className="btn-reset" onClick={resetAll}><Trans>Reset</Trans></p>
                    <div className="totals px-2 pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="push-left"><Trans>Stake:</Trans></div>
                            <div className="push-right">{stake}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left"><Trans>Tax:</Trans></div>
                            <div className="push-right">{tax}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left"><Trans>Total stake:</Trans></div>
                            <div className="push-right">{totalStake}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left"><Trans>Stake per bet:</Trans></div>
                            <div className="push-right">{stakeBet}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left"><Trans>Number of bets:</Trans></div>
                            <div className="push-right">{numBet}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left"><Trans>Max Winning:</Trans></div>
                            <div className="push-right">{maxWinning}</div>
                        </div>
                    </div>
                </div>
                <div className="place-bet show">
                    <div className='d-flex justify-content-around'>
                        <div>
                            <p onClick={() => amountCount(0)}>-</p>
                        </div>
                        <div className="align-self-center col-8">
                            <div>
                                <input type="number" step='0.1' id="PayingAmount" ref={amountRef} defaultValue="0.00" className="payingamount py-1" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div>
                            <p onClick={() => amountCount(1)}>+</p>
                        </div>
                    </div>

                    {bet ?
                        <div className="col-12">
                            <p className="btn-place-bet py-1" onClick={() => placeBet(true)}><Trans>Place bet</Trans></p>
                        </div>
                        : <div className="instead d-flex">
                            <div className="col-6">
                                <p className="btn-place-bet py-1" onClick={() => betConfirm()}><Trans>Confirm</Trans></p>
                            </div>
                            <div className="col-6">
                                <p className="btn-place-bet cancel py-1" onClick={() => setBet(true)}><Trans>Cancel</Trans></p>
                            </div>
                        </div>
                    }

                </div>

                <div className="hide">
                    <div className="row">
                        <label className="col-9">Success. Would you like to have bet slip?</label>
                        <label className="col-3 t-a-r">0sn</label>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="button" className="btn-confirm">Ok</button>
                        </div>
                        <div className="col-6">
                            <button type="button" id="closeModal" className="btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RightPanel;