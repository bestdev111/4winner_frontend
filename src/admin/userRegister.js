import React, { useState, useEffect } from 'react';
import { registerUser } from '../auth/store/action/authActions'
import { useDispatch, useSelector } from 'react-redux'
const rolelist = ['admin', 'agent', 'distributor', 'cashier', 'user']
function UserRegister() {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [inputPassConfirm, setInputPassConfirm] = useState('');
    const [role, setRole] = useState('');

    const register = () => {
        const user = {
            name: inputName,
            password: inputPass,
            passwordConfirm: inputPassConfirm,
            userrole: rolelist[role]
        };
        dispatch(registerUser(user));
    }
    return (
        <div className='container'>
            <form>
                <div className='d-flex flex-wrap mt-5'>
                    <div className='d-flex col-6'>
                        <label ><b>Name</b></label>
                        <input type='text' className='' placeholder='Username' name='name' defaultValue={inputName} onChange={(e) => setInputName(e.target.value)} />
                    </div>
                    <div className='d-flex col-6'>
                        <label ><b>User Role</b></label>
                        <select className='custom-select' name='role' defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                            <option value='' disabled>Please select role</option>
                            {rolelist ? rolelist.map((list, index) => <option key={index} value={index}>{list}</option>) : <></>}
                        </select>
                    </div>
                    <div className='d-flex col-6'>
                        <label ><b>Password</b></label>
                        <input type='password' className='' placeholder='Password' name='password' defaultValue={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                    </div>
                    <div className='d-flex col-6'>
                        <label ><b>Password Confirm</b></label>
                        <input type='password' className='' placeholder='Password Confirm' name='psw-repeat' defaultValue={inputPassConfirm} onChange={(e) => setInputPassConfirm(e.target.value)} />
                    </div>
                    <div className='d-flex justify-content-center col-12'>
                        <input className='btn btn-register' type='button' defaultValue='Register' onClick={() => register()} />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default UserRegister