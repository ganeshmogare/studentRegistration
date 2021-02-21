import React from 'react';
import { get, remove, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

class TabBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1
        }
    }

    handleSelect = (eventkey) => {
        const { onSelect, tabs } = this.props;

        this.setState({ selectedTab: eventkey }, () => {
            onSelect && onSelect(eventkey, tabs);
        });
    }

    componentWillMount = () => {
        const { defaultTab } = this.props;
        const { selectedTab } = this.state;

        defaultTab ? this.handleSelect(defaultTab) : this.handleSelect(selectedTab);
    }

    render() {
        let { tabs } = this.props;
        const { selectedTab } = this.state;

        //Removing hidden tabs
        remove(tabs, t => get(t, 'hidden') || isEmpty(t));

        return (
            <>
                <Nav tabs>
                    {tabs.map((tab, idx) => (
                        <NavItem key={idx}>
                            <NavLink
                                active={selectedTab === idx + 1}
                                onClick={() => { this.handleSelect(idx + 1); }}
                                disabled={get(tab, 'disabled', false)}
                            >
                                {tab.icon && <i className={tab.icon}></i>}
                                {' '}
                                {tab.title}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <TabContent activeTab={selectedTab} id="react-tabs">
                    {tabs.map((tab, idx) => (
                        (selectedTab === idx + 1) && <TabPane tabId={idx + 1} key={idx}>
                            {tab.component}
                        </TabPane>
                    ))}
                </TabContent>
            </>
        )
    }
}

TabBuilder.propTypes = {
    tabs: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    defaultTab: PropTypes.number
}

export default TabBuilder;
