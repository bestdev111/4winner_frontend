import React, { useState } from 'react'
import Modal from 'react-modal';
import './styles/navbar.css'
const menu = [
    { url: '/sportsbetting', title: 'Sports Betting' },
    { url: '/inplay', title: 'In-Play' },
    { url: '/outrights', title: 'Outrights' },
    { url: '/results', title: 'Results' },
    { url: '/slots', title: 'Slots' },
    { url: '/livecasino', title: 'Live Casino' },
]

const customStyles = {
    content: {
        position: 'fixed',
        border: '1px solid rgba(0,0,0,.2)',
        width: '16%',
        height: '350px',
        inset: '100px 780px',
        padding: '10px',
        overflow: 'unset'
    },
};

const onClick = (e) => {
    localStorage.setItem('path', window.location.pathname);
}
function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const value = { name: 'testero', amount: '95.00' };
    return (
        <div className='header'>
            <div className='top'>
                <div className='logo'>
                    <img src='' alt=''/>
                </div>
                <form
                    className='login_form'
                >
                    {!isLogin ?
                        <div>
                            <div className='textbox'>
                                <input type='text' className='inputbox' placeholder='Username' />
                            </div>
                            <div className='textbox'>
                                <input type='text' className='inputbox' placeholder='Password' />
                            </div>
                            <input className='login_btn' type='button' value='Login' onClick={() => setIsLogin(!isLogin)} />
                        </div>
                        : <div className='logined d-flex'>
                            <div><a href='/myaccount' className='text-white '>My Account</a></div><div className='text-white'>|</div>
                            <div><a href='/changepass' className='text-white'>Change Password</a></div><div className='text-white'>|</div>
                            <div><label className='text-white'>{value.name} : {value.amount}</label></div><div className='text-white'>|</div>
                            <div className='logoutbtn d-flex text-white' onClick={() => setIsLogin(!isLogin)}>
                                <p>Logout</p>
                                <svg aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16 fa-center" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
                            </div>
                        </div>
                    }
                </form>
            </div>
            <div className='bottom border-top'>
                <div className='content'>
                    <div className='menu'>
                        {menu.map((item, index) =>
                            <a
                                key={index}
                                href={item.url}
                                className={(window.location.pathname === item.url) ? 'menu-item active' : window.location.pathname === '/' && index === 0 ? 'menu-item active' : 'menu-item'}
                                onClick={onClick}
                            >{item.title}</a>
                        )}
                    </div>
                    <div className='dropdownbtn'>
                        <p
                            className='dropbtn1'
                            onClick={() => setOpenModal(true)}
                        >
                            <img src='./assets/images/flags/en_US.png' className='language' alt='flag' />
                            <span> English</span>
                        </p>
                    </div>
                    <div className='clearfix'></div>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenModal(false)}
                        style={customStyles}
                        contentLabel="Example Modal"
                        shouldCloseOnOverlayClick={false}
                        overlayClassName='overlay'

                    >
                        <div className="modal-header">
                            <h5 className="modal-title">LANGUAGE SELECTOR</h5>
                            <button type="button" className="close" onClick={() => setOpenModal(false)}><span>×</span></button>
                        </div>
                        <div className="modal-body form-horizontal">
                            <div className="col-12 p-0">
                                <div className="language-list">
                                    <ul>
                                        <li><div><img src="../assets/images/flags/de_DE.png" className="language" alt=''/>Deutsch</div></li>
                                        <li><div><img src="../assets/images/flags/en_US.png" className="language" alt=''/>English</div></li>
                                        <li><div><img src="../assets/images/flags/nl_NL.png" className="language" alt=''/>Dutch</div></li>
                                        <li><div><img src="../assets/images/flags/tr_TR.png" className="language" alt=''/>Türkçe</div></li>
                                        <li><div><img src="../assets/images/flags/el_GR.png" className="language" alt=''/>Ελληνικά</div></li>
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="col-12 d-flex justify-content-center text-center" onClick={() => setOpenModal(false)}>
                                <p id="closeModal" className="btn-cancel">Close</p>
                            </div>
                        </div>
                        <div className='clearfix'></div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default Navbar