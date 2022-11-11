import React from 'react';
import './outRights.css'
import { Navbar, RightPanel, LeftMenu, Divider, OutTable } from 'components';
const OutRights = () => (
    <>
        <Navbar/>
        <div className='container-fluid d-flex flex-column ptt'>
            <div className='row'>
                <div className='left px-2 float-left'>
                    <LeftMenu />
                </div>
                <div className='center px-2 float-left'>
                    <Divider title='Outlights' />
                    <OutTable 
                        title='Football'
                    />
                </div>
                <div className='right px-2 float-left'>
                    <RightPanel />
                </div>
            </div>
        </div>
    </>
);
export default OutRights;