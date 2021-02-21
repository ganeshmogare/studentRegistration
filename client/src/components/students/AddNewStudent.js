import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

const AddNewStudent = props => {

    const { closeModal, refreshGrid } = props;
    const [formData , setFormData] = useState({
        firstName:"",
        lastName:"",
        phone:"",
        dob:""
    });
    const addStudentFormRef = useRef();


    useEffect(() => {
    })


    const onClickSave = async () => {
        let response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/students/create`,
            data: formData
        });

        closeModal();
        refreshGrid();
    }

    const handleFormValueChanges = ({target})=>{
        let { name, value, type } = target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const isValidateFormData =()=>{
        if(!formData.firstName || !formData.lastName || !formData.phone || !formData.dob) return false;
        return true;
    }

    const renderForm = () => {

        let start =<span style={{ color: 'red' }}>*</span>;

        return <div>
            <Form ref={addStudentFormRef}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="firstName">First Name{start}</Label>
                            <Input type="text" name="firstName" id="firstName" onChange={handleFormValueChanges} placeholder="Enter First Name" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="lastName">Last Name{start}</Label>
                            <Input type="text" name="lastName" id="lastName" onChange={handleFormValueChanges} placeholder="Enter Last Name" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="dob">DOB{start}</Label>
                            <Input type="date" name="dob" id="dob" onChange={handleFormValueChanges} placeholder="Choose DOB" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="phone">Contact No{start}</Label>
                            <Input type="number" name="phone" id="phone" onChange={handleFormValueChanges} placeholder="Enter Number" />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    }

    return (
        <Modal
            isOpen={true}
            toggle={closeModal}
            backdrop={false}
            keyboard={true}
            size={"lg"}
            className={`modal-info`}>
            <ModalHeader
                toggle={closeModal}
                className="modal-colored-header bg-primary"
                style={{ textAlign: 'center' }}
            >
                Create New Student
          </ModalHeader>
            <ModalBody>
                <div>
                    {renderForm()}
                </div>
                    <div className="text-right empty-row">
                    <Button type="button" color="success" onClick={onClickSave} disabled={!isValidateFormData()}>Save</Button>
                    {'   '}
                    <Button type="button" color="danger" onClick={closeModal}>Close</Button>
                </div>
            </ModalBody>
        </Modal>
    )

}

AddNewStudent.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ message: PropTypes.string })
    ]),
    heading: PropTypes.string,
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    closeButton: PropTypes.bool
}

export default AddNewStudent;