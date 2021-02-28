import React, { useState, useEffect } from 'react';
import { Button, Table } from "reactstrap";
import axios from 'axios';
import moment from "moment";

import GridTable from "../GridTable";
import AddNewSubscription from "./AddNewSubscription";

const Subscriptions = props => {
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [studentsList, setStudentsList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [ showAddNewSubscriptionModal, setShowAddNewSubscriptionModal ] = useState(false);

    useEffect(() => {
        getTableContents();
        getStudentsList();
        getCoursesList();
    }, []);

    const getTableContents = async () => {   
        let response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/subscriptions/list`
        });
        console.log(response);
        setSubscriptionsData(response.data);
    };

    const getStudentsList = async () => {   
        let response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/students/list`
        });

        let { data =[]} = response || {};
        let formattedList = data.map(ele=>{
            return {
                label: `${ele.firstName} ${ele.lastName}`,
                value: ele._id
            }
        });
        setStudentsList(formattedList);
    };

    const getCoursesList = async () => {   
        let response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/courses/list`
        });
        let { data =[]} = response || {};
        let formattedList = data.map(ele=>{
            return {
                label: `${ele.name}`,
                value: ele._id
            }
        });
        setCoursesList(formattedList);
    };

    const closeAddNewSubscriptionModal = ()=>{
        setShowAddNewSubscriptionModal(false);
    }

    const onClickNewSubscription =()=>{
        setShowAddNewSubscriptionModal(true);
    }

    const buildToolbarItems = () => {
        return (
          <Button color="success" size="sm" onClick={onClickNewSubscription}>
            <i className="add" /> Create
          </Button>
        )
      }

    const columns =[
        {
            dataField:"studentName",
            text:"Student Name"
        },{
            dataField:"courseName",
            text:"Course Name"
        }
    ]

    return (
        <div>
            <div style={{width:"90%", margin:"3%"}}>
            <GridTable data ={subscriptionsData} columns ={columns} toolbarItems ={buildToolbarItems()}/>

            { showAddNewSubscriptionModal &&
            <AddNewSubscription
            closeModal ={closeAddNewSubscriptionModal}
            refreshGrid={getTableContents}
            students ={studentsList}
            courses = {coursesList}
            />}
        </div>
        </div>
    );
}

export default Subscriptions;