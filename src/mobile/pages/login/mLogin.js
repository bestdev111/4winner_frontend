import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MobileNavbar } from '../../../mobile/components'
import { loginUser } from '../../../store/actions/authActions';
import './mLogin.css'
function MLogin() {
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [pass, setPass] = useState();
    const login = () => {
        const user = {
            name: name,
            password: pass
        }
        dispatch(loginUser(user));
    }
    return (
        <>
            <MobileNavbar />
            <div className='login_header'>
                <div className='d-flex justify-content-center'>Login</div>
                <div className='d-flex justify-content-end'><a href='/m_home'><i className="fa fa-times-circle-o" aria-hidden="true"></i></a></div>
            </div>
            <div className='p-3 form'>
                <div className="form-group">
                    <label htmlFor="usr">Username:</label>
                    <input type="text" className="form-control p-2 pl-3" onChange={e => setName(e.target.value)} id="usr" name="username" placeholder='Username' />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control p-2 pl-3" onChange={e => setPass(e.target.value)} id="pwd" name="password" placeholder='Password' />
                </div>
                <input type="submit" className="m_login_btn" value='Login' onClick={login} />
            </div>
        </>
    );
};
export default MLogin;