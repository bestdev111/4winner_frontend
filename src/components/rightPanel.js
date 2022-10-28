import React, { useState } from 'react';
import './styles/rightPanel.css'

const RightPanel = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [open, setOpen] = useState(false);
    const [bet, setBet] = useState(true);
    const onChange = (e) => {
        setOpen();
    };
    return (
        <div className='betpanel'>
            {isLogin ?
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
                {open ? <>
                    <p className="bet-type-btn-child" onClick={() => setOpen(false)}>Single/Multiple</p>
                    <p className="bet-type-btn-child focus" onClick={() => setOpen(true)}>SYSTEM</p>
                </>
                    : <>
                        <p className="bet-type-btn-child focus" onClick={() => setOpen(false)}>Single/Multiple</p>
                        <p className="bet-type-btn-child" onClick={() => setOpen(true)}>SYSTEM</p>
                    </>
                }
            </div>
            <div className="bet-slip">
                <div className="selected-bets selected-bets-l"></div>
                {open ? <div className='comb'>
                    <label>Combinations:</label>
                </div>
                    : <></>
                }
                <div className="bet-totals d-flex">
                    <p className="btn-reset">Reset</p>
                    <div className="totals px-2 pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="push-left">Stake:</div>
                            <div className="push-right">5.00</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left">Tax:</div>
                            <div className="push-right">0.00</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left">Total stake:</div>
                            <div className="push-right">5.00</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left">Stake per bet:</div>
                            <div className="push-right">0.00</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left">Number of bets:</div>
                            <div className="push-right">0</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="push-left">Max Winning:</div>
                            <div className="push-right">0.00</div>
                        </div>
                    </div>
                </div>
                <div className="place-bet show">
                    <div className='d-flex justify-content-around'>
                        <div>
                            <p>-</p>
                        </div>
                        <div className="align-self-center col-8">
                            <div>
                                <input type="text" id="PayingAmount" className="payingamount py-1" defaultValue="5.00" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div>
                            <p>+</p>
                        </div>
                    </div>

                    {bet ?
                        <div className="col-12">
                            <p className="btn-place-bet py-1" onClick={() => setBet(!bet)}>Place bet</p>
                        </div>
                        : <div className="instead d-flex">
                            <div className="col-6">
                                <p className="btn-place-bet py-1">Comfirm</p>
                            </div>
                            <div className="col-6">
                                <p className="btn-place-bet cancel py-1" onClick={() => setBet(!bet)}>Cancel</p>
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