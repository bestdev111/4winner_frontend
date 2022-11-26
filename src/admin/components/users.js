import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'usehooks-ts'
import { userGet } from '../../auth/store/action/authActions'
import CrudTable from './crudTable'
const Users = () => {
    const dispatch = useDispatch();
    const allUser = useSelector(state => state.authReducers.authReducer.users)
    useEffect(() => {
        dispatch(userGet());
    }, [])

    return (
        <div className='container mt-5'>
            {allUser ? <CrudTable/> : <></>}
        </div>
    );
}
export default Users;