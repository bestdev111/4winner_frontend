import React, { useState, useEffect } from 'react';
import { registerUser } from '../auth/store/action/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../components'
import UserRegister from './userRegister';
import './admin.css'

function Admin() {
    const [tab, setTab] = useState(0);
    const userData = useSelector(state => state.authReducers.authReducer.user)
    const userRole = userData ? userData.role : 'guest';
    const tabList = [
        { title: 'Users', component: <UserRegister /> },
        { title: 'Betting', component: '' }
    ]
    return (
        <>
            <Navbar />
            <div className='d-flex mt-5 admin-panel'>
                <div className="sidebar">
                    {tabList.map((item, index) => <p key={index} className={index === tab ? 'admin-active' : ''} onClick={() => setTab(index)} >{item.title}</p>)}
                </div>
                <div className='d-flex admin-main'>
                    {tabList[tab].component}
                </div>
            </div>
        </>
    );
};
export default Admin;