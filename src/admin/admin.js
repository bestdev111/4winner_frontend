import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../components'
import Users from './components/users';
import './styles/admin.css'
import { adminPanel } from './store/adminActions';
function Admin() {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const userData = useSelector(state => state.authReducers.authReducer.user)
    const adminPanelList = useSelector(state => state.authReducers.adminReducer.adminPanel)
    const userRole = userData ? userData.role : 'guest';
    const tabList = [
        { title: 'Users', component: <Users />, role: true, icon: 'fa fa-users fa-1x fa-fw' },
        { title: 'Banks', component: '', role: true, icon: 'fa fa-university fa-1x fa-fw' },
        { title: 'Shops', component: '', icon: 'fa fa-shopping-cart fa-1x fa-fw' },
        { title: 'Stats', component: '', role: true, icon: 'fa fa-area-chart fa-1x fa-fw' },
        { title: 'Refunds', component: '', role: true, icon: 'fa fa-reply fa-1x fa-fw' },
        { title: 'Permissions', component: '', role: true, icon: 'fa fa-bell-slash fa-1x fa-fw' },
        { title: 'Settings', component: '', role: true, icon: 'fa fa-cogs fa-1x fa-fw' },
    ]
    console.log('adminPanelList', adminPanelList.adminPanel);
    useEffect(() => {
        dispatch(adminPanel(userRole))
    }, [userRole])
    return (
        <>
            <Navbar />
            <div className='d-flex mt-5 admin-panel'>
                <div className="sidebar">
                    {adminPanelList.adminPanel ? adminPanelList.adminPanel.map((item, index) =>
                            <div className={index === tab ? 'admin-active' : ''} key={index} onClick={() => setTab(index)} >
                                <span><i className={item.icon} aria-hidden="true"></i></span>
                                <p  >{item.title}</p>
                            </div>
                        )
                        : <></>
                    }
                </div>
                <div className='d-flex admin-main'>
                    {adminPanelList.adminPanel ? adminPanelList.adminPanel[tab].component : <></>}
                </div>
            </div>
        </>
    );
};
export default Admin;