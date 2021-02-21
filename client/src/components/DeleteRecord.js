import React, { useState, useRef } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

const DeleteRecord = props => {

    const { closeModal, refreshGrid, selectedRecord, type } = props;

    const onClickDelete = async () => {
        let { _id } = selectedRecord;
        let response = await axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/${type}/delete/${_id}`
        });

        closeModal();
        refreshGrid();
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
                Delete
          </ModalHeader>
            <ModalBody>
                <Form>
                    <div>
                        Do you widh to delete this record ?
                </div>
                    <div className="text-right empty-row">
                        <Button type="button" color="danger" onClick={onClickDelete} disabled={false}>Delete</Button>
                        {'   '}
                        <Button type="button" color="dark" onClick={closeModal}>Close</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )

}

DeleteRecord.propTypes = {
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

export default DeleteRecord;