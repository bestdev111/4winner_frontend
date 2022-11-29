import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../components'
import { adminPanel } from './store/adminActions';
import './styles/admin.css'
function Admin() {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const currentUser = useSelector(state => state.authReducers.authReducer.user)
    const adminPanelList = useSelector(state => state.authReducers.adminReducer.adminPanel)
    const userRole = currentUser ? currentUser.role : 'guest';
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