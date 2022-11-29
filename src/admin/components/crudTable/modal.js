import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from './formAddEdit'

function ModalForm(props) {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  const buttonLabel = props.buttonLabel
  // const label = props.who
  let button = ''
  let title = ''
  // Add User
  if (buttonLabel === 'Edit') {
    button = <Button
      className='button edit_btn'
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{buttonLabel}
    </Button>
    title = 'Edit User'
  } 
  if (buttonLabel === 'Add User') {
    button = <Button
      className='button create_btn'
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{buttonLabel}
    </Button>
    title = 'Add New User'
  } 
  if (buttonLabel === 'Delete') {
    button = <Button
      className='button del_btn'
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{buttonLabel}
    </Button>
    title = 'Delete User'
  }
  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            deleteItemFromState={props.deleteItemFromState}
            toggle={toggle}
            item={props.item} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalForm