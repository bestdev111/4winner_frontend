import React from 'react';
import { RightPanel, LeftMenu, Divider } from 'components';
import './sportsBetting.css'

function SportsBetting() {
    return(
        <div className='container-fluid d-flex flex-column ptt'>
            <div className='row'>
                <div className='left px-2 float-left'>
                    <LeftMenu />
                </div>
                <div className='center px-2 float-left'>
                    <Divider title='Highlights'/>
                    <Divider title='Top Odds'/>
                </div>
                <div className='right px-2 float-left'>
                    <RightPanel/>
                </div>
            </div>
        </div>
    );
};
export default SportsBetting;