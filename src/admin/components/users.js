import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'usehooks-ts'
import { userGet } from '../../auth/store/action/authActions'
import CrudTable from './crudTable/crudTable'
const Users = () => {
    const dispatch = useDispatch();
    const [who, setWho] = useState(null)
    const allUser = useSelector(state => state.authReducers.authReducer.users)
    const currentUser = useSelector(state => state.authReducers.authReducer.user)
    useEffectOnce(() => {
        if(currentUser){
            console.log('I want');
            dispatch(userGet(currentUser));
        }
        if (currentUser.role === 'admin') {
            setWho('Create User')
        }
        if (currentUser.role === 'agent') {
            setWho('Create Distributor')
        }
        if (currentUser.role === 'distributor') {
            setWho('Create Cashier')
        }
        if (currentUser.role === 'cashier') {
            setWho('Create User')
        }
    }, [dispatch])

    return (
        <div className='container mt-5'>
            {allUser ? <CrudTable item={allUser} who={who ? who : ''} /> : <></>}
        </div>
    );
}
export default Users;