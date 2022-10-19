import React from "react";
import Event from './event'
import '../styles/table.css'
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
                    <Event
                        date='16.10'
                        time='12:20'
                        teamname='Real Madrid'
                    />
                    <Event
                        date='16.10'
                        time='12:20'
                        teamname='Manchester City'
                    />
                    <Event
                        date='16.10'
                        time='12:20'
                        teamname='Barcelona'
                    />
                    <Event
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