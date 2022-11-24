import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../components'
import Users from './users';
import './styles/admin.css'
function Admin() {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const userData = useSelector(state => state.authReducers.authReducer.user)
    const allUser = useSelector(state => state.authReducers.authReducer.users)
    const userRole = userData ? userData.role : 'guest';
    const tabList = [
        { title: 'Users', component: <Users />, visible: true },
        { title: 'Shops', component: '', visible: true},
        { title: 'Betting', component: '', visible: true},
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