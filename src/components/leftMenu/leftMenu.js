import React from 'react';
import '../styles/leftMenu.css'
import List from './list';

function LeftMenu(props) {
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <List />
            </div>
        </div>
    );
}

export default LeftMenu;