import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCirclePlus,
  faBell,
  faUser,
  faCircleUser,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dropdown, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../Context/AuthContext";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import { primaryColour } from "../Constants/styles";
import dashboardActive from "../../Images/Dashboard Active state.svg";
import dashboardInactive from "../../Images/Dashboard icon inactive.svg";
import pinnedActive from "../../Images/Pin icon_Active.svg";
import pinnedInactive from "../../Images/Pin icon.svg";
import tasksActive from "../../Images/My tasks_Active.svg";
import tasksInactive from "../../Images/My tasks.svg";
import budgetsActive from "../../Images/Budget_Active.svg";
import budgetsInactive from "../../Images/Budget.svg";
import calendarActive from "../../Images/Calendar_Active.svg";
import calendarInactive from "../../Images/Calendar.svg";
import celebrationActive from "../../Images/Celebrations_Active.svg";
import celebrationInactive from "../../Images/Celebrations.svg";
import companiesActive from "../../Images/Companies_Active.svg";
import companiesInactive from "../../Images/Companies.svg";
import contactsActive from "../../Images/Contacts_Active.svg";
import contactsInactive from "../../Images/Contacts.svg";
import employeeActive from "../../Images/Employee_Active.svg";
import employeeInactive from "../../Images/Employee.svg";
import expenseActive from "../../Images/Expense_Active.svg";
import expenseInactive from "../../Images/Expense.svg";
import projectsActive from "../../Images/Projects_Active.svg";
import projectsInactive from "../../Images/Projects.svg";
import proposalsActive from "../../Images/Proposals_Active.svg";
import proposalsInactive from "../../Images/Proposals.svg";
import rfpActive from "../../Images/RFP_Active.svg";
import rfpInactive from "../../Images/RFP.svg";
import T from "../../Images/T.svg";
import askforce from "../../Images/ASKFORCE.svg";
import ExpenseUpdate from "../Update/ExpenseUpdate";
import CompanyUpdate from "../Update/CompanyUpdate";
import Home from "./Home";
import RFP from "../v2/RFP";
import TestDemo from "../v2/Calendar.js";
import Proposal from "../v2/Proposal";
import Employee from "../v2/Employee";
import settingsIcon from '../../Images/Settings icon.svg'
import notificationIcon from '../../Images/Notification icon.svg'
import Customers from "../v2/Customers";
import Project from "../v2/Project";
import ProjectDetail from "../Update/ProjectDetail";
import BudgetCities from "../v2/BudgetCities";
import Tasks from "../v2/Tasks";
import AddTask from "../Form/AddTask";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import RFPform from "../Form/RFPform";
import ProposalForm from "../Form/ProposalForm";
import projectForm from '../../Images/projectForm.svg'
import cross from '../../Images/cross.svg'
import ProjectForm from "../Form/ProjectForm";
import Privileges from '../Update/Privileges.js'
import { GET_EMPLOYEE_PRIVILEGES, HOST } from "../Constants/Constants";


const Dashboard = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const [nav, setnav] = useState(0);
  const [plusDropdown, setplusDropdown] = useState(null);
  const [city, setcity] = useState({});
  const [project, setproject] = useState({});
  const [isCollapsed, setisCollapsed] = useState(false);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const [apiCall, setCall] = useState(0);

  const { privileges, setPrivileges } = useContext(AuthenticationContext);

  //Add Task Form Modal
  const [taskShow, settaskShow] = useState(false);
  const handleCloseTask = () => settaskShow(false);
  const handleShowTask = () => settaskShow(true);

  //Add RFP Form Modal
  const [rfpShow, setrfpShow] = useState(false);
  const handleCloseRFP = () => setrfpShow(false);
  const handleShowRFP = () => setrfpShow(true);

  //Add RFP Form Modal
  const [proposalShow, setproposalShow] = useState(false);
  const handleCloseProposal = () => setproposalShow(false);
  const handleShowProposal = () => setproposalShow(true);

  //Add Project Form Modal
  const [projectShow, setprojectShow] = useState(false);
  const handleCloseProject = () => setprojectShow(false);
  const handleShowProject = () => setprojectShow(true);

  const mystyles = {
    topNavbar: {
      height: "56px",
      left: "0px",
      top: "0px",
      backgroundColor: "#FAFBFB",
      borderBottom: "1px solid #EBE9F1",
      width: "100vw",
      marginBottom: "0px",
      gap: "20px"
    },
    plusIcon: {
      height: "32px",
    },
    plusDropdownItem: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      color: "#0A0A0A",
      marginLeft: "0px",
      paddingLeft: "0px",
      width: "224px",
      height: "32px",
      textDecoration: "none !important"
    },
    plusDropdownItemIcon: {
      marginLeft: "10px",
      marginRight: "12px",
    },
    settingsIcon: {
      height: "20px",
    },
    accountLabel: {
      width: "154px",
      height: "32px",
      background: "#F3F5F9",
      borderRadius: "60px",
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
      marginLeft: "8px",
    },
    sidebar: {
      boxSizing: "border-box",
      width: "228px",
      height: "100vh",
      left: "0px",
      top: "0px",
      background: isCollapsed ? "#F5F4F9" : "#FBFBFB",
      borderRight: "1px solid #EBE9F1",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      position: "fixed",
    },
    branding: {
      collapsed: {
        height: "26px",
        width: "68px",
        marginTop: "15px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: "18px",
        lineHeight: "26px",
        color: "#000000",
        textAlign: "center"
      },
      nonCollapsed: {
        height: "26px",
        marginLeft: "32px",
        marginTop: "17px",
        marginBottom: "8px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: "18px",
        lineHeight: "26px",
        color: "#000000",
      },
    },
    sidebarIconContainer: {
      nonCollapsed: {
        boxSizing: "border-box",
        position: "absolute",
        width: "24px",
        height: "24px",
        left: "216px",
        top: "16px",
        background: "#DBDBF4",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        zIndex: "1000",
        cursor: "pointer",
      },
      collapsed: {
        boxSizing: "border-box",
        position: "absolute",
        width: "24px",
        height: "24px",
        left: "56px",
        top: "16px",
        background: "#DBDBF4",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        zIndex: "1000",
        cursor: "pointer",
      }
    },
    sidebarMenu: {
      padding: "8px 12px",
      gap: "10px",
    },
    sidebarMenuItemActive: {
      nonCollapsed: {
        width: "204px",
        height: "40px",
        background: "#6519E1",
        boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      },
      collapsed: {
        padding: "8px 20px",
        gap: "10px",
        width: "66px",
        height: "40px",
        background: "#6519E1",
        boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
        borderRadius: "8px 0px 0px 8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        marginLeft: "2px"
      }
    },
    sidebarMenuItemIconActive: {
      nonCollapsed: {
        width: "24px",
        minWidth: "24px",
        height: "24px",
        marginLeft: "20px",
        background: "#FBFBFB",
        borderRadius: "100%",
        textAlign: "center",
      },
      collapsed: {
        width: "24px",
        minWidth: "24px",
        height: "24px",
        background: "#FBFBFB",
        borderRadius: "100%",
        textAlign: "center",
      }
    },
    sidebarMenuItem: {
      width: "100%",
      height: "40px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      cursor: "pointer",
    },
    sidebarMenuItemTextActive: {
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      margin: "0px",
      marginLeft: "12px",
      color: "#FBFBFB",
    },
    sidebarMenuItemIcon: {
      nonCollapsed: {
        width: "24px",
        height: "24px",
        marginLeft: "20px",
        background: "#FBFBFB",
        borderRadius: "100%",
        textAlign: "center",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
      },
      collapsed: {
        width: "24px",
        height: "24px",
        background: "#FBFBFB",
        borderRadius: "100%",
        textAlign: "center",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
        marginLeft: "22px"
      }
    },
    sidebarMenuItemText: {
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      margin: "0px",
      marginLeft: "12px",
      color: "#0A0A0A",
    },
    addModal: {
      position: "absolute",
      width: "780px",
      height: 'fit-content',
      left: "28vw",
      marginTop: "10vh",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
    },
    addHeading: {
      width: "auto",
      height: "28px",
      marginLeft: "8px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A"
    }
  };

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    axios
      .get(HOST + GET_EMPLOYEE_PRIVILEGES, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          employeeid: localStorage.getItem("employeeId"),
        },
      })
      .then((res) => {
        let arr = [];
        res.data.res.map((e) => {
          arr.push(e.Privilege);
        });
        localStorage.setItem("privileges", JSON.stringify(arr));
        setPrivileges(arr);
      })
      .catch((err) => {
        console.log(err);
      });

    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleDash = (e) => {
    if (nav === 0) { return <Home isCollapsed={isCollapsed} viewportWidth={viewportWidth} setnav={setnav} />; }
    if (nav === 1) return <></>;
    if (nav === 2) return <Tasks isCollapsed={isCollapsed} />;
    if (nav === 3) return <BudgetCities isCollapsed={isCollapsed} />;
    if (nav === 4) return <RFP isCollapsed={isCollapsed} />
    if (nav === 5) return <Proposal isCollapsed={isCollapsed} />
    if (nav === 6) return <Project isCollapsed={isCollapsed} />
    if (nav === 7) return <Employee isCollapsed={isCollapsed} />;
    if (nav === 8) return <TestDemo />;
    if (nav === 9) return <ExpenseUpdate />;
    if (nav === 10) return <CompanyUpdate />;
    if (nav === 11) return <Customers isCollapsed={isCollapsed} />;
    if (nav === 12) return <Privileges />;
    if (nav === 14) return <ProjectDetail setnav={setnav} project={project} />
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <Navbar
          className="d-flex justify-content-end"
          style={mystyles.topNavbar}
        >
          <NavDropdown title={<FontAwesomeIcon
            icon={faCirclePlus}
            color={primaryColour}
            style={mystyles.plusIcon}
          />} id="basic-nav-dropdown"
            className="plus-dropdown"
            align="end">
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 0 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(0)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowTask}>
              <img
                src={plusDropdown === 0 ? tasksInactive : tasksActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Assign New Task
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 1 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(1)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowRFP}>
              <img
                src={plusDropdown === 1 ? rfpInactive : rfpActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New RFP
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 2 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(2)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowProposal}>
              <img
                src={plusDropdown === 2 ? proposalsInactive : proposalsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Proposal
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 3 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(3)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowProject}>
              <img
                src={plusDropdown === 3 ? projectsInactive : projectsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Project
            </NavDropdown.Item>
            {/* <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 4 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(4)} onMouseLeave={() => setplusDropdown(null)}>
              <img
                src={plusDropdown === 4 ? employeeInactive : employeeActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Employee
            </NavDropdown.Item> */}
            {/* <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 5 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={(e) => setplusDropdown(5)} onMouseLeave={(e) => setplusDropdown(null)}>
              <img
                src={plusDropdown === 5 ? contactsInactive : contactsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Contact
            </NavDropdown.Item> */}
          </NavDropdown>
          <NavDropdown
            title={
              <img src={settingsIcon} alt="Settings Icon" />
            }
            id="collasible-nav-dropdown"
            align="end"
          >
            {privileges.includes('View Employee Privileges') ? <><NavDropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setnav(12);
              }}
            >
              Privileges
            </NavDropdown.Item>
              <NavDropdown.Divider /> </> : <></>}
            <NavDropdown.Item
              onClick={() => {
                navigate("/");
                localStorage.clear();
              }}
            >
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
          {/* <Nav.Link className="">
            <img src={notificationIcon} alt="Notification Icon" />
          </Nav.Link> */}
          <Nav.Link className="">
            <div
              style={mystyles.accountLabel}
              className="d-flex flex-row align-items-center"
            >
              <FontAwesomeIcon icon={faCircleUser} style={mystyles.plusIcon} />
              <p style={mystyles.accLabel}>
                {localStorage.getItem("department")}
              </p>
            </div>
          </Nav.Link>
        </Navbar>
      </div>
      <div style={{ display: "flex", height: "100%", overflowY: "none" }}>
        <Sidebar className="d-flex flex-column" rootStyles={mystyles.sidebar} width="228px" collapsedWidth="68px">
          {isCollapsed
            ? <>
              <p style={mystyles.branding.collapsed}><img src={T} /></p>
              <div style={mystyles.sidebarIconContainer.collapsed} className='d-flex justify-content-center align-items-center' onClick={(e) => { setisCollapsed(!isCollapsed); collapseSidebar() }}>
                <FontAwesomeIcon icon={faChevronRight} color={primaryColour} />
              </div>
              <div style={{ marginTop: "18px" }}>
                <div
                  style={
                    nav === 0
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => { setnav(0); }}
                >
                  <div
                    style={
                      nav === 0
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                    className='d-flex justify-content-center align-items-center'
                  >
                    <img
                      src={nav === 0 ? dashboardActive : dashboardInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div>
                {/* <div
                  style={
                    nav === 1
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(1)}
                >
                  <div
                    style={
                      nav === 1
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 1 ? pinnedActive : pinnedInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> */}
                <div
                  style={
                    nav === 2
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(2)}
                >
                  <div
                    style={
                      nav === 2
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 2 ? tasksActive : tasksInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div>
                {privileges.includes('View Budget') ? <div
                  style={
                    nav === 3
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(3)}
                >
                  <div
                    style={
                      nav === 3
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 3 ? budgetsActive : budgetsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                {privileges.includes('View RFP') ? <div
                  style={
                    nav === 4
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(4)}
                >
                  <div
                    style={
                      nav === 4
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 4 ? rfpActive : rfpInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                {privileges.includes('View Proposal') ? <div
                  style={
                    nav === 5
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(5)}
                >
                  <div
                    style={
                      nav === 5
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 5 ? proposalsActive : proposalsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                {privileges.includes('View Project') ? <div
                  style={
                    nav === 6
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(6)}
                >
                  <div
                    style={
                      nav === 6
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 6 ? projectsActive : projectsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                {privileges.includes('View Employee') ? <div
                  style={
                    nav === 7
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(7)}
                >
                  <div
                    style={
                      nav === 7
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 7 ? employeeActive : employeeInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                <div
                  style={
                    nav === 8
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(8)}
                >
                  <div
                    style={
                      nav === 8
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 8 ? calendarActive : calendarInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div>
                {/* <div
                  style={
                    nav === 9
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(9)}
                >
                  <div
                    style={
                      nav === 9
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 9 ? expenseActive : expenseInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> */}
                {privileges.includes('View Companies') ? <div
                  style={
                    nav === 10
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(10)}
                >
                  <div
                    style={
                      nav === 10
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 10 ? companiesActive : companiesInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                {privileges.includes('View Contacts') ? <div
                  style={
                    nav === 11
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(11)}
                >
                  <div
                    style={
                      nav === 11
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 11 ? contactsActive : contactsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                {/* <div
                  style={
                    nav === 12
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(12)}
                >
                  <div
                    style={
                      nav === 12
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 12 ? celebrationActive : celebrationInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> */}
              </div>
            </>
            : <>
              <p style={mystyles.branding.nonCollapsed}><img style={{ zIndex: 1 }} src={T} /><img style={{ position: 'absolute', zIndex: 2, marginTop: '10px', marginLeft: '-11px' }} src={askforce} /></p>
              <div style={mystyles.sidebarIconContainer.nonCollapsed} className='d-flex justify-content-center align-items-center' onClick={(e) => { setisCollapsed(!isCollapsed); collapseSidebar() }}>
                <FontAwesomeIcon icon={faChevronLeft} color={primaryColour} />
              </div>
              <div style={mystyles.sidebarMenu}>
                <div
                  style={
                    nav === 0
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => { setnav(0); }}
                >
                  <div
                    style={
                      nav === 0
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                    className='d-flex justify-content-center align-items-center'
                  >
                    <img
                      src={nav === 0 ? dashboardActive : dashboardInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 0
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Dashboard
                  </p>
                </div>

                {/* <div
                  style={
                    nav === 1
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(1)}
                >
                  <div
                    style={
                      nav === 1
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 1 ? pinnedActive : pinnedInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 1
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Pinned
                  </p>
                </div> */}
                <div
                  style={
                    nav === 2
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(2)}
                >
                  <div
                    style={
                      nav === 2
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 2 ? tasksActive : tasksInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 2
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Tasks List
                  </p>
                </div>
                {privileges.includes('View Budget') ? <div
                  style={
                    nav === 3
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(3)}
                >
                  <div
                    style={
                      nav === 3
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 3 ? budgetsActive : budgetsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 3
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Budgets
                  </p>
                </div> : <></>}
                {privileges.includes('View RFP') ? <div
                  style={
                    nav === 4
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(4)}
                >
                  <div
                    style={
                      nav === 4
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 4 ? rfpActive : rfpInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 4
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    RFPs
                  </p>
                </div> : <></>}
                {privileges.includes('View Proposal') ? <div
                  style={
                    nav === 5
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(5)}
                >
                  <div
                    style={
                      nav === 5
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 5 ? proposalsActive : proposalsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 5
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Proposals
                  </p>
                </div> : <></>}
                {privileges.includes('View Project') ? <div
                  style={
                    nav === 6
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(6)}
                >
                  <div
                    style={
                      nav === 6
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 6 ? projectsActive : projectsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 6
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Projects
                  </p>
                </div> : <></>}
                {privileges.includes('View Employee') ? <div
                  style={
                    nav === 7
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(7)}
                >
                  <div
                    style={
                      nav === 7
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 7 ? employeeActive : employeeInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 7
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Employees
                  </p>
                </div> : <></>}
                <div
                  style={
                    nav === 8
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(8)}
                >
                  <div
                    style={
                      nav === 8
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 8 ? calendarActive : calendarInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 8
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Calendar
                  </p>
                </div>
                {/* <div
                  style={
                    nav === 9
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(9)}
                >
                  <div
                    style={
                      nav === 9
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 9 ? expenseActive : expenseInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 9
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Expenses
                  </p>
                </div> */}
                {privileges.includes('View Companies') ? <div
                  style={
                    nav === 10
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(10)}
                >
                  <div
                    style={
                      nav === 10
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 10 ? companiesActive : companiesInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 10
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Companies
                  </p>
                </div> : <></>}
                {privileges.includes('View Contacts') ? <div
                  style={
                    nav === 11
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(11)}
                >
                  <div
                    style={
                      nav === 11
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 11 ? contactsActive : contactsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 11
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Contacts
                  </p>
                </div> : <></>}
                {/* <div
                  style={
                    nav === 12
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(12)}
                >
                  <div
                    style={
                      nav === 12
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 12 ? celebrationActive : celebrationInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 12
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Celebrations
                  </p>
                </div> */}
              </div>
            </>}
        </Sidebar>
        <div
          style={{
            marginLeft: isCollapsed ? "68px" : "228px",
            backgroundColor: "#F8FAFB",
            height: `${window.innerHeight - 56}px`,
            width: isCollapsed ? `${viewportWidth - 68}px` : `${viewportWidth - 228}px`
          }}
        >
          {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
          {red === true ? <RedAlert setRed={setred} /> : <></>}
          {handleDash()}
        </div>
      </div>

      {/* Add Task Form Modal */}
      <Modal
        show={taskShow}
        onHide={handleCloseTask}
        backdrop="static"
        centered
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <AddTask
              setRed={setred}
              setGreen={setgreen}
              closeModal={handleCloseTask}
              api={apiCall}
              apiCall={setCall}
            />
          }
        </Modal.Body>
      </Modal>

      {/* Add RFP Form Modal */}
      <Modal
        show={rfpShow}
        onHide={handleCloseRFP}
        backdrop="static"
        centered
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add RFP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <RFPform
              setRed={setred}
              setGreen={setgreen}
              closeModal={handleCloseRFP}
              api={apiCall}
              apiCall={setCall}
            />
          }
        </Modal.Body>
      </Modal>

      {/* Add Proposal Form Modal */}
      <Modal
        show={proposalShow}
        onHide={handleCloseProposal}
        backdrop="static"
        centered
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <ProposalForm
              setRed={setred}
              setGreen={setgreen}
              closeModal={handleCloseProposal}
              api={apiCall}
              apiCall={setCall}
            />
          }
        </Modal.Body>
      </Modal>

      {/* Add Project Form Modal */}
      <Modal
        show={projectShow}
        onHide={handleCloseProject}
        backdrop="static"
        style={mystyles.addModal}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div className='d-flex flex-row justify-content-between align-items-center' style={{ marginTop: '22px', marginLeft: '20px', display: 'flex', flexDirection: 'row' }}>
          <div className='d-flex flex-row'>
            <img src={projectForm} />
            <div style={mystyles.addHeading}>Creating new project</div>
          </div>
          <div><img onClick={handleCloseProject} style={{ marginRight: '25px', float: 'right' }} src={cross} /></div>
        </div>
        {
          <ProjectForm
            setRed={setred}
            setGreen={setgreen}
            closeModal={handleClose}
            api={apiCall}
            apiCall={setCall}
          />
        }

      </Modal>
    </>
  );
};

export default Dashboard;
