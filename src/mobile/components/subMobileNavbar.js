import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import reducer from 'store/sports';
import { getList } from 'store/sports/teamListSlice'
import './styles/mobileNavbar.css'

function MobileNavbar() {
    const [itemActive, setItemActive] = useState(0);
    const sports_team_list = useSelector(({ teamList }) => teamList.teamList.sportsTeamList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    const itemActiveFunc = (index) => {
        setItemActive(index);
    }
    const leagues_list = [
        { icon: 'fa fa-futbol-o', type: 'CHAMPIONS LEAGUE' },
        { icon: 'fa fa-futbol-o', type: 'EUROPA LEAGUE' },
        { icon: 'fa fa-futbol-o', type: 'PREMIER LEAGUE' },
        { icon: 'fa fa-futbol-o', type: 'LA LIGA' },
        { icon: 'fa fa-futbol-o', type: '1.BUNDESLIGA' },
        { icon: 'fa fa-futbol-o', type: 'SERIE A' },
        { icon: 'fa fa-futbol-o', type: 'LEAGUE 1' },
        { icon: 'fa fa-futbol-o', type: 'SUPER LIG' },
        { icon: 'fa fa-futbol-o', type: 'EREDIVISIE' },
        { icon: 'fa fa-futbol-o', type: 'LIGA PORTUGAL' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group A' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group B' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group C' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group D' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group E' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group F' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group G' },
        { icon: 'fa fa-futbol-o', type: 'World Cup Group H' },
    ]
    return (
        <div className="m-subnavbar">
            <div className='d-flex p-2'>
                {sports_team_list.map((item, index) =>
                    <div className={itemActive === index ? 'item item-active' : 'item'} key={index} onClick={() => itemActiveFunc(index)}>
                        <div className='d-flex justify-content-center'><i className='fa fa-futbol-o'></i></div>
                        <div className='d-flex justify-content-center'><p>{item.type}</p></div>
                    </div>
                )}
            </div>
            <div>
                <div>
                    {leagues_list.map((item, index) =>
                        <div className='leagues' key={index}>
                            <div className='d-flex justify-content-center'><i className='fa fa-futbol-o'></i></div>
                            <div className='d-flex justify-content-center'><p>{item.type}</p></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default withReducer('teamList', reducer)(MobileNavbar)