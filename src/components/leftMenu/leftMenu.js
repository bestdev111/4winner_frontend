import React from 'react';
import '../styles/leftMenu.css'
import Company from './company';

function LeftMenu(props) {
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <Company />
            </div>
        </div>
    );
}

export default LeftMenu;