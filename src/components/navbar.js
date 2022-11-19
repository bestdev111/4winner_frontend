import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { authRoles } from '../auth';
import { loginUser, logoutUser, updateCurrentUser } from '../auth/store/action/authActions'
import { Trans, withTranslation } from 'react-i18next';
import { Language } from '../utils';
import './styles/navbar.css'

let menu = [
    { url: '/sportsbetting', title: 'Sports Betting' },
    { url: '/inplay', title: 'In-Play' },
    { url: '/outrights', title: 'Outrights' },
    { url: '/results', title: 'Results' },
    // { url: '/slots', title: 'Slots' },
    // { url: '/livecasino', title: 'Live Casino' },
]
const customStyles = {
    content: {
        position: 'fixed',
        border: '1px solid rgba(0,0,0,.2)',
        width: '300px',
        height: '415px',
        inset: 'calc(15%) calc(50% - 150px)',
        padding: '10px',
        overflow: 'unset'
    },
};

const onClick = (e) => {
    localStorage.setItem('path', window.location.pathname);
}
function Navbar(props) {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [currentLang, setCurrentLang] = useState();
    const { i18n } = useTranslation();
    const userData = useSelector(state => state.authReducers.authReducer)
    useEffect(() => {
        if (userData && userData.user) {
            console.log('changelang');
            setCurrentLang(Language[userData.user.lang])
            i18n.changeLanguage(Language[userData.user.lang].name);
        }
    })
    const login = () => {
        const user = {
            name: inputName,
            password: inputPass
        };
        dispatch(loginUser(user));
    }
    let userRole = 'user'
    if (userData && userData.user !== null) {
        userRole = userData.user.role;
    }
    if (authRoles.cashier.includes(userRole)) {
        menu = [
            { url: '/adminpanel', title: 'Admin Panel' },
        ]
    }
    const changeLanguage = (param, index) => {
        i18n.changeLanguage(param);
        setOpenModal(false)
        if (userData && userData.user) {
            let userId = userData.user.userId;
            const data = {
                userId: userId,
                lang: index
            }
            dispatch(updateCurrentUser(data))
        }
        setCurrentLang(Language[index])
    }
    console.log('changelang2', currentLang);
    return (
        <div className='header'>
            <div className='top'>
                <div className='logo'>
                    <img src='' alt='' />
                </div>
                <form
                    className='login_form'
                >
                    {!userData.isAuthenticated ?
                        <div>
                            <div className='textbox'>
                                <input type='text' className='inputbox' placeholder='Username' name='name' defaultValue={inputName} onChange={(e) => setInputName(e.target.value)} />
                            </div>
                            <div className='textbox'>
                                <input type='text' className='inputbox' placeholder='Password' name='password' defaultValue={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                            </div>
                            <input className='login_btn' type='button' defaultValue='Login' onClick={() => login()} />
                        </div>
                        : <div className='logined d-flex'>
                            <div><a href='/myaccount' className='text-white '>My Account</a></div><div className='text-white'>|</div>
                            <div><a href='/changepass' className='text-white'>Change Password</a></div><div className='text-white'>|</div>
                            <div><label className='text-white'>{userData.user.name} : {userData.user.balance}</label></div><div className='text-white'>|</div>
                            <div className='logoutbtn d-flex text-white' onClick={() => dispatch(logoutUser())}>
                                <p>Logout</p>
                                <svg aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="sign-out-alt" className="svg-inline--fa fa-sign-out-alt fa-w-16 fa-center" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
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
                            ><Trans>{item.title}</Trans></a>
                        )}
                    </div>
                    <div className='dropdownbtn'>
                        <p
                            className='dropbtn1'
                            onClick={() => setOpenModal(true)}
                        >
                            <img src={currentLang ? currentLang.icon : 'assets/images/flags/en_US.png'} className='language' alt='flag' />
                            <span> {currentLang ? currentLang.title : 'English'}</span>
                        </p>
                    </div>
                    <div className='clearfix'></div>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenModal(false)}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                        overlayClassName='overlay'
                        ariaHideApp={false}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title">LANGUAGE SELECTOR</h5>
                            <button type="button" className="close" onClick={() => setOpenModal(false)}><span>×</span></button>
                        </div>
                        <div className="modal-body form-horizontal">
                            <div className="col-12 p-0">
                                <div className="language-list">
                                    <ul>
                                        {Language ?
                                            Language.map((lang, index) =>
                                                <li key={index} onClick={() => changeLanguage(lang.name, index)}>
                                                    <div><img src={lang.icon} className="language" alt='' />{lang.title}</div>
                                                </li>)
                                            : <></>
                                        }
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