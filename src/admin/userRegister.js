import React, { useState, useEffect } from 'react';
import { registerUser } from '../auth/store/action/authActions'
import { useDispatch, useSelector } from 'react-redux'
const rolelist = ['admin', 'agency', 'contributor', 'cashier', 'user']
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
            userrole: rolelist[role]
        };
        dispatch(registerUser(user));
    }
    return (
        <div className=''>
            <form className=''>
                <div className=''>
                    <div className='d-flex'>
                        <label ><b>Name</b></label>
                        <input type='text' className='' placeholder='Username' name='name' value={inputName} onChange={(e) => setInputName(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label ><b>Email</b></label>
                        <input type='text' className='' placeholder='Email' name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label ><b>Password</b></label>
                        <input type='password' className='' placeholder='Password' name='password' value={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label ><b>Password Confirm</b></label>
                        <input type='password' className='' placeholder='Password Confirm' name='psw-repeat' value={inputPassConfirm} onChange={(e) => setInputPassConfirm(e.target.value)} />
                    </div>
                    <div className='d-flex'>
                        <label ><b>User Role</b></label>
                        <select className='custom-select' name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value='' disabled>Please select role</option>
                            {rolelist ? rolelist.map((list, index) => <option key={index} value={index}>{list}</option>) : <></>}
                        </select>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <input className='btn btn-register' type='button' value='Register' onClick={() => register()} />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default UserRegister