import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideNav from './sideNav'
import { logoutUser } from '../../store/actions/authActions'
import { getTypeList } from '../../store/actions/mobileSportsActions'
import './styles/mobileNavbar.css'

function MobileNavbar(props) {
    const dispatch = useDispatch();
    const [sportActiveVal, setSportActiveVal] = useState(1);
    const [openSide, setOpenSide] = useState(false);
    const userData = useSelector(state => state.authReducers)
    const SportTypeList = useSelector(state => state.mobileSportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.mobileSportsReducers.getAllMatches);
    const isAuth = userData.isAuthenticated
    useEffect(() => {
        dispatch(getTypeList());
    }, [dispatch]);
    const open = () => {
        setOpenSide(false)
    }
    const sportActiveChange = (index) => {
        setSportActiveVal(index);
        if (index) props.sportActiveFunc(index);
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
            <div className='d-flex sports-type'>
                {availableSportTypes && availableSportTypes.map((availableSportType, index) =>
                    <div className={availableSportType === sportActiveVal ? 'item item-active' : 'item'} key={index} onClick={() => sportActiveChange(availableSportType)}>
                        <img src={SportTypeList[availableSportType - 1] ? SportTypeList[availableSportType - 1].m_icon : ''} alt='' />
                        <p>{SportTypeList[availableSportType - 1] ? SportTypeList[availableSportType - 1].name : ''}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default MobileNavbar;