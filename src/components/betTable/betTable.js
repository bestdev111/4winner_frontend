import React from "react";
import BetEvent from './betEvent'
import '../styles/bettable.css'
const Table = (props) => {
    const data = props;
    return (
        <div className="match-group border-top">
            <div className="table-header">
                <div className="table-title">{data.title}</div>
                <div className="table-menu"></div>
                <div className="clearfix"></div>
            </div>
            <div className="table-content">
                <div className="event-list">
                    <BetEvent
                        date='16.10'
                        time='12:20'
                        teamname='Real Madrid'
                    />
                    <BetEvent
                        date='16.10'
                        time='12:20'
                        teamname='Manchester City'
                    />
                    <BetEvent
                        date='16.10'
                        time='12:20'
                        teamname='Barcelona'
                    />
                    <BetEvent
                        date='16.10'
                        time='12:20'
                        teamname='Sampdoria Genua-AS Rom'
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}
export default Table;