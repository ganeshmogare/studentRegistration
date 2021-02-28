import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

const AddNewCourse = props => {

    const { closeModal, refreshGrid } = props;
    const [formData , setFormData] = useState({
        name:"",
        details:""
    });
    const addCourseFormRef = useRef();

    const onClickSave = async () => {
        let response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/courses/create`,
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
        if(!formData.name || !formData.details ) return false;
        return true;
    }

    const renderForm = () => {

        let start =<span style={{ color: 'red' }}>*</span>;

        return <div>
            <Form ref={addCourseFormRef}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="name">Course Name{start}</Label>
                            <Input type="text" name="name" id="name" onChange={handleFormValueChanges} placeholder="Enter Course Name" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="details">Details{start}</Label>
                            <Input type="textarea" name="details" id="details" onChange={handleFormValueChanges} placeholder="Enter Couse Details" />
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
                Create New Course
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

AddNewCourse.propTypes = {
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

export default AddNewCourse;