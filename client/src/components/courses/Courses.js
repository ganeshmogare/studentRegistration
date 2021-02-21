import React, { useState, useEffect } from 'react';
import { Button, Table } from "reactstrap";
import axios from 'axios';
import moment from "moment";

import GridTable from "../GridTable";
import AddNewCourse from "./AddNewCourse";
import UpdateCourse from './UpdateCourse';
import DeleteRecord from "../DeleteRecord";

const LeadsDashboard = props => {
    const [courseData, setCourseData] = useState([]);
    const [ showAddNewCourseModal, setShowAddNewCourseModal ] = useState(false);
    const [ showUpdateModal, setShowUpdateModal ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ selectedRowData ,setSelectedRowData] = useState({});

    useEffect(() => {
        getTableContents();
    }, []);

    const getTableContents = async () => {
        
        let response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/courses/list`
        });
        console.log(response);
        setCourseData(response.data.docs);
    };

    const handleUpdate =(row)=>{
        setSelectedRowData(row);
        setShowUpdateModal(true);
    }

    const closeUpdateModal =()=>{
        setSelectedRowData({});
        setShowUpdateModal(false);
    }

    const closeAddNewCourseModal = ()=>{
        setShowAddNewCourseModal(false);
    }

    const onClickCreateCourse =()=>{
        setShowAddNewCourseModal(true);
    }

    const buildToolbarItems = () => {
        return (
          <Button color="success" size="sm" onClick={onClickCreateCourse}>
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
            dataField:"name",
            text:"Name"
        },{
            dataField:"details",
            text:"Details"
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
            <GridTable data ={courseData} columns ={columns} toolbarItems ={buildToolbarItems()}/>

            { showAddNewCourseModal &&
            <AddNewCourse
            closeModal ={closeAddNewCourseModal}
            refreshGrid={getTableContents}
            />}

            { showUpdateModal &&
            <UpdateCourse
            selectedRecord ={ selectedRowData}
            closeModal ={closeUpdateModal}
            refreshGrid={getTableContents}
            />}

            { showDeleteModal &&
            <DeleteRecord
            type="courses"
            selectedRecord ={ selectedRowData}
            closeModal ={closeDeleteModal}
            refreshGrid={getTableContents}
            />}
        </div>
        </div>
    );
}

export default LeadsDashboard;