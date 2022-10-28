import React, { useState } from 'react'
import Modal from 'react-modal';
import './styles/mobileNavbar.css'
const menu = [
    { url: '/sportsbetting', title: 'Sports Betting' },
    { url: '/inplay', title: 'In-Play' },
    { url: '/outrights', title: 'Outrights' },
    { url: '/results', title: 'Results' },
    { url: '/slots', title: 'Slots' },
    { url: '/livecasino', title: 'Live Casino' },
]

const customStyles = {
    content: {
        position: 'fixed',
        border: '1px solid rgba(0,0,0,.2)',
        width: '16%',
        height: '350px',
        inset: '100px 780px',
        padding: '10px',
        overflow: 'unset'
    },
};

// const onClick = (e) => {
//     localStorage.setItem('path', window.location.pathname);
// }
function MobileNavbar() {
    return (
        <div className="navbar">
            <div className='d-flex justify-content-between'>
                <a href="#"><i className="fa fa-fw fa-bars"></i></a>
                <a href="#">Login</a>
            </div>
            <div className='d-flex'>
                <a href="#"><i className="fa fa-futbol-o"></i></a>
                <a href="#"><i className="fa fa-futbol-o"></i></a>
                <a href="#"><i className="fa fa-futbol-o"></i></a>
                <a href="#"><i className="fa fa-futbol-o"></i></a>
            </div>
        </div>
    );
}
export default MobileNavbar