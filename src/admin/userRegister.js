import React, { useState, useEffect } from 'react';
import { registerUser } from 'auth/store/action/authActions'
import { useDispatch, useSelector } from 'react-redux'

function UserRegister() {
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
        dispatch(registerUser(user));
    }
    return (
        <div className='container'>
            <form className=''>
                <div className='container'>
                    <div className='d-flex'>
                        <label for="name"><b>Name</b></label>
                        <input type='text' className='' placeholder='Username' name='name' value={inputName} onChange={(e) => setInputName(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label for="email"><b>Email</b></label>
                        <input type='text' className='' placeholder='Email' name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label for="psw"><b>Password</b></label>
                        <input type='password' className='' placeholder='Password' name='password' value={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label for="psw-repeat"><b>Password Confirm</b></label>
                        <input type='password' className='' placeholder='Password Confirm' name='psw-repeat' value={inputPassConfirm} onChange={(e) => setInputPassConfirm(e.target.value)} />
                    </div>
                    <div>
                        <label for="psw-repeat"><b>User Role</b></label>
                        <select name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value=''>Please select role</option>
                            <option value='0'>admin</option>
                            <option value='1'>agent</option>
                            <option value='2'>distributor</option>
                            <option value='3'>cashier</option>
                            <option value='4'>user</option>
                        </select>
                    </div>
                    <input className='btn signupbtn' type='button' value='Register' onClick={() => register()} />
                </div>
            </form>
        </div>
    )
}
export default UserRegister