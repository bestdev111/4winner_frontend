import React, { useState,useEffect } from 'react';
import { registerUser } from 'auth/store/action/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from 'components'

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
            email: inputEmail,
            password: inputPass,
            passwordConfirm: inputPassConfirm,
            userrole_id: role
        };
        console.log(user);
        dispatch(registerUser(user));
    }
    return (
        <>
        <Navbar />
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
                    <select name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value=''>Please select role</option>
                        <option value='0'>admin</option>
                        <option value='1'>agent</option>
                        <option value='2'>distributor</option>
                        <option value='3'>cashier</option>
                        <option value='4'>user</option>
                    </select>
                </div>
                <input className='login_btn' type='button' value='Register' onClick={() => register()} />
            </form>
        </>
    );
};
export default Admin;