import React, {useState} from "react";
import './styles/leagueContent.css'
function LeagueContent(props) {
    const [vList, setVList] = useState([])
    const matchData = props
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
    const betOddSelect = (index, param) => {
        props.betCollector(param);
        setVList([...vList, index])
        console.log('match:', matchData.content_Id);
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
                    <div key={index} className='o3'><div className={vList !== [] && vList.includes(index) ? "changeable-odd odd-selected" : 'changeable-odd'} onClick={() => betOddSelect(index, odd)}>{odd}</div></div>
                ) : <></>}
                {/* <div className="o3"><div className="changeable-odd" onClick={() => props.betCollector(matchData.odd2)}>{matchData.odd2}</div></div>
                <div className="o3"><div className="changeable-odd" onClick={() => props.betCollector(matchData.odd3)}>{matchData.odd3}</div></div> */}
            </div>
        </div>
    );
}

export default LeagueContent