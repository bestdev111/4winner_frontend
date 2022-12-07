import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles/leagueContent.css'
import { betOddSelectAction } from "../../store/actions/betActions";
function LeagueContent(props) {
    const dispatch = useDispatch();
    const [vList, setVList] = useState([])
    const matchData = props;
    const betCollectList = useSelector((state) => state.betReducers.betCollectList)
    const matchStatus = () => {
        switch (matchData.status) {
            case 0:
                return <span className="not-will-live">Today 09:00</span>
            case 1:
                return <span className="will-live">Today 09:00</span>
            case 2:
                return (
                    <>
                        <span className="halftime">1Half</span>
                        <span className="live-time">1Half</span>
                    </>
                )
            case 3:
                return (
                    <>
                        <span className="live">Live</span>
                        <span className="live-time">2. Half 70'</span>
                    </>
                )
            default:
                break;
        }
    }
    // useEffect(() => {
    // }, [betCollectList])
    console.log('useSelector::::', betCollectList);

    const betOddSelect = (index, param) => {
        const obj = {
            matchId: props.content_Id,
            odds: []
        }
        obj.odds.push(index)
        dispatch(betOddSelectAction(betCollectList, obj));
        // if (vList.includes(index)) {
        //     var i = vList.indexOf(index)
        //     let tempList = vList;
        //     if (i > -1) {
        //         tempList.splice(i, 1);
        //     }
        //     setVList([...vList, index])
        // }
        // setVList([...vList, index])
    }

    return (
        <div className="match d-flex">
            <div className="m_teams">
                <div className="time">
                    {matchStatus()}
                </div>
                <div className="d-flex team">
                    <div className="team_name">
                        {matchData.teamName1}
                        {matchData.redCard1 && matchData.redCard1 !== 0 ? <div className="red-card">{matchData.redCard1}</div> : <></>}
                    </div>
                    <div className="wrapper">
                        <div className="score">{matchData.score1}</div>
                    </div>
                </div>
                <div className="d-flex team">
                    <div className="team_name">
                        {matchData.teamName2}
                        {matchData.redCard2 && matchData.redCard2 !== 0 ? <div className="red-card">{matchData.redCard2}</div> : <></>}
                    </div>
                    <div className="wrapper">
                        <div className="score">{matchData.score2}</div>
                    </div>
                </div>
            </div>
            <div className="odds">
                {matchData.odds ? matchData.odds.map((odd, index) =>
                    <div key={index} className='o3'>
                        <div
                            // className={vList !== [] && vList.includes(index) ? "changeable-odd odd-selected" : 'changeable-odd'} 
                            className='changeable-odd'
                            onClick={() => betOddSelect(index, odd)}
                        >
                            {odd}
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    );
}

export default LeagueContent