import React, { useState, useEffect } from 'react';
import { Button, Table } from "reactstrap";
import axios from 'axios';
import moment from "moment";

import GridTable from "../GridTable";
import AddNewStudent from "./AddNewStudent";
import UpdateStudent from './UpdateStudent';
import DeleteRecord from "../DeleteRecord";

const LeadsDashboard = props => {
    const [studentsData, setStudentsData] = useState([]);
    const [ showAddNewStudentModal, setShowAddNewStudentModal ] = useState(false);
    const [ showUpdateModal, setShowUpdateModal ] = useState(false);
    const [ showDeleteStudentModal, setShowDeleteModal ] = useState(false);
    const [ selectedRowData ,setSelectedRowData] = useState({});

    useEffect(() => {
        getTableContents();
    }, []);

    const getTableContents = async () => {
        
        let response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/students/list`
        });
        console.log(response);
        setStudentsData(response.data);
    };

    const handleUpdate =(row)=>{
        setSelectedRowData(row);
        setShowUpdateModal(true);
    }

    const closeUpdateModal =()=>{
        setSelectedRowData({});
        setShowUpdateModal(false);
    }

    const closeAddNewStudentModal = ()=>{
        setShowAddNewStudentModal(false);
    }

    const onClickCreateStudent =()=>{
        setShowAddNewStudentModal(true);
    }

    const buildToolbarItems = () => {
        return (
          <Button color="success" size="sm" onClick={onClickCreateStudent}>
            <i className="add" /> Create
          </Button>
        )
      }

      const handleDeleteStudent = row =>{
          setSelectedRowData(row);
          setShowDeleteModal(true);
      }

      const closeDeleteModal =()=>{
          setSelectedRowData({});
          setShowDeleteModal(false);
      }

    const columns =[
        {
            dataField:"firstName",
            text:"First Name"
        },{
            dataField:"lastName",
            text:"Last Name"
        },{
            dataField:"phone",
            text:"Contact No"
        },{
            dataField:"dob",
            text:"DOB",
            formatter: (cell,row) =>{
                return moment(cell).format("DD-MM-YYYY")
            }
        },
        {
            dataField: 'id',
            text: 'Actions',
            width: '200px',
            formatter: (cell, row) => {
                return (
                    <div>
                        <Button color="primary" type="primary" size="small" className="mr-1" onClick={() => handleUpdate(row)}>
                            Update
                        </Button>{" "}
                        <Button color="danger" type="danger" size="small" className="mr-1" onClick={() => handleDeleteStudent(row)}>
                            Delete
                        </Button>
                    </div>
                );
            }
        }
    ]

    return (
        <div>
            <div style={{width:"90%", margin:"3%"}}>
            <GridTable data ={studentsData} columns ={columns} toolbarItems ={buildToolbarItems()}/>

            { showAddNewStudentModal &&
            <AddNewStudent
            closeModal ={closeAddNewStudentModal}
            refreshGrid={getTableContents}
            />}

            { showUpdateModal &&
            <UpdateStudent
            selectedRecord ={ selectedRowData}
            closeModal ={closeUpdateModal}
            refreshGrid={getTableContents}
            />}

            { showDeleteStudentModal &&
            <DeleteRecord
            type="students"
            selectedRecord ={ selectedRowData}
            closeModal ={closeDeleteModal}
            refreshGrid={getTableContents}
            />}
        </div>
        </div>
    );
}

export default LeadsDashboard;