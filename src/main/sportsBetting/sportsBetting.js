import React from 'react';
import { RightPanel, LeftMenu, Divider } from 'components';
import './sportsBetting.css'

function SportsBetting() {
    return(
        <div className='container-fluid d-flex flex-column ptt'>
            <div className='row'>
                <div className='col-2 pl-2 pr-4'>
                    <LeftMenu />
                </div>
                <div className='col-10'>
                    <div className='row'>
                        <div className='col-9 pr-3 pl-0'>
                            <Divider title='Highlights'/>
                            <Divider title='Top Odds'/>
                        </div>
                        <div className='col-3 pl-0'>
                            <RightPanel/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SportsBetting;