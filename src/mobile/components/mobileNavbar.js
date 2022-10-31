import React, { useState} from 'react';
import withReducer from 'store/withReducer';
import reducer from 'store/sports';
import SideNav from './sideNav'
import './styles/mobileNavbar.css'

function MobileNavbar() {
    const [openSide, setOpenSide] = useState(false);
    return (
        <div className="m-navbar p-3">
            <SideNav show={openSide} onClickOutside={() => setOpenSide(false) } />
            <div className='d-flex justify-content-between'>
                <div className='top-nav' onClick={() => setOpenSide(true)}><i className="fa fa-fw fa-bars"></i></div>
                <div className='top-nav login'>Login</div>
            </div>
        </div>
    );
}
export default withReducer('teamList', reducer)(MobileNavbar);