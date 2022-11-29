import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './modal'
import DataTable from './dataTable'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, updateUser, deleteUser } from '../../../auth/store/action/authActions'
import '../../styles/table.css'
function CrudTable(props) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([])
    const allUser = useSelector(state => state.authReducers.authReducer.users)
    // useEffect(() => {
    //     setItems(props.item)
    // }, [])
    const addItemToState = (user) => {
        console.log('called addItemToState',user);
        // dispatch(registerUser(user));
    }
    const updateState = (item) => {
        console.log('called updateState');
        const itemIndex = items.findIndex(data => data.id === item.id)
        const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
        setItems(newArray)
    }

    const deleteItemFromState = (user) => {
        alert(user);
        // const updatedItems = items.filter(item => item.id !== user.id)
        // setItems(updatedItems)
    }
    return (
        <Container className="App">
            <Row>
                <Col>
                    <ModalForm className="create_btn" label={props.who} buttonLabel="Add User" addItemToState={addItemToState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable updateState={updateState} deleteItemFromState={deleteItemFromState} />
                </Col>
            </Row>
        </Container>
    )
}

export default CrudTable