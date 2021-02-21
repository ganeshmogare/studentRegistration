import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

import GridTable from "../GridTable";

const Reports = props => {
    const [subscriptionsData, setSubscriptionsData] = useState([]);

    useEffect(() => {
        getTableContents();
    }, []);

    const getTableContents = async () => {   
        let response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/subscriptions/list`
        });
        console.log(response);
        setSubscriptionsData(response.data.docs);
    };

    const columns =[
        {
            dataField:"studentName",
            text:"Student Name"
        },{
            dataField:"courseName",
            text:"Course Name"
        },{
            dataField:"createdAt",
            text:"Registrated At",
            formatter:(cell,row)=>{
                return moment(cell).format("DD-MM-YYYY HH:mm A");
            }
        }
    ]

    return (
        <div>
            <div style={{width:"90%", margin:"3%"}}>
            <GridTable data ={subscriptionsData} columns ={columns}/>
        </div>
        </div>
    );
}

export default Reports;