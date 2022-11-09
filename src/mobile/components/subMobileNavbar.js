import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import reducer from 'store/sports';
import { getTypeList, getTopLeague } from 'store/sports/teamListSlice'
import './styles/mobileNavbar.css'

const tip_types = ['RM', 'Winner', 'O/U', 'HC', 'NG', 'DC', 'BS'];
function MobileNavbar(props) {
    const [sportActive, setSportActive] = useState(0);
    const [leagueActive, setLeagueActive] = useState(0);
    const [selected, setSelected] = useState(0);
    const sports_team_list = useSelector(({ teamList }) => teamList.teamList.sportsTeamList);
    const leagues_list = useSelector(({ teamList }) => teamList.teamList.topLeague);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopLeague());
    }, [dispatch]);

    const sportActiveFunc = (index) => {
        setSportActive(index);
    }
    const leagueActiveFunc = (index) => {
        setLeagueActive(index);
    }
    const tipTypes = (index) => {
        setSelected(index);
    }
    props.parentCallback(selected);
    return (
        <div className="m-subnavbar">
            <div className='d-flex'>
                {sports_team_list && sports_team_list.map((item, index) =>
                    <div className={sportActive === index ? 'item item-active' : 'item'} key={index} onClick={() => sportActiveFunc(index)}>
                        <img src={item.m_icon ? item.m_icon : ''} alt='' />
                        <p>{item.type}</p>
                    </div>
                )}
            </div>
            {sportActive === 0 ?
                <>
                    <div className='d-flex'>
                        {leagues_list && leagues_list.map((item, index) =>
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
                            {tip_types.map((item, i) => <div className='tip-type px-1' key={i}><p onClick={() => tipTypes(i)} className={selected === i ? 'selected' : ''}>{item}</p></div>)}
                        </div>
                    </div>
                </>
                : <></>
            }
        </div>
    );
}
export default withReducer('teamList', reducer)(MobileNavbar)
