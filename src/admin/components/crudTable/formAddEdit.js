import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { userGet, registerUser, updateUser, deleteUser } from '../../../auth/store/action/authActions'
import ToastService from '../../../service/toast.service';
const roleTypes = ['admin', 'agent', 'distributor', 'cashier', 'user'];
function AddEditForm(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducers.authReducer.user)
  const [form, setValues] = useState({
    _id: '',
    name: '',
    role: '',
    password: '',
    passwordConfirm: ''
  })
  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    if (form.name && form.role && form.password && form.passwordConfirm && form.password === form.passwordConfirm) {
      dispatch(registerUser(form));
      props.toggle()
    } else {
      ToastService('Create Error!', "error");
    }
    // console.log(form);
  }

  const submitFormEdit = e => {
    e.preventDefault()
    if (form.name && form.role) {
      dispatch(updateUser(form));
      props.toggle()
    } else {
      ToastService('Please input', "error");
    }
    // console.log(form);
  }
  const deleteItemFromState = e => {
    e.preventDefault()
    let data = { name: form.name }
    dispatch(deleteUser(data));
    props.toggle()
  }
  useEffect(() => {
    if(currentUser){
      console.log('formAddEdit called', currentUser);
      dispatch(userGet(currentUser));
    }
    if (props.item) {
      // console.log('ssss', props);
      const { _id, name, role } = props.item
      setValues({ _id, name, role })
    }
  }, [])
  return (
    <Form onSubmit={!props.item ? submitFormAdd : props.updateState ? submitFormEdit : deleteItemFromState}>
      {props.deleteItemFromState ?
        <div className='del-detail'>Are you sure?</div>
        :
        <>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" onChange={onChange} defaultValue={form.name === null ? '' : form.name} required />
          </FormGroup>
          {currentUser.role === 'admin' ?
            <FormGroup>
              <Label for="role">Role</Label>
              <select name='role' id='role' className='form-control' defaultValue={props.item ? props.item.role : 'default'} onChange={onChange} required>
                <option value='default' disabled>Choose a role</option>
                {roleTypes.map((roleType, index) =>
                  <option key={index} value={roleType}>{roleType}</option>
                )}
              </select>
            </FormGroup>
            : <></>
          }
          {props.updateState ?
            <></>
            :
            <>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" onChange={onChange} defaultValue={form.password === null ? '' : form.password} required />
              </FormGroup>
              <FormGroup>
                <Label for="passwordConfirm">Confirm Password</Label>
                <Input type="password" name="passwordConfirm" id="passwordConfirm" onChange={onChange} defaultValue={form.passwordConfirm === null ? '' : form.passwordConfirm} required />
              </FormGroup>
            </>
          }
        </>
      }
      <Button className='button submit_btn'>Submit</Button>
    </Form>
  )
}

export default AddEditForm