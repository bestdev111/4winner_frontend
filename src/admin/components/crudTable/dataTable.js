import React from 'react'
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import ModalForm from './modal'

function DataTable(props) {
  const allUser = useSelector(state => state.authReducers.authReducer.users)
  const items = allUser ? allUser.users.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.role}</td>
        <td>{item.balance}</td>
        <td>
          <div className='d-flex justify-content-center'>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            <ModalForm buttonLabel="Delete" item={item} deleteItemFromState={props.deleteItemFromState} />
          </div>
        </td>
      </tr>
    )
  }) : <></>
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable