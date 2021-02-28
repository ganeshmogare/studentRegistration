import React, { useState, useRef } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

const UpdateCourse = props => {
    const { closeModal, refreshGrid , selectedRecord } = props;
    const [formData , setFormData] = useState(selectedRecord);
    const updateFormRef = useRef();

    const onClickSave = async () => {
        let { id } = selectedRecord;
        let response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/courses/update/${id}`,
            data: JSON.stringify(formData)
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
        if(!formData.name) return false;
        return true;
    }

    const renderForm = () => {

        let start =<span style={{ color: 'red' }}>*</span>;
        let { name , details} = formData;

        return <div>
            <Form ref={updateFormRef}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="name">Course Name{start}</Label>
                            <Input type="text" name="name" id="name" value={name} onChange={handleFormValueChanges} placeholder="Enter Course Name" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="details">Details{start}</Label>
                            <Input type="textArea" name="details" id="details" value={details} onChange={handleFormValueChanges} placeholder="Enter Course Details" />
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
                Update Course Details
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

UpdateCourse.propTypes = {
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

export default UpdateCourse;