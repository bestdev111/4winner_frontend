import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from './sideNav'
import { logoutUser } from '../../store/actions/authActions'
import './styles/mobileNavbar.css'

function MobileNavbar() {
    const dispatch = useDispatch();
    const [openSide, setOpenSide] = useState(false);
    const userData = useSelector(state => state.authReducers)
    const get_AllMatches = useSelector(state => state.mobileSportsReducers.getAllMatches);
    const isAuth = userData.isAuthenticated

    const open = () => {
        setOpenSide(false)
    }
    let availableSportTypes = '';
    if (get_AllMatches.data) { availableSportTypes = get_AllMatches.data.availableSportTypes }
    return (
        <div className="m-navbar px-2 pt-3 pb-0 fixed-top">
            <SideNav show={openSide} onClickOutside={open} />
            <div className='d-flex justify-content-between'>
                <div className='top-nav' onClick={() => setOpenSide(true)}><i className="fa fa-fw fa-bars"></i></div>
                {!isAuth ?
                    <div className='top-nav login'>
                        <a href='/m_login'>Login</a>
                    </div>
                    : <div className='top-nav d-flex'>
                        <div className='user-info'>
                            <span>{userData.user.userName}</span>
                            <span>{userData.user.balance}</span>
                        </div>
                        <i onClick={() => dispatch(logoutUser())} className='fa fa-sign-out fw-2'></i>
                    </div>
                }
            </div>
        </div>
    );
}
export default MobileNavbar;