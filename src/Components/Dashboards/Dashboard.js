import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCirclePlus, faBell, faUser, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationContext from '../../Context/AuthContext';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { primaryColour } from '../Constants/styles';
import dashboardActive from '../../Images/Dashboard Active state.svg'
import dashboardInactive from '../../Images/Dashboard icon inactive.svg'
import pinnedActive from '../../Images/Pin icon_Active.svg'
import pinnedInactive from '../../Images/Pin icon.svg'
import tasksActive from '../../Images/My tasks_Active.svg'
import tasksInactive from '../../Images/My tasks.svg'
import budgetsActive from '../../Images/Budget_Active.svg'
import budgetsInactive from '../../Images/Budget.svg'
import calendarActive from '../../Images/Calendar_Active.svg'
import calendarInactive from '../../Images/Calendar.svg'
import celebrationActive from '../../Images/Celebrations_Active.svg'
import celebrationInactive from '../../Images/Celebrations.svg'
import companiesActive from '../../Images/Companies_Active.svg'
import companiesInactive from '../../Images/Companies.svg'
import contactsActive from '../../Images/Contacts_Active.svg'
import contactsInactive from '../../Images/Contacts.svg'
import employeeActive from '../../Images/Employee_Active.svg'
import employeeInactive from '../../Images/Employee.svg'
import expenseActive from '../../Images/Expense_Active.svg'
import expenseInactive from '../../Images/Expense.svg'
import projectsActive from '../../Images/Projects_Active.svg'
import projectsInactive from '../../Images/Projects.svg'
import proposalsActive from '../../Images/Proposals_Active.svg'
import proposalsInactive from '../../Images/Proposals.svg'
import rfpActive from '../../Images/RFP_Active.svg'
import rfpInactive from '../../Images/RFP.svg'
import AdminDash from '../AdminDash/AdminDash';
import BudgetCities from '../Update/BudgetCities';
import RFPUpdate from '../Update/RFPUpdate';
import ProposalsUpdate from '../Update/ProposalsUpdate';
import ProjectUpdate from '../Update/ProjectUpdate';
import EmployeeUpdate from '../Update/EmployeeUpdate';
import ExpenseUpdate from '../Update/ExpenseUpdate';
import CompanyUpdate from '../Update/CompanyUpdate';
import CustomerUpdate from '../Update/CustomerUpdate';
import Home from './Home';

const mystyles = {
    topNavbar: {
        height: "56px",
        left: "0px",
        top: "0px",
        backgroundColor: "#FAFBFB",
        zIndex: "-1"
    },
    plusIcon: {
        height: "32px",
    },
    settingsIcon: {
        height: "20px"
    },
    accountLabel: {
        width: "154px",
        height: "32px",
        background: "#F3F5F9",
        borderRadius: "60px"
    },
    accLabel: {
        width: "41px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        color: "#0A0A0A",
        opacity: 0.7,
        margin: "0px",
        marginLeft: "8px"
    },
    sidebar: {
        boxSizing: "border-box",
        width: "228px",
        height: "100vh",
        left: "0px",
        top: "0px",
        background: "#FBFBFB",
        borderRight: "1px solid #EBE9F1",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "fixed"
    },
    branding: {
        width: "101px",
        height: "26px",
        marginLeft: "68px",
        marginTop: "15px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: "18px",
        lineHeight: "26px",
        color: "#000000"
    },
    sidebarMenu: {
        padding: "8px 20px",
        gap: "10px"
    },
    sidebarMenuItemActive: {
        width: "204px",
        height: "40px",
        background: "#6519E1",
        boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer"
    },
    sidebarMenuItemIconActive: {
        width: "24px",
        height: "24px",
        marginLeft: "20px",
        color: "#FBFBFB",
        borderRadius: "100%",
        textAlign: "center"
    },
    sidebarMenuItemTextActive: {
        height: "20px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        margin: "0px",
        marginLeft: "12px",
        color: "#FBFBFB"
    },
    sidebarMenuItem: {
        width: "204px",
        height: "40px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer"
    },
    sidebarMenuItemIcon: {
        width: "24px",
        height: "24px",
        marginLeft: "20px",
        background: "#FBFBFB",
        borderRadius: "100%",
        textAlign: "center",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)"
    },
    sidebarMenuItemText: {
        height: "20px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        margin: "0px",
        marginLeft: "12px",
        color: "#0A0A0A"
    }
}

const Dashboard = () => {
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();
    const [nav, setnav] = useState(0);
    const [city, setcity] = useState({});
    const [project, setproject] = useState({});

    const { privileges, setPrivileges } = useContext(AuthenticationContext)

    const handleDash = (e) => {
        if(nav===0) return <Home />
        if(nav===1) return <></>
        if(nav===2) return <></>
        if(nav===3) return <BudgetCities />
        if(nav===4) return <RFPUpdate />
        if(nav===5) return <ProposalsUpdate />
        if(nav===6) return <ProjectUpdate />
        if(nav===7) return <EmployeeUpdate />
        if(nav===8) return <></>
        if(nav===9) return <ExpenseUpdate />
        if(nav===10) return <CompanyUpdate />
        if(nav===11) return <CustomerUpdate />
        if(nav===12) return <></>
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div>
                <Navbar className='d-flex justify-content-end' style={mystyles.topNavbar}>
                    <Nav.Link className='p-3'><FontAwesomeIcon icon={faCirclePlus} color={primaryColour} style={mystyles.plusIcon} /></Nav.Link>
                    <NavDropdown title={<FontAwesomeIcon icon={faGear} style={mystyles.settingsIcon} />} id="collasible-nav-dropdown" className='p-2' align="end">
                        <NavDropdown.Item onClick={(e) => {
                            e.preventDefault();
                            setnav(12);
                        }}>Privileges</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => {
                            navigate("/");
                            localStorage.clear();
                        }}>
                            Log Out
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link className='p-3'><FontAwesomeIcon icon={faBell} style={mystyles.settingsIcon} /></Nav.Link>
                    <Nav.Link className='p-3'>
                        <div style={mystyles.accountLabel} className='d-flex flex-row align-items-center'>
                            <FontAwesomeIcon icon={faCircleUser} style={mystyles.plusIcon} />
                            <p style={mystyles.accLabel}>{localStorage.getItem('department')}</p>
                        </div>

                    </Nav.Link>
                </Navbar>
            </div>
            <div style={{ display: 'flex', height: '100%', overflowY: "none" }}>
                <Sidebar style={mystyles.sidebar} className='d-flex flex-column'>
                    <p style={mystyles.branding}>TASKFORCE</p>
                    <div style={mystyles.sidebarMenu}>
                        <div style={nav === 0 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(0)}>
                            <div style={nav === 0 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 0 ? dashboardActive : dashboardInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 0 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Dashboard</p>
                        </div>
                        <div style={nav === 1 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(1)}>
                            <div style={nav === 1 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 1 ? pinnedActive : pinnedInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 1 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Pinned</p>
                        </div>
                        <div style={nav === 2 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(2)}>
                            <div style={nav === 2 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 2 ? tasksActive : tasksInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 2 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Tasks List</p>
                        </div>
                        <div style={nav === 3 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(3)}>
                            <div style={nav === 3 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 3 ? budgetsActive : budgetsInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 3 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Budgets</p>
                        </div>
                        <div style={nav === 4 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(4)}>
                            <div style={nav === 4 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 4 ? rfpActive : rfpInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 4 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>RFPs</p>
                        </div>
                        <div style={nav === 5 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(5)}>
                            <div style={nav === 5 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 5 ? proposalsActive : proposalsInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 5 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Proposals</p>
                        </div>
                        <div style={nav === 6 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(6)}>
                            <div style={nav === 6 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 6 ? projectsActive : projectsInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 6 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Projects</p>
                        </div>
                        <div style={nav === 7 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(7)}>
                            <div style={nav === 7 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 7 ? employeeActive : employeeInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 7 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Employees</p>
                        </div>
                        <div style={nav === 8 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(8)}>
                            <div style={nav === 8 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 8 ? calendarActive : calendarInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 8 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Calendar</p>
                        </div>
                        <div style={nav === 9 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(9)}>
                            <div style={nav === 9 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 9 ? expenseActive : expenseInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 9 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Expenses</p>
                        </div>
                        <div style={nav === 10 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(10)}>
                            <div style={nav === 10 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 10 ? companiesActive : companiesInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 10 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Companies</p>
                        </div>
                        <div style={nav === 11 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(11)}>
                            <div style={nav === 11 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 11 ? contactsActive : contactsInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 11 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Contacts</p>
                        </div>
                        <div style={nav === 12 ? mystyles.sidebarMenuItemActive : mystyles.sidebarMenuItem} onClick={(e) => setnav(12)}>
                            <div style={nav === 12 ? mystyles.sidebarMenuItemIconActive : mystyles.sidebarMenuItemIcon}><img src={nav === 12 ? celebrationActive : celebrationInactive} alt="Dashboard Icon" /></div>
                            <p style={nav === 12 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText}>Celebrations</p>
                        </div>
                    </div>
                </Sidebar>
                <div style={{marginLeft: '250px', width: "100%", backgroundColor: "#F8FAFB"}}>
                    {handleDash()}
                </div>
            </div>
        </>
    )
}

export default Dashboard