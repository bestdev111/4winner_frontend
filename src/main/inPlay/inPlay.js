import React from 'react';
import './inPlay.css'
import { RightPanel, LeftMenu, Divider, Table } from 'components';
const InPlay = () => (
    <div className='container-fluid d-flex flex-column ptt'>
        <div className='row'>
            <div className='left px-2 float-left'>
                <Divider title='Highlights' />
                <Table
                    title="Highlights"
                />
                <Divider title='Top Odds' />
                <Table
                    title="Top Odds"
                />
            </div>
            <div className='right px-2 float-left'>
                <RightPanel />
            </div>
        </div>
    </div>
);
export default InPlay;