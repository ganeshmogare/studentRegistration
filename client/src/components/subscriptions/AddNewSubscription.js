import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

const AddNewSubscription = props => {

    const { closeModal, refreshGrid , students =[] , courses=[]} = props;
    const [formData , setFormData] = useState({
        studentName:"",
        courseName:"",
        studentId:"",
        courseId:""
    });
    const subscriptionsFormRef = useRef();

    const createSelectItems=(options)=> {
        let items = [];         
        for (let i = 0; i < options.length; i++) {             
             items.push(<option key={i} value={options[i].value} label={options[i].label}>{options[i].label}</option>);   
        }
        return items;
    }  

    const onClickSave = async () => {
        let response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/subscriptions/create`,
            data: formData
        });

        closeModal();
        refreshGrid();
    }

    const handleFormValueChanges = ({target, nativeEvent})=>{
        let { name, value, type } = target;
        let index = nativeEvent.target.selectedIndex;
        let label = nativeEvent.target[index].text;

        setFormData({
            ...formData,
            [`${name}Name`]:  label,
            [`${name}Id`]:  value
        })
    }

    const isValidateFormData =()=>{
        if(!formData.studentName || !formData.courseName) return false;
        return true;
    }

    const renderForm = () => {
        let start =<span style={{ color: 'red' }}>*</span>;

        return <div>
            <Form ref={subscriptionsFormRef}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="student">Student{start}</Label>
                            <Input type="select" name="student" onChange={handleFormValueChanges} id="student">
                            <option value="">Select</option>
                                {createSelectItems(students)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="course">Student{start}</Label>
                        <Input type="select" name="course" onChange={handleFormValueChanges} id="course">
                        <option value="">Select</option>
                            {createSelectItems(courses)}
                        </Input>
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
                Student Course Registration
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

AddNewSubscription.propTypes = {
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

export default AddNewSubscription;