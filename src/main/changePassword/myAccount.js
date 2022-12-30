import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, RightPanel, LeftMenu } from '../../components';
import './changePassword.css'
function MyAccount() {
    const dispatch = useDispatch();
    const [currentPass, setCurrentPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const userData = useSelector(state => state.authReducers);
    const myBetData = useSelector(state => state.betReducers.myBetData);
    
    return (
        <>
            <Navbar />
            <div className='container-fluid d-flex flex-column ptt'>
                <div className='row'>
                    <div className='left px-2 float-left'>
                        <LeftMenu />
                    </div>
                    <div className='center px-2 float-left'>
                        <div class="myaccount">
                            <div class="myaccount-header">
                                <div class="title">
                                    My Account
                                    <div class="menu push-right">
                                        <button class="menu-itemOne active">My Bets</button>
                                        |
                                        <button class="menu-itemOne ">Transactions</button>
                                    </div>
                                </div>
                            </div>
                            <div class="myaccount-table">
                                <div class="myaccount-filter">
                                    Period:
                                    <select id="bets_period" class="m-2">
                                        <option value="1">All</option>
                                        <option value="2">Today</option>
                                        <option value="3">3 Days</option>
                                        <option value="4">7 Days</option>
                                        <option value="5">30 Days</option>
                                    </select>
                                    Bet Status:
                                    <select id="bets_status" class="m-2">
                                        <option value="0">All</option>
                                        <option value="1">Results Awaited</option>
                                        <option value="2">Lost</option>
                                        <option value="3">Won</option>
                                        <option value="4">Payed Out</option>
                                    </select>
                                </div>
                                <div class="myaccount-table">
                                    <div class="match-header p-10 yellow-text d-flex">
                                        <div class="col-1 p-l-0">Date</div>
                                        <div class="col-2 p-l-0">Type</div>
                                        <div class="col-7 p-l-10 d-flex">
                                            <div class="col-5 p-l-0">Betting Event</div>
                                            <div class="col-3 p-l-0">Tip</div>
                                            <div class="col-1 p-l-0">Bank</div>
                                            <div class="col-2">Result</div>
                                            <div class="col-1 p-l-0">Odds</div>
                                        </div>
                                        <div class="col-1 p-l-0">Stake</div>
                                        <div class="col-1">Winnings</div>
                                    </div>
                                    <div class="match-body small-font match-body-with-paging">
                                        {/* <div class="transaction-item">
                                            <div class="col-1">
                                                28.12.2022 09:52
                                                <a class="btn-warning">Details</a>
                                            </div><div class="col-2">Single/Multiple</div>
                                            <div class="col-7 p-l-10">
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">
                                                        Feyenoord Rott. - FC Emmen | 5:0</div>
                                                    <div class="col-3 p-l-0">Feyenoord Rott. (Winner)</div>
                                                    <div class="col-1 p-l-0">
                                                    </div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-win p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">1.27</div>
                                                </div>
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Enppi Club - El Daklyeh | 0:0</div>
                                                    <div class="col-3 p-l-0">Enppi Club (Winner)</div>
                                                    <div class="col-1 p-l-0"></div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-lost p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">2.10</div>
                                                </div>
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Enppi Club - El Daklyeh | 0:0</div>
                                                    <div class="col-3 p-l-0">Draw (Winner)</div>
                                                    <div class="col-1 p-l-0"></div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-win p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">3.00</div>
                                                </div>
                                            </div>
                                            <div class="col-1">1.90</div>
                                            <div class="col-1">
                                                <div class="status text-win p-10">3.62</div>
                                            </div>
                                        </div>
                                        <div class="transaction-item">
                                            <div class="col-1">26.12.2022 21:17
                                                <a class="btn-warning">Details</a>
                                            </div>
                                            <div class="col-2">Single/Multiple</div>
                                            <div class="col-7 p-l-10">
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Dakar Sacre Coeur - AS Douanes Dakar | 3:0</div>
                                                    <div class="col-3 p-l-0">Dakar Sacre Coeur (Rest of Match)</div>
                                                    <div class="col-1 p-l-0">
                                                    </div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-win p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">8.50</div>
                                                </div>
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Dakar Sacre Coeur - AS Douanes Dakar | 3:0</div>
                                                    <div class="col-3 p-l-0">Draw (Rest of Match)</div>
                                                    <div class="col-1 p-l-0"></div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-lost p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">1.10</div>
                                                </div>
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Aston Villa - Liverpool FC | 1:3</div>
                                                    <div class="col-3 p-l-0">Aston Villa (Rest of Match)</div>
                                                    <div class="col-1 p-l-0"></div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-lost p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">4.70</div>
                                                </div>
                                            </div>
                                            <div class="col-1">5.00</div>
                                            <div class="col-1">
                                                <div class="status text-lost p-10">0.00</div>
                                            </div>
                                        </div>
                                        <div class="transaction-item">
                                            <div class="col-1">13.12.2022 10:31<a class="btn-warning">Details</a>
                                            </div>
                                            <div class="col-2">Single/Multiple</div>
                                            <div class="col-7 p-l-10">
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Delhi Tigers - Cisf FC | 0:3</div>
                                                    <div class="col-3 p-l-0">Cisf FC (Rest of Match)</div>
                                                    <div class="col-1 p-l-0"></div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-win p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">1.90</div>
                                                </div>
                                            </div>
                                            <div class="col-1">1.00</div>
                                            <div class="col-1">
                                                <div class="status text-win p-10">1.90</div>
                                            </div>
                                        </div>
                                        <div class="transaction-item">
                                            <div class="col-1">12.12.2022 10:33<a class="btn-warning">Details</a>
                                            </div>
                                            <div class="col-2">Single/Multiple</div>
                                            <div class="col-7 p-l-10">
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Jaguar FC - United Bharat FC | 6:0</div>
                                                    <div class="col-3 p-l-0">Jaguar FC (Rest of Match)</div>
                                                    <div class="col-1 p-l-0"></div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-win p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">2.20</div>
                                                </div>
                                                <div class="row m-b-10 p-b-25">
                                                    <div class="col-5 p-l-0">Jaguar FC - United Bharat FC | 6:0</div>
                                                    <div class="col-3 p-l-0">Draw (Rest of Match)</div>
                                                    <div class="col-1 p-l-0">
                                                    </div>
                                                    <div class="col-2 p-l-0">
                                                        <div class="status bets-lost p-10">&nbsp;</div>
                                                    </div>
                                                    <div class="col-1 p-l-0">2.40</div>
                                                </div>
                                            </div>
                                            <div class="col-1">10.00</div>
                                            <div class="col-1">
                                                <div class="status text-win p-10">11.00</div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div class="match-header p-10 yellow-text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right px-2 float-left'>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </>
    );
};
export default MyAccount;