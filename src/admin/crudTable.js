import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm
} from "react-crud-table";
import { registerUser, updateUser, deleteUser } from '../auth/store/action/authActions'
import "./styles/crud_table.css";

const CrudTable = () => {
    const dispatch = useDispatch();
    const allUser = useSelector(state => state.authReducers.authReducer.users)
    let tasks = [
        {
            id: 1,
            title: "Create an example",
            description: "Create an example of how to use the component"
        },
        {
            id: 2,
            title: "Improve",
            description: "Improve the component!"
        }
    ];
    const SORTERS = {
        NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
        NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
        STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
        STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
    };
    
    const getSorter = data => {
        const mapper = x => x[data.field];
        let sorter = SORTERS.STRING_ASCENDING(mapper);
    
        if (data.field === "id") {
            sorter =
                data.direction === "ascending"
                    ? SORTERS.NUMBER_ASCENDING(mapper)
                    : SORTERS.NUMBER_DESCENDING(mapper);
        } else {
            sorter =
                data.direction === "ascending"
                    ? SORTERS.STRING_ASCENDING(mapper)
                    : SORTERS.STRING_DESCENDING(mapper);
        }
    
        return sorter;
    };
    
    let count = allUser.users.length;
    const fetchItems = (payload, users) => {
        let result = Array.from(users);
        result = result.sort(getSorter(payload.sort));
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
    const styles = {
        container: { margin: "auto" }
    };

    return (
        <div style={styles.container}>
            <CRUDTable
                caption="Users"
                fetchItems={payload => fetchItems(payload, allUser.users)}
            >
                <Fields>
                    {/* <Field name="_id" label="Id" hideInCreateForm hideInUpdateForm hideFromTable/> */}
                    <Field name="name" label="Name" placeholder="Name" />
                    <Field name="userrole" label="Role" placeholder="Role" type='select' />
                    <Field name="balance" label="Balance" type='number' placeholder="Balance" />
                    <Field name="password" label="password" type='password' placeholder="password" hideFromTable hideInUpdateForm />
                    <Field name="passwordConfirm" label="Confirm Password" type='password' placeholder="passwordConfirm" hideFromTable hideInUpdateForm />
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
                        if (!values.userrole) {
                            errors.userrole = "Please input role";
                        }
                        if (!values.balance) {
                            errors.balance = "Please input balance";
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
                        if (!values.userrole) {
                            errors.userrole = "Please, provide role";
                        }
                        if (!values.balance) {
                            errors.balance = "Please input balance";
                        }
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