import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from './sideNav'
import { logoutUser } from '../../store/actions/authActions'
import './styles/mobileNavbar.css'

function MobileNavbar() {
    const dispatch = useDispatch();
    const [openSide, setOpenSide] = useState(false);
    const userData = useSelector(state => state.authReducers)
    const isAuth = userData.isAuthenticated
    return (
        <div className="m-navbar px-2 pt-3 pb-0">
            <SideNav show={openSide} onClickOutside={() => setOpenSide(false)} />
            <div className='d-flex justify-content-between'>
                <div className='top-nav' onClick={() => setOpenSide(true)}><i className="fa fa-fw fa-bars"></i></div>
                <div className='top-nav login'>
                    {!isAuth ?
                        <a href='/m_login'>Login</a>
                        : <a onClick={()=> dispatch(logoutUser())}>Logout</a>
                    }
                </div>
            </div>
        </div>
    );
}
export default MobileNavbar;