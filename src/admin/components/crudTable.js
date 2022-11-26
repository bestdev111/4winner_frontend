import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CRUDTable, {
    Fields,
    Field,
    Select,
    CreateForm,
    UpdateForm,
    DeleteForm
} from "react-crud-table";
import { registerUser, updateUser, deleteUser } from '../../auth/store/action/authActions'
import "../styles/crud_table.css";

const CrudTable = () => {
    const dispatch = useDispatch();
    const allUser = useSelector(state => state.authReducers.authReducer.users)
    const currentUser = useSelector(state => state.authReducers.authReducer.user)
    const currentRole = currentUser.role;
    const fetchItems = (payload, users) => {
        let result = Array.from(users);
        return Promise.resolve(result);
    }
    const create = user => {
        return dispatch(registerUser(user));
    }
    const update = user => {
        return dispatch(updateUser(user));
    }
    const deleteItem = user => {
        return dispatch(deleteUser(user));
    }
    console.log('role', currentRole);
    return (
        <div>
            <CRUDTable
                fetchItems={payload => fetchItems(payload, allUser.users)}
            >
                <Fields>
                    <Field name="id" label="Id" hideInCreateForm hideInUpdateForm/>
                    <Field name="name" label='Name'/>
                    <Field name='role' type='list' label='Role' hideInCreateForm hideInUpdateForm />
                    <Field name="balance" type='number' label='Balance' hideInCreateForm hideInUpdateForm />
                    <Field name="password" type='password' label='Password' hideFromTable hideInUpdateForm />
                    <Field name="passwordConfirm" type='password' label='Confirm Password' hideFromTable hideInUpdateForm />
                </Fields>
                <CreateForm
                    title="User Creation"
                    message="Create a new User!"
                    trigger="Create User"
                    onSubmit={(user) => create(user)}
                    submitText="Create"
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Please input name";
                        }
                        if (!values.password || !values.passwordConfirm) {
                            errors.password = "Please correct password or Confirm Password";
                        }
                        if (values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = "Please match password and Confirm Password";
                        }
                        return errors;
                    }}
                />

                <UpdateForm
                    title="User Update Process"
                    message="Update User"
                    trigger="Update"
                    onSubmit={(user) => update(user)}
                    submitText="Update"
                    validate={values => {
                        const errors = {};

                        if (!values.name) {
                            errors.title = "Please, provide name";
                        }
                        // if (!values.userrole) {
                        //     errors.userrole = "Please, provide role";
                        // }
                        // if (!values.balance) {
                        //     errors.balance = "Please input balance";
                        // }
                        return errors;
                    }}
                />

                <DeleteForm
                    title="User Delete Process"
                    message="Are you sure you want to delete this User?"
                    trigger="Delete"
                    onSubmit={(user) => deleteItem(user)}
                    submitText="Delete"
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.id = "Please, provide name";
                        }
                        return errors;
                    }}
                />
            </CRUDTable>
        </div>
    )
}
export default CrudTable;