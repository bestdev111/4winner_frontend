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
    
    const itemActiveFunc = (index)=> {
        setItemActive(index);
    }
    return (
        <div className="m-subnavbar p-3">
            <div className='d-flex'>
                {sports_team_list.map((item, index) =>
                    <div className={itemActive === index ? 'item item-active': 'item'} onClick={() => itemActiveFunc(index)}>
                        <div className='d-flex justify-content-center'><i className='fa fa-futbol-o'></i></div>
                        <div className='d-flex justify-content-center'><p>{item.type}</p></div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default withReducer('teamList', reducer)(MobileNavbar)