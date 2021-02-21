import React, { useState, useEffect } from "react";
import { Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import TabBuilder from "./TabBuilder";
import Reports from "./reports/Reports";
import Students from "./students/Students";
import Courses from "./courses/Courses";
import Subscriptions from "./subscriptions/Subscriptions";

const ContainerComponent = props => {
    const [type, setViewType] = useState("students");
    const [currentTab , setCurrentTab ]= useState("students");

    const handleTabOnSelect = (selectedTab) => {
        if (selectedTab === currentTab) return;
        setCurrentTab(selectedTab)
    }

    let tabs = [];
    tabs.push({
        title: 'Reports',
        component: <Reports />
    },
    {
        title: 'Students',
        component: <Students />
    },
    {
        title: 'Courses',
        component: <Courses />
    },{
        title: 'Subscriptions',
        component: <Subscriptions />
    }
    );

    return (<div>
            <TabBuilder
                tabs={tabs}
                onSelect={handleTabOnSelect}
            />
    </div>)
};

export default ContainerComponent;