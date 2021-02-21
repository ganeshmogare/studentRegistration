import React, { useState, useRef } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

const UpdateStudent = props => {

    const { closeModal, refreshGrid , selectedRecord } = props;
    const [formData , setFormData] = useState(selectedRecord);
    const updateFormRef = useRef();

    const onClickSave = async () => {
        let { _id } = selectedRecord;
        let response = await axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/students/update/${_id}`,
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
        if(!formData.communication) return false;
        return true;
    }

    const renderForm = () => {

        let start =<span style={{ color: 'red' }}>*</span>;
        let { firstName , lastName , dob, phone} = formData;

        return <div>
            <Form ref={updateFormRef}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="firstName">First Name{start}</Label>
                            <Input type="text" name="firstName" id="firstName" value={firstName} onChange={handleFormValueChanges} placeholder="Enter First Name" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="lastName">Last Name{start}</Label>
                            <Input type="text" name="lastName" id="lastName" value={lastName} onChange={handleFormValueChanges} placeholder="Enter Last Name" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="dob">DOB{start}</Label>
                            <Input type="date" name="dob" id="dob" value={dob} onChange={handleFormValueChanges} placeholder="Choose DOB" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="phone">Contact No{start}</Label>
                            <Input type="number" name="phone" id="phone" value={phone} onChange={handleFormValueChanges} placeholder="Enter Number" />
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
            size={"sm"}
            className={`modal-info`}>
            <ModalHeader
                toggle={closeModal}
                className="modal-colored-header bg-primary"
                style={{ textAlign: 'center' }}
            >
                Update Student
          </ModalHeader>
            <ModalBody>
                <div>
                    {renderForm()}
                </div>
                    <div className="text-right empty-row">
                    <Button type="button" color="success" onClick={onClickSave} disabled={false}>Save</Button>
                    {'   '}
                    <Button type="button" color="danger" onClick={closeModal}>Close</Button>
                </div>
            </ModalBody>
        </Modal>
    )

}

UpdateStudent.propTypes = {
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

export default UpdateStudent;