import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMatches } from '../../store/actions/sportsActions'
import BetEvent from './betEvent'
import '../styles/bettable.css'

const Table = (props) => {
    const dispatch = useDispatch();
    const data = props;
    useEffect(() => {
        dispatch(getMatches());
    }, [dispatch]);
    const get_Matches = useSelector(state => state.sportsReducers.getMatches);
    let matches = [];
    if (get_Matches.data) {
        matches = get_Matches.data.matches;
        console.log('matches', get_Matches);
    }
    return (
        <div className="match-group border-top">
            <div className="table-header">
                <div className="table-title">{data.title}</div>
                <div className="table-menu"></div>
                <div className="clearfix"></div>
            </div>
            <div className="table-content">
                <div className="event-list">
                    {matches ?
                        matches.map((item, index) => 
                            props.isTop === item.isTop ? 
                            <BetEvent
                                key={index}
                                id={item.id}
                                date='16.10'
                                time='12:20'
                                homeTeam={item.match.homeTeam}
                                awayTeam={item.match.awayTeam}
                                europeanStartTime=''
                                isTop={props.isTop}
                            />: <div key={index}></div>
                        )
                        :<></>
                    }
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}
export default Table;