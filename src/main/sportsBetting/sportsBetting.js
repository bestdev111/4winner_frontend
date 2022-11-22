import React from 'react';
import { Navbar, RightPanel, LeftMenu, Divider, BetTable } from '../../components';
import './sportsBetting.css'
function SportsBetting() {
    return(
        <>
            <Navbar/>
            <div className='container-fluid d-flex flex-column ptt'>
                <div className='row'>
                    <div className='left px-2 float-left'>
                        <LeftMenu />
                    </div>
                    <div className='center px-2 float-left'>
                        <Divider title='Highlights'/>
                        <BetTable 
                            title="Highlights"
                            isTop= {false}
                        />
                        <Divider title='Top Odds'/>
                        <BetTable
                            title="Top Odds"
                            isTop={true}
                        />
                    </div>
                    <div className='right px-2 float-left'>
                        <RightPanel/>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SportsBetting;