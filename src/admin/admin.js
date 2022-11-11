import React, { useState, } from 'react';
import { registerUser } from 'auth/store/action/authActions'
import { useDispatch, useSelector } from 'react-redux'
// import './mLogin.css'
function Admin() {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [inputPassConfirm, setInputPassConfirm] = useState('');
    const [role, setRole] = useState('');
    const register = () => {
        const user = {
            name: inputName,
            password: inputPass
        };
        dispatch(registerUser(user));
    }
    return (
        <div>
            <form
                className='login_form'
            >
                <div className='textbox'>
                    <input type='text' className='inputbox' placeholder='Username' name='name' value={inputName} onChange={(e) => setInputName(e.target.value)} />
                </div>
                <div className='textbox'>
                    <input type='email' className='inputbox' placeholder='Email' name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                </div>
                <div className='textbox'>
                    <input type='password' className='inputbox' placeholder='Password' name='password' value={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                </div>
                <div className='textbox'>
                    <input type='password' className='inputbox' placeholder='Password Confirm' name='password_confirm' value={inputPassConfirm} onChange={(e) => setInputPassConfirm(e.target.value)} />
                </div>
                <div className='textbox'>
                    <select >
                        <option>Please select role</option>
                        <option>admin</option>
                        <option>agent</option>
                        <option>distributor</option>
                        <option>cashier</option>
                        <option>user</option>
                    </select>
                </div>
                <input className='login_btn' type='button' value='Register' onClick={() => register()} />
            </form>
        </div>
    );
};
export default Admin;