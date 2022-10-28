import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import './styles/mobileNavbar.css'
import reducer from 'store/sports';
import { getList } from 'store/sports/teamListSlice'

// const onClick = (e) => {
//     localStorage.setItem('path', window.location.pathname);
// }

function MobileNavbar() {
    const [openSide, setOpenSide] = useState(true);
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
        <div className="m-navbar p-3">
            <div id="mySidenav" className={openSide ? 'sidenav' : 'sidenav openside'}>
                <p className="closebtn" onClick={() => setOpenSide(true)}>&times;</p>
                <p>About</p>
                <p>Services</p>
                <p>Clients</p>
                <p>Contact</p>
            </div>
            <div className='d-flex justify-content-between'>
                <div className='top-nav' onClick={() => setOpenSide(false)}><i className="fa fa-fw fa-bars"></i></div>
                <div className='top-nav login'>Login</div>
            </div>
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