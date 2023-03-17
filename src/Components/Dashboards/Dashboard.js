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
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
import AdminDash from "../AdminDash/AdminDash";
import BudgetCities from "../Update/BudgetCities";
import RFPUpdate from "../Update/RFPUpdate";
import ProposalsUpdate from "../Update/ProposalsUpdate";
import ProjectUpdate from "../Update/ProjectUpdate";
import EmployeeUpdate from "../Update/EmployeeUpdate";
import ExpenseUpdate from "../Update/ExpenseUpdate";
import CompanyUpdate from "../Update/CompanyUpdate";
import CustomerUpdate from "../Update/CustomerUpdate";
import Home from "./Home";
import { HOST, GET_ADMIN_TASKS } from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import RFP from "../v2/RFP";
import TestDemo from "../Calendar";
import Proposal from "../v2/Proposal";
import Employee from "../v2/Employee";



const Dashboard = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const [nav, setnav] = useState(0);
  const [plusDropdown, setplusDropdown] = useState(null);
  const [city, setcity] = useState({});
  const [project, setproject] = useState({});
  const [isCollapsed, setisCollapsed] = useState(false);

  const { privileges, setPrivileges } = useContext(AuthenticationContext);

  const mystyles = {
    topNavbar: {
      height: "56px",
      left: "0px",
      top: "0px",
      backgroundColor: "#FAFBFB",
      borderBottom: "1px solid #EBE9F1",
      width: "100vw",
      marginBottom: "0px"
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
      height: "32px"
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
      background: "#FBFBFB",
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
        marginLeft: "68px",
        marginTop: "15px",
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
        display: nav===0 ? "none" : "",
        visibility: nav===0 ? "hidden" : "visible"
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
        display: nav===0 ? "none" : "",
        visibility: nav===0 ? "hidden" : "visible"
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
    sidebarMenuItem: {
      width: "204px",
      height: "40px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      cursor: "pointer",
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
  };

  const [isLoadingTasks, setisLoadingTasks] = useState(false);
  const [title1, settitle1] = useState([]);
  const [title2, settitle2] = useState([]);
  const [title3, settitle3] = useState([]);

  const [dDate1, setdDate1] = useState([])
  const [dDate2, setdDate2] = useState([])
  const [dDate3, setdDate3] = useState([])

  const [month1, setmonth1] = useState([])
  const [month2, setmonth2] = useState([])
  const [month3, setmonth3] = useState([])
  useEffect(() => {
    setisLoadingTasks(true);
    const call = async () => {
      await axios
        .get(HOST + GET_ADMIN_TASKS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            id: localStorage.getItem("employeeId"),
          },
        })
        .then((res) => {
          settitle1(res.data.res[0].Title)
          settitle2(res.data.res[1].Title)
          settitle3(res.data.res[2].Title)
          const date1 = res.data.res[0].Due_Date;
          const date2 = res.data.res[1].Due_Date;
          const date3 = res.data.res[2].Due_Date;
          const utcDate1 = new Date(date1);
          const utcDate2 = new Date(date2);
          const utcDate3 = new Date(date3);
          const options = { month: "long" };
          setmonth1(utcDate1.toLocaleString("en-US", options))
          setmonth2(utcDate2.toLocaleString("en-US", options))
          setmonth3(utcDate3.toLocaleString("en-US", options))
          setdDate1(utcDate1.getUTCDate());
          setdDate2(utcDate2.getUTCDate());
          setdDate3(utcDate3.getUTCDate());
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoadingTasks(false);
    };
    call();
  }, []);


  const handleDash = (e) => {
    if (nav === 0){
       return <Home isCollapsed={isCollapsed}/>;}
    if (nav === 1) return <></>;
    if (nav === 2) return <></>;
    if (nav === 3) return <BudgetCities />;
    if (nav === 4) return <RFP isCollapsed={isCollapsed}/>
    if (nav === 5) return <Proposal isCollapsed={isCollapsed} />
    if (nav === 6) return <ProjectUpdate />;
    if (nav === 7) return <Employee isCollapsed={isCollapsed}/>;
    if (nav === 8) return <TestDemo />;
    if (nav === 9) return <ExpenseUpdate />;
    if (nav === 10) return <CompanyUpdate />;
    if (nav === 11) return <CustomerUpdate />;
    if (nav === 12) return <></>;
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
            className="p-2 plus-dropdown"
            align="end">
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 0 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(0)} onMouseLeave={() => setplusDropdown(null)}>
              <img
                src={plusDropdown === 0 ? tasksInactive : tasksActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Assign New Task
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 1 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(1)} onMouseLeave={() => setplusDropdown(null)}>
              <img
                src={plusDropdown === 1 ? rfpInactive : rfpActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New RFP
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 2 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(2)} onMouseLeave={() => setplusDropdown(null)}>
              <img
                src={plusDropdown === 2 ? proposalsInactive : proposalsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Proposal
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 3 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(3)} onMouseLeave={() => setplusDropdown(null)}>
              <img
                src={plusDropdown === 3 ? projectsInactive : projectsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Project
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 4 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(4)} onMouseLeave={() => setplusDropdown(null)}>
              <img
                src={plusDropdown === 4 ? employeeInactive : employeeActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Employee
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 5 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={(e) => setplusDropdown(5)} onMouseLeave={(e) => setplusDropdown(null)}>
              <img
                src={plusDropdown === 5 ? contactsInactive : contactsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Contact
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <FontAwesomeIcon icon={faGear} style={mystyles.settingsIcon} />
            }
            id="collasible-nav-dropdown"
            className="p-2"
            align="end"
          >
            <NavDropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setnav(12);
              }}
            >
              Privileges
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                navigate("/");
                localStorage.clear();
              }}
            >
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="p-3">
            <FontAwesomeIcon icon={faBell} style={mystyles.settingsIcon} />
          </Nav.Link>
          <Nav.Link className="p-3">
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
              <p style={mystyles.branding.collapsed}>TF</p>
              <div style={mystyles.sidebarIconContainer.collapsed} className='d-flex justify-content-center align-items-center' onClick={(e) => { setisCollapsed(!isCollapsed); collapseSidebar() }}>
                <FontAwesomeIcon icon={faChevronRight} color={primaryColour} />
              </div>
              <div style={{marginTop: "18px"}}>
                <div
                  style={
                    nav === 0
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => {setnav(0); if(isCollapsed){setisCollapsed(false); collapseSidebar()}}}
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
                <div
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
                </div>
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
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
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
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
              </div>
            </>
            : <>
              <p style={mystyles.branding.nonCollapsed}>TASKFORCE</p>
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
                  onClick={(e) => {setnav(0); if(isCollapsed){setisCollapsed(false); collapseSidebar()}}}
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

                <div
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
                </div>
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
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
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
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
                <div
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
                </div>
              </div>
            </>}
        </Sidebar>
        <div
          style={{
            marginLeft: isCollapsed ? "68px" : "228px",
            backgroundColor: "#F8FAFB",
            height: "93.777777777778vh",
            width: isCollapsed ? "96.278vw" : "88.167vw"
          }}
        >
          {handleDash()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
