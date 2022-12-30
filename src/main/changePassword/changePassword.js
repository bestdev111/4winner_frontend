import React , {useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, RightPanel, LeftMenu } from '../../components';
import { passwordChange } from '../../store/actions/authActions';
import ToastService from '../../service/toast.service';
import './changePassword.css'
function ChangePassword() {
    const dispatch = useDispatch();
    const [currentPass, setCurrentPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const userData = useSelector(state => state.authReducers);

    const changePass = () => {
        if (currentPass && newPass && confirmPass) {
            if (newPass === confirmPass) {
                const data = {
                    userName: userData.user.name,
                    currentPass: currentPass,
                    newPass: newPass,
                    confirmPass: confirmPass,
                }
                dispatch(passwordChange(data));
            }
            else {
                ToastService("Please Match Password!", 'error');
            }
        }
        else {
            ToastService("Please Input Password!", 'error');
        }
    }
    return (
        <>
            <Navbar />
            <div className='container-fluid d-flex flex-column ptt'>
                <div className='row'>
                    <div className='left px-2 float-left'>
                        <LeftMenu />
                    </div>
                    <div className='center px-2 float-left'>
                        <div className="change-password">
                            <div className="change-password-header">
                                <div className="title">
                                    <span>Change Password</span>
                                </div>
                            </div>
                            <div className="change-password-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="textbox">
                                            <label className="control-label">Current Password:</label>
                                            <input type="password" id="oldPassword" className="" placeholder="" value={currentPass} onChange={e => setCurrentPass(e.target.value)} />
                                            <span className="text-danger"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="textbox">
                                            <label className="control-label">New Password:</label>
                                            <input type="password" id="newPassword" className="" placeholder="" value={newPass} onChange={e => setNewPass(e.target.value)} />
                                            <span className="text-danger">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="textbox">
                                            <label className="control-label">Confirm Password:</label>
                                            <input type="password" id="confirmPassword" className="" placeholder="" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                                            <span className="text-danger"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="btn-group">
                                        <div className="col-4">
                                            <a className="btn-cancel"> Cancel</a>
                                        </div>
                                        <div className="col-4">
                                            <a className="btn-confirm" onClick={changePass} >Ok</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right px-2 float-left'>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </>
    );
};
export default ChangePassword;