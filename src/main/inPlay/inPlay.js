import React from 'react';
import './inPlay.css'
import { Navbar, RightPanel, Divider, BetTable } from 'components';
const InPlay = () => (
    <>
        <Navbar/>
        <div className='container-fluid d-flex flex-column ptt'>
            <div className='row'>
                <div className='left px-2 float-left'>
                    <Divider title='Highlights' />
                    <BetTable
                        title="Highlights"
                    />
                    <Divider title='Top Odds' />
                    <BetTable
                        title="Top Odds"
                    />
                </div>
                <div className='right px-2 float-left'>
                    <RightPanel />
                </div>
            </div>
        </div>
    </>
);
export default InPlay;