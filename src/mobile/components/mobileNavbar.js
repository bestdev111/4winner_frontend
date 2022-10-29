import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import './styles/mobileNavbar.css'
import reducer from 'store/sports';
import { getList } from 'store/sports/teamListSlice'

function MobileNavbar() {
    const [openSide, setOpenSide] = useState(true);
    
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
        </div>
    );
}
export default MobileNavbar;