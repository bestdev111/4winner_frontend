import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import reducer from 'store/sports';
import { getList } from 'store/sports/teamListSlice'
import './styles/mobileNavbar.css'

const leagues_list = [
    { m_icon: 'assets/images/micons/champions_league1.png', type: 'CHAMPIONS LEAGUE' },
    { m_icon: 'assets/images/micons/europe_league.png', type: 'EUROPA LEAGUE' },
    { m_icon: 'assets/images/micons/premier_league.png', type: 'PREMIER LEAGUE' },
    { m_icon: 'assets/images/micons/la_liga.png', type: 'LA LIGA' },
    { m_icon: 'assets/images/micons/bundesliga.png', type: '1.BUNDESLIGA' },
    { m_icon: 'assets/images/micons/serie_a.png', type: 'SERIE A' },
    { m_icon: 'assets/images/micons/league_1.png', type: 'LEAGUE 1' },
    { m_icon: 'assets/images/micons/super_lig.png', type: 'SUPER LIG' },
    { m_icon: 'assets/images/micons/eredivisie.png', type: 'EREDIVISIE' },
    { m_icon: 'assets/images/micons/liga_portugal.png', type: 'LIGA PORTUGAL' },
    { m_icon: '', type: 'World Cup Group A' },
    { m_icon: '', type: 'World Cup Group B' },
    { m_icon: '', type: 'World Cup Group C' },
    { m_icon: '', type: 'World Cup Group D' },
    { m_icon: '', type: 'World Cup Group E' },
    { m_icon: '', type: 'World Cup Group F' },
    { m_icon: '', type: 'World Cup Group G' },
    { m_icon: '', type: 'World Cup Group H' },
]
const tip_types = ['RM', 'Winner', 'O/U', 'HC', 'NG', 'DC', 'BS'];
function MobileNavbar() {
    const [sportActive, setSportActive] = useState(0);
    const [leagueActive, setLeagueActive] = useState(0);
    const [selected, setSelected] = useState(0);
    const sports_team_list = useSelector(({ teamList }) => teamList.teamList.sportsTeamList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    const sportActiveFunc = (index) => {
        setSportActive(index);
    }
    const leagueActiveFunc = (index) => {
        setLeagueActive(index);
    }
    return (
        <div className="m-subnavbar">
            <div className='d-flex'>
                {sports_team_list.map((item, index) =>
                    <div className={sportActive === index ? 'item item-active' : 'item'} key={index} onClick={() => sportActiveFunc(index)}>
                        <img src={item.m_icon ? item.m_icon : ''} alt='' />
                        <p>{item.type}</p>
                    </div>
                )}
            </div>
            {sportActive === 0 ?
                <>
                    <div className='d-flex'>
                        {leagues_list.map((item, index) =>
                            <div
                                className={leagueActive === index ? 'leagues league-active ml-2 mr-2' : 'leagues ml-2 mr-2'}
                                key={index}
                                onClick={() => leagueActiveFunc(index)}
                            >
                                {item.m_icon ? <img src={item.m_icon} alt='' /> : <></>}
                                <p className={!item.m_icon ? 'font' : ''}>{item.type}</p>
                            </div>
                        )}
                    </div>
                    <div className='tip-types '>
                        <div className='d-flex'>
                            {tip_types.map((item, i) => <div className='tip-type px-1'><p onClick={()=> setSelected(i)} className={selected === i ? 'selected' : ''}>{item}</p></div>)}
                        </div>
                    </div>
                </>
                : <div>any</div>
            }
        </div>
    );
}
export default withReducer('teamList', reducer)(MobileNavbar)
