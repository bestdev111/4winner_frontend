import React, { useState } from 'react'
import { useEffect } from 'react';
import './styles/mobileFooter.css'

function MobileFooter(props) {
    const [numActive, setNumActive] = useState(0);
    const [betSlipNum, setBetSlipNum] = useState(0);
    const mFooterList = [
        { icon: 'fa fa-home', title: 'Home' },
        { icon: 'fa fa-clock-o', title: 'Live' },
        { icon: 'fa fa-file-o', title: 'Bet Slip' },
        { icon: 'fa fa-thumbs-o-up', title: 'Highlights' },
        { icon: 'fa fa-list-alt', title: 'Results' },
    ];
    const goActive = (index) => {
        setNumActive(index);
    }
    const openModal = () => {
        props.modalFunc(false)
    }
    return (
        <div className="m-footer pl-5 pr-5">
            <div className='d-flex justify-content-between'>
                {
                    mFooterList.map((item, index) =>
                        <div className='item' key={index} onClick={() => goActive(index)}>
                            <div className='d-flex justify-content-center'>
                                {props.betSlipNum > 0 && index === 2 ? 
                                    <span onClick={openModal} className='bet-slip-active'>{props.betSlipNum}</span> : 
                                    <i onClick={openModal} className={index === numActive ? `footer-active ${item.icon}` : item.icon} ></i>
                                }
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p className={index === numActive ? 'footer-active' : ''}>{item.title}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default MobileFooter