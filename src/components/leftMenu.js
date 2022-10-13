import React, { useState } from 'react';
import './styles/leftMenu.css'
import { CaretDownOutlined} from '@ant-design/icons';
import { Tree } from 'antd';
import {SportsTeamList} from 'utils'
function LeftMenu(props) {
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    console.log('debug:', SportsTeamList[0]);
    
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <Tree
                    switcherIcon={<CaretDownOutlined />}
                    onSelect={onSelect}
                    treeData={SportsTeamList}
                />
            </div>
        </div>
    );
}

export default LeftMenu;