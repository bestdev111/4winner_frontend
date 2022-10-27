import React, { useState } from "react";
const Event = (props) => {
    const [isPlus, setIsPlus] = useState(true);

    return (
        <div className="outevent d-flex justify-content-between">
            <div className="national pl-3">
                <p>{props.national}</p>
                {props.info ? <img src="assets/images/icons/info-icon.svg" alt="img"/> : <></>}
            </div>
            <div className="d-flex teams">
                <div className="border-left d-flex justify-content-between px-2 py-2 one">
                    <div className="d-flex align-items-center"><p>{props.teamname1}</p></div>
                    <span className=""><p>1.50</p></span>
                </div>
                <div className="border-left d-flex justify-content-between px-2 py-2 two">
                    <div className="d-flex align-items-center"><p>{props.teamname2}</p></div>
                    <span className=""><p>1.30</p></span>
                </div>
                <div className="border-left d-flex justify-content-center align-items-center px-2 py-2 three ">
                    {isPlus ? <span>+</span> : <span>-</span>}
                </div>
            </div>
        </div>
    );
}
export default Event;