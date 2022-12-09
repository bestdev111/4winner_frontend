import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MobileNavbar } from '../../../mobile/components'
import { passwordChange } from '../../../store/actions/authActions';
import ToastService from '../../../service/toast.service';
import './mLogin.css'
function MChangePassword() {
    const dispatch = useDispatch();
    const [currentPass, setCurrentPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const userData = useSelector(state => state.authReducers);
    const changePass = () => {
        if (currentPass && newPass && confirmPass) { 
            if (newPass === confirmPass) {
                const data = {
                    name: userData.user.name,
                    currentPass: currentPass,
                    newPass: newPass,
                    confirmPass: confirmPass,
                }
                dispatch(passwordChange(data));
            }
            else{
                ToastService("Please Match Password!", 'error');
            }
        }
        else{
            ToastService("Please Input Password!", 'error');
        }
    }
    return (
        <>
            <MobileNavbar />
            <div className='login_header'>
                <div className='d-flex justify-content-center'>Change Password</div>
                <div className='d-flex justify-content-end'><a href='/m_home'><i className="fa fa-times-circle-o" aria-hidden="true"></i></a></div>
            </div>
            <div className='p-3 form'>
                <div className="form-group">
                    <label htmlFor="usr">Current Password:</label>
                    <input type="password" className="form-control p-2 pl-3" onChange={e => setCurrentPass(e.target.value)} id="pwd" name="currentPass"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">New Password:</label>
                    <input type="password" className="form-control p-2 pl-3" onChange={e => setNewPass(e.target.value)} id="pwd" name="newPass"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Confirm Password:</label>
                    <input type="password" className="form-control p-2 pl-3" onChange={e => setConfirmPass(e.target.value)} id="pwd" name="confirmPass" />
                </div>
                <input type="button" className="m_login_btn" value='Change Password' onClick={changePass} />
            </div>
        </>
    );
};
export default MChangePassword;