import React, { useState } from "react";
const Event = (props) => {
    const [open, setOpen] = useState(true);
    const [isLive, setIsLive] = useState(false)
    const [openMatches, setOpenMatches] = useState(true)
    return (
        <div className="event">
            <div className="date"><p>{props.date}</p></div>
            {isLive ?
                <div className="time live-score"><p>{props.time}</p></div>
                : <div className="time"><p>{props.time}</p></div>
            }
            {
                open ? <div className="slideout">
                    <div className="fade-in"></div>
                </div>
                    : <div className="slideout open">
                        <div className="fade-in show-in">
                            <img src="../assets/images/icons/analytic-icon.svg" alt="img" />
                            <img src="../assets/images/icons/chart-icon.svg" alt="img" />
                        </div>
                    </div>
            }
            {
                open ?
                    <div className="detail-caret detail-caret-right" onClick={() => setOpen(!open)}>
                        {/* <img src="assets/images/icons/caret-right-solid-white.svg" alt="" /> */}
                    </div>
                    : <div className="detail-caret detail-caret-left" onClick={() => setOpen(!open)}>
                        {/* <img src="assets/images/icons/caret-left-solid.svg" alt="" /> */}
                    </div>
            }
            <div className="team-name"><p>{props.teamname}</p></div>
            <div className="more-odds">
                <p onClick={() => setOpenMatches(!openMatches)}>{openMatches ? '+' : '-'}</p>
            </div>
            <div className="odds">
                <div className="treshold"><p>3.5</p></div>
                <div className="odd">
                    <span className="odd-type"><p>0</p></span>
                    <span className="odd-value"><p>1.50</p></span>
                </div>
                <div className="odd">
                    <span className="odd-type"><p>1</p></span>
                    <span className="odd-value"><p>1.30</p></span>
                </div>
            </div>
            <div className="odds">
                <div className="odd">
                    <span className="odd-type"><p>1</p></span>
                    <span className="odd-value"><p>1.30</p></span>
                </div>
                <div className="odd">
                    <span className="odd-type"><p>1</p></span>
                    <span className="odd-value"><p>1.30</p></span>
                </div>
                <div className="odd">
                    <span className="odd-type"><p>1</p></span>
                    <span className="odd-value"><p>1.30</p></span>
                </div>
            </div>
            <div className={!openMatches ? "match-details" :"match-details d-none"}>
                <div className="match-bets">
                    <div className="bet-group">
                        <div className="header">Winner</div>
                        <div className="bets">
                            <div className="bet">
                                <div className="odds">
                                    <div className="col-12">
                                        <a className="changeable-odd ">
                                            <span className="push-left">Katar</span><span className="push-right">3.30</span>
                                        </a>
                                    </div>
                                    <div className="col-12">
                                        <a className="changeable-odd ">
                                            <span className="push-left">Katar</span><span className="push-right">3.30</span>
                                        </a>
                                    </div>
                                    <div className="col-12">
                                        <a className="changeable-odd ">
                                            <span className="push-left">Katar</span><span className="push-right">3.30</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bet-group">
                        <div className="header">Winner</div>
                        <div className="bets">
                            <div className="bet">
                                <div className="odds">
                                    <div className="col-12">
                                        <a className="changeable-odd selected">
                                            <span className="push-left">Katar</span><span className="push-right">3.30</span>
                                        </a>
                                    </div>
                                    <div className="col-12">
                                        <a className="changeable-odd ">
                                            <span className="push-left">Katar</span><span className="push-right">3.30</span>
                                        </a>
                                    </div>
                                    <div className="col-12">
                                        <a className="changeable-odd ">
                                            <span className="push-left">Katar</span><span className="push-right">3.30</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Event;