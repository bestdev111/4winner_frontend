import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; 
import { MobileNavbar, SubMobileNavbar, MobileFooter, LeagueContent } from '../../../mobile/components'
import ToastService from '../../../service/toast.service';
import './mHome.css'
const tipTypesList = [
    [1, 'X', 2],
    [1, 'X', 2],
    ['Over', 'Under'],
    [1, 'X', 2],
    [1, 'X', 2],
    ['1X', 12, 'X2'],
    ['Yes', 'No'],
]
const leagueContentData = [
    {
        title: 'Football/Argentina/Torneo Regional Federal',
        leagues: [
            {
                content_Id: '1',
                teamName1: 'La Emilia',
                teamName2: 'Regatas San Nicol.',
                score1: 1,
                score2: 2,
                status: 3,
                redCard1: 0,
                redCard2: 2,
                odds: [1.5, 1.2, 2.3]
            },
            {
                content_Id: '2',
                teamName1: 'Paris SG',
                teamName2: 'Arsenal F.C.',
                score1: 0,
                score2: 0,
                status: 2,
                redCard1: 0,
                redCard2: 0,
                odds: [3.40, 1.70, 4.50]
            },
        ]
    },
    {
        title: 'Football/Mexico/Liga Expansion MX Apertura',
        leagues: [
            {
                content_Id: '3',
                teamName1: 'FC Barcelona',
                teamName2: 'Real Madrid',
                score1: 0,
                score2: 0,
                status: 0,
                redCard1: 0,
                redCard2: 0,
                odds: [15.00, 1.00, 2.90]
            },
            {
                content_Id: '4',
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odds: [15.00, 1.00, 23.00]
            },
            {
                content_Id: '5',
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odds: [8.80, 1.00, 15.00]
            },
            {
                content_Id: '6',
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odds: [2.70, 1.60, 8.00]
            },
            {
                content_Id: '7',
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odds: [5.60, 2.50, 2.60]
            },
            {
                content_Id: '8',
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odds: [14.00, 7.50, 6.40]
            },
        ]
    }
]
function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}
function MHome() {
    const [openBetModal, setOpenBetModal] = useState(true);
    const [tipTypes, setTipTypes] = useState();
    const [tab, setTab] = useState(true);
    const [bet, setBet] = useState(true);
    const amountRef = useRef();
    const [stake, setStake] = useState(Number(0));
    const [totalStake, setTotalStake] = useState(Number(0));
    const [tax, setTax] = useState(Number(0));
    const [stakeBet, setStakeBet] = useState(Number(0));
    const [numBet, setNumBet] = useState(Number(0));
    const [maxWinning, setMaxWinning] = useState(Number(0));
    const userData = useSelector(state => state.authReducers)
    const getTipTypes = (data) => {
        setTipTypes(data);
    }
    const modalFunc = param => {
        setOpenBetModal(param)
    }
    const amountCount = (param) => {
        if (param === 1) {
            setStake(Number(stake) + Number(amountRef.current.value));
            setTotalStake(Number(totalStake) * 1 + Number(amountRef.current.value) * 1);
        }
        else {
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
    return (
        <>
            <MobileNavbar />
            {openBetModal ?
                <>
                    <SubMobileNavbar parentCallback={getTipTypes} />
                    <div className='m_content'>
                        <div className='m_header'>
                            <div className='odds'>
                                {tipTypes !== undefined ? tipTypesList[tipTypes].map((item, index) => <p key={index}>{item}</p>) : <></>}
                            </div>
                        </div>
                        <div className='m_body'>
                            {leagueContentData && leagueContentData.map((leaguesData, index) =>
                                <div key={index}>
                                    <div key={index} className="league-content">{leaguesData.title}</div>
                                    {leaguesData.leagues.map((leagues, i) =>
                                        <LeagueContent
                                            key={i}
                                            // selected={betCollectList}
                                            content_Id={leagues.content_Id}
                                            teamName1={leagues.teamName1}
                                            teamName2={leagues.teamName2}
                                            score1={leagues.score1}
                                            score2={leagues.score2}
                                            status={leagues.status}
                                            redCard1={leagues.redCard1}
                                            redCard2={leagues.redCard2}
                                            odds={leagues.odds}
                                        // betCollector={BetCollector} 
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <MobileFooter modalFunc={modalFunc} />
                </>
                :
                <div className='bet-pan'>
                    <div className='oddmodal-header'>
                        <div className='title d-flex justify-content-between'>
                            <div>
                                <div onClick={() => setOpenBetModal(true)} ><i className="fa fa-times-circle-o fa-3x" aria-hidden="true"></i></div>
                            </div>
                            <div className='d-flex align-items-center'><span>BETTING SLIP</span></div>
                            <div><span className='btn btn-success'>Reset</span></div>
                        </div>
                    </div>
                    <div className='oddmodal-body'>
                        <div className="betslip-type">
                            <a 
                                className={tab ? "btn btn-orange btn-group-justified single-multiple-button tab-selected" : "btn btn-orange btn-group-justified single-multiple-button"}
                                onClick={()=> setTab(true)}
                            >SINGLE/MULTIPLE</a>
                            <a 
                                className={!tab ? "btn btn-orange btn-group-justified single-multiple-button tab-selected" : "btn btn-orange btn-group-justified single-multiple-button"}
                                onClick={() => setTab(false) }
                            >SYSTEM</a>
                        </div>
                        <div className='tips'>
                            {!tab ? <div className='combinations'><span>Combinations: </span></div> : <></>}

                        </div>
                    </div>
                    <div className='oddmodal-footer'>
                        <div className='betslip-stake'>
                            <a className="stake-button" onClick={() => amountCount(0)}>-</a><span className="stake-input">5.00</span><a className="stake-button" onClick={() => amountCount(1)}>+</a>
                        </div>
                        <div>
                            <a className="place-bet bold">Create Barcode</a>
                            <div className="summary">
                                <div className="summary-row">
                                    <span>Total stake:</span>
                                    <span className="value bold">5.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax:</span>
                                    <span className="value bold">0.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Stake per bet:</span>
                                    <span className="value bold">0.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Number of bets:</span>
                                    <span className="value bold">0</span>
                                </div>
                                <div className="summary-row">
                                    <span>Max Winning :</span>
                                    <span className="value bold">0.00</span>
                                </div>
                            </div>
                            <a className="place-bet bold" onClick={() => placeBet(true)}>Place bet</a>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default MHome;