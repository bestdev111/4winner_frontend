import React, { useState, useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux';
import betReducers from '../../store/reducers/betReducers';
import './styles/mobileFooter.css'

function MobileFooter(props) {
    const [numActive, setNumActive] = useState(0);
    const [betSlipNum, setBetSlipNum] = useState(0);
    const betCollectList = useSelector((state) => state.betReducers.betCollectList) 

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
    useEffect(()=> {
        if(betCollectList) {
            betCollectList.forEach(list => {
                setBetSlipNum(betSlipNum + list.odds.length);
            });
        }
    }, [openModal])
    console.log('betCollectList', betCollectList);
    return (
        <div className="m-footer pl-5 pr-5">
            <div className='d-flex justify-content-between'>
                {
                    mFooterList.map((item, index) =>
                        <div className='item' key={index} onClick={() => goActive(index)}>
                            <div className='d-flex justify-content-center'>
                                {betSlipNum > 0 && index === 2 ? 
                                    <span onClick={openModal} className='bet-slip-active'>{betSlipNum}</span> : 
                                    <i onClick={index === 2 ? openModal : null} className={index === numActive ? `footer-active ${item.icon}` : item.icon} ></i>
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