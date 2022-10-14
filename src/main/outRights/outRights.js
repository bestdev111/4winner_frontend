import React from 'react';
import './outRights.css'
import { RightPanel, LeftMenu, Divider } from 'components';
const OutRights = () => (
    <div className='container-fluid d-flex flex-column ptt'>
        <div className='row'>
            <div className='left px-2 float-left'>
                <LeftMenu />
            </div>
            <div className='center px-2 float-left'>
                <Divider title='Highlights' />
                <Divider title='Top Odds' />
            </div>
            <div className='right px-2 float-left'>
                <RightPanel />
            </div>
        </div>
    </div>
);
export default OutRights;