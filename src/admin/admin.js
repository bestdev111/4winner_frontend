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
        { title: 'Banks', component: '', visible: true, icon: 'fa fa-university fa-1x fa-fw' },
        { title: 'Users', component: <Users />, visible: true, icon: 'fa fa-users fa-1x fa-fw' },
        { title: 'Shops', component: '', visible: true, icon: 'fa fa-shopping-cart fa-1x fa-fw' },
        { title: 'Stats', component: '', visible: true, icon: 'fa fa-area-chart fa-1x fa-fw' },
        { title: 'Settings', component: '', visible: true, icon: 'fa fa-cogs fa-1x fa-fw' },
    ]

    return (
        <>
            <Navbar />
            <div className='d-flex mt-5 admin-panel'>
                <div className="sidebar">
                    {tabList.map((item, index) =>
                        <div className={index === tab ? 'admin-active' : ''} key={index} onClick={() => setTab(index)} >
                            <span><i class={item.icon} aria-hidden="true"></i></span>
                            <p  >{item.title}</p>
                        </div>
                    )}
                </div>
                <div className='d-flex admin-main'>
                    {tabList[tab].component}
                </div>
            </div>
        </>
    );
};
export default Admin;