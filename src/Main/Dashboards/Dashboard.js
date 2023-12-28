import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCirclePlus,
  faBell,
  faUser,
  faCircleUser,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import {  Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../Context/AuthContext";
import tIcon from '../../Images/taskIcon.svg'
import { Sidebar, useProSidebar } from "react-pro-sidebar";
import campaignActive from "../../Images/campaign-active.svg"
import campaignInactive from "../../Images/campaign-inactive.svg"
import dashboardActive from "../../Images/Dashboard Active state.svg";
import dashboardInactive from "../../Images/Dashboard icon inactive.svg";
import tasksActive from "../../Images/My tasks_Active.svg";
import tasksInactive from "../../Images/My tasks.svg";
import budgetsActive from "../../Images/Budget_Active.svg";
import budgetsInactive from "../../Images/Budget.svg";
import calendarActive from "../../Images/Calendar_Active.svg";
import calendarInactive from "../../Images/Calendar.svg";
import companiesActive from "../../Images/Companies_Active.svg";
import companiesInactive from "../../Images/Companies.svg";
import contactsActive from "../../Images/Contacts_Active.svg";
import contactsInactive from "../../Images/Contacts.svg";
import employeeActive from "../../Images/Employee_Active.svg";
import employeeInactive from "../../Images/Employee.svg";
import projectsActive from "../../Images/Projects_Active.svg";
import projectsInactive from "../../Images/Projects.svg";
import proposalsActive from "../../Images/Proposals_Active.svg";
import proposalsInactive from "../../Images/Proposals.svg";
import rfpActive from "../../Images/RFP_Active.svg";
import rfpInactive from "../../Images/RFP.svg";
import T from "../../Images/T.svg";
import dp from "../../Images/noprofile.jpeg";
import askforce from "../../Images/ASKFORCE.svg";
import account from "../../Images/accountSettings.svg";
import team from "../../Images/teamManagement.svg";
import adminSettings from "../../Images/adminSettings.svg";
import logout from "../../Images/logout.svg";
import CompanyUpdate from "../Update/CompanyUpdate";
import Home from "./Home";
import RFP from "../../pages/rfps/Index.tsx";
import TestDemo from "../../pages/calendar/index";
// import Proposal from "../../pages/proposals/index";
import Employee from "../../pages/employee/index";
import notificationIcon from '../../Images/Notification icon.svg'
import Customers from "../../pages/customers/index";
import Project from "../../pages/projects/Index.tsx";
import Proposal from "../../pages/proposal/Index.tsx";
import Finance from "../../pages/finance/Index.tsx";
import BudgetCities from "../../pages/budgetCities/Index";
import Tasks from "../../pages/tasks/index";
import AddTask from "../../pages/tasks/forms/AddTask";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import RFPform from "../../pages/rfps/forms/AddRfp.tsx";
import ProposalForm from "../../pages/proposals/forms/ProposalForm";
import projectForm from '../../Images/projectForm.svg'
import cross from '../../Images/cross.svg'
import announcement from '../../Images/announcement.svg'
import Privileges from '../Update/Privileges.js'
import { GET_CELEBRATIONS, GET_EMPLOYEE_PRIVILEGES, GET_NOTIFICATIONS, HOST, PRIMARY_COLOR } from "../Constants/Constants";
import PMSelector from "../../pages/pmSelector/index";
import Notifications from "./Notifications";
import AddCity from "../Form/AddCity";
import AddDepartment from "../Form/AddDepartment";
import AddCategory from "../Form/AddCategory";
import Profile from "../../pages/profile/index";
import Announcements from "../../pages/announcements/index";
import AddBudgetCity from "../Form/AddBudgetCity";
import TTMMain from "../../pages/proposals/ttm/TTMMain";
import CampaignRoot from "../v3/campaign/CampaignRoot";
import { useDispatch } from "react-redux";
import { initPrivileges } from "../../redux/slices/privilegeSlice";
import AllOrganisations from "../v3/Contacts/Index/AllOrganisations.tsx";
import People from "../v3/Contacts/Index/People.tsx";
import ContactPerson from "../v3/Contacts/Pages/ContactPerson.tsx";
import CompanyPage from "../v3/Contacts/Pages/CompanyPage.tsx";
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

  const [contactPersonData, setContactPersonData] = useState({});
  const [organizationData, setOrganizationData] = useState({});
  const { privileges, setPrivileges } = useContext(AuthenticationContext);

  //Add Task Form Modal
  const [taskShow, settaskShow] = useState(false);
  const handleCloseTask = () => settaskShow(false);
  const handleShowTask = () => settaskShow(true);

  //Add RFP Form Modal
  const [rfpShow, setrfpShow] = useState(false);
  const handleCloseRFP = () => setrfpShow(false);
  const handleShowRFP = () => setrfpShow(true);

  //Add Proposal Form Modal
  const [proposalShow, setproposalShow] = useState(false);
  const handleCloseProposal = () => setproposalShow(false);
  const handleShowProposal = () => setproposalShow(true);

  //Add Project Form Modal
  const [projectShow, setprojectShow] = useState(false);
  const handleCloseProject = () => setprojectShow(false);
  const handleShowProject = () => setprojectShow(true);

  const [showProfile, setshowProfile] = useState(false);
  const handleCloseProfile = () => setshowProfile(false);
  const handleShowProfile = () => setshowProfile(true);

  const [notifShow, setnotifShow] = useState(false);
  const handleCloseNotif = () => setnotifShow(false);
  const handleShowNotif = () => setnotifShow(true);

  const [showCityForm, setShowCityForm] = useState(false);
  const handleCloseCityForm = () => setShowCityForm(false);
  const handleShowCityForm = () => setShowCityForm(true);

  const [showDeptForm, setShowDeptForm] = useState(false);
  const handleCloseDeptForm = () => setShowDeptForm(false);
  const handleShowDeptForm = () => setShowDeptForm(true);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const handleCloseCategoryForm = () => setShowCategoryForm(false);
  const handleShowCategoryForm = () => setShowCategoryForm(true);

   //Add budget city Modal
   const [cityform, setcityform] = useState(false);
   const handleclosecityform = () => setcityform(false);
   const handleopencityform = () => setcityform(true);

  const mystyles = {
    topBarHeading: {
      color: "var(--Dark-grey, #70757A)",
      fontFamily: "Roboto",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "24px"
    },
    topNavbar: {
      height: "56px",
      left: "0px",
      top: "0px",
      position: 'fixed',
      backgroundColor: "#FAFBFB",
      borderBottom: "1px solid #EBE9F1",
      width: "100vw",
      marginBottom: "0px",
      gap: "20px"
    },
    buttonText: {
      height: "14px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: "#0A0A0A",
      opacity: 0.7,
      marginTop:'4px'
    },
    seperator: {
      // position: "absolute",
      marginTop:'12px',
      width: "14vw",
      height: "0px",
      left: "12px",
      top: "66px",
      border: "1px solid #EBE9F1"
    },
    name:{
      height: "14px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: "#0A0A0A",
      opacity: 0.7,
      marginBottom:'4px'
    },
    email: {
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      opacity: 0.75
    },
    header:{
      display: 'flex',
      flexDirection:'row'
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
      // width: "41px",
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
    notifModal: {
      position: "absolute",
      width: "25vw",
      height: "90vh",
      left: "75vw",
      top: "56px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
      borderRadius: "24px 0px 0px 24px"
    },
    sidebarMenu: {
      padding: "8px 12px",
      gap: "10px",
    },
    sidebarMenuItemActive: {
      nonCollapsed: {
        width: "204px",
        height: "40px",
        background: PRIMARY_COLOR,
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
        background: PRIMARY_COLOR,
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
    ,dpModal: {
      position: "absolute",
      width: "15.69vw",
      height: 'fit-content',
      left: "83vw",
      right: "1vw",
      marginTop: "6.8vh",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
    },
    wishmodal:{
       backgroundColor:"rgba(215, 216, 254)",
       width: "100% !important",
       height: "100% !important",
    },
    crossbtn:{
      width: "44px",
      height: "44px", 
      position: "fixed",
      top: "-75px",
      right: "-300px",
    }
  };

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [notifCounts, setnotifCounts] = useState(0);
  const [wish, setwish] = useState();
  const [showwish, setshowwish] = useState();
  const dispatch = useDispatch();

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
        dispatch(initPrivileges(arr));
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(HOST + GET_NOTIFICATIONS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
              id: localStorage.getItem("employeeId"),
        },
      })
      .then((res) => {
        setnotifCounts(res.data.res.Items.length)
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
    useEffect(() => {
      const getuserdata = async() => {   
     await axios.get(HOST + GET_CELEBRATIONS, {
          headers: {
             auth: "Rose " + localStorage.getItem("auth"),
             filter: JSON.stringify({}),
             sort: [], 
          },
        })
        .then((res) => {
                let empdata={}
                let id= +localStorage.getItem('employeeId')
                empdata=res.data.res
               empdata=res.data.res.filter(each=> each.Employee_ID===id)
                let bday=new Date(empdata[0].Birthday)
                let anniversary=new Date(empdata[0].Joining_Date)
                if(new Date().getMonth()===2 && new Date().getDate()===1)
                setshowwish(true);
                if(bday.getMonth()===new Date().getMonth() && bday.getDate()===new Date().getDate()){
                  setwish("Birthday")
                  setshowwish(true)
                }
              if(anniversary.getMonth()===new Date().getMonth() && anniversary.getDate()===new Date().getDate()){
              setwish("Work Anniversary")
              setshowwish(true)
             }
              }).catch((err) => {
                  console.log("error"+err);
                });
              }
              getuserdata()
            },[]) 

  const handleDash = (e) => {
    if (nav === 0) { return <Home isCollapsed={isCollapsed} viewportWidth={viewportWidth} setnav={setnav} />; }
    if (nav === 1) return <></>;
    if (nav === 2) return <Tasks isCollapsed={isCollapsed} />;
    if (nav === 3) return <BudgetCities isCollapsed={isCollapsed} />;
    if (nav === 4) return <RFP isCollapsed={isCollapsed} />
    if (nav === 17) return <Proposal isCollapsed={isCollapsed} setnav={setnav}/>
    if (nav === 5) return <PMSelector isCollapsed={isCollapsed} />
    if (nav === 6) return <Project isCollapsed={isCollapsed} setnav={setnav}/>
    // if (nav === 7) return <Proposal isCollapsed={isCollapsed} />;
    if (nav === 7) return <Employee isCollapsed={isCollapsed} />;
    if (nav === 8) return <TestDemo />;
    // if (nav === 9) return <ExpenseUpdate />;
    if (nav === 10) return <CompanyUpdate />;
    if (nav === 11) return <Customers isCollapsed={isCollapsed} />;
    if (nav === 12) return <Privileges />;
    if (nav === 15) return <Profile  isCollapsed={isCollapsed}/>
    if (nav === 16) return <Announcements  isCollapsed={isCollapsed}/>
    if (nav === 18) return <TTMMain isCollapsed={isCollapsed}/>
    if(nav === 19)return <CampaignRoot isCollapsed={isCollapsed} />
    if(nav === 20) return <AllOrganisations isCollapsed={isCollapsed} setnav={setnav} setOrganizationData={setOrganizationData}/>
    if(nav === 21) return <People isCollapsed={isCollapsed} setnav={setnav}  setContactPersonData={setContactPersonData}/>
    if(nav === 22) return <ContactPerson isCollapsed={isCollapsed} contactPersonData={contactPersonData} setnav={setnav}/>
    if(nav === 23) return <CompanyPage isCollapsed={isCollapsed} organizationData={organizationData} setnav={setnav} setContactPersonData={setContactPersonData}/>
    if(nav === 24) return <Finance variant="AR" />
    if(nav === 25) return <Finance variant="AP" />
  };

  const [prop, setprop] = useState(false)
  const [prop2, setprop2] = useState(false)
  const [prop3, setprop3] = useState(false)
  const[checkwish,setcheckwish] = useState(false)
  const currentdate= new Date()

    useEffect(()=>{
       if(checkwish===false){
         let stored=localStorage.getItem('lastshown')
        let storeddate=new Date(stored)
         if(storeddate!==null) localStorage.setItem('lastshown',currentdate)
       if(storeddate.getDate()!==currentdate.getDate() && storeddate.getMonth()!==currentdate.getMonth())
      localStorage.setItem('lastshown',currentdate)
      setcheckwish(true);
       }
     },[])

   return (
    <>
      <div>
        <Navbar
          className="d-flex justify-content-end"
          style={mystyles.topNavbar}
        >
          {nav===4?<div style={{...mystyles.topBarHeading, marginRight: isCollapsed?'71vw':'60vw'}}>RFP's</div>:<></>}
          <NavDropdown title={<FontAwesomeIcon
            icon={faCirclePlus}
            color={PRIMARY_COLOR}
            style={mystyles.plusIcon}
          />} id="basic-nav-dropdown"
            className="plus-dropdown"
            align="end"
            >
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
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 4 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(4)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowDeptForm}>
              <img
                src={plusDropdown === 4 ? projectsInactive : projectsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Department
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 5 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(5)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowCategoryForm}>
              <img
                src={plusDropdown === 5 ? projectsInactive : projectsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add Project Category
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 6 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(6)} onMouseLeave={() => setplusDropdown(null)} onClick={handleShowCityForm}>
              <img
                src={plusDropdown === 6 ? projectsInactive : projectsActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New City
            </NavDropdown.Item>
            <NavDropdown.Item classname='nav-dropdown' style={{ ...mystyles.plusDropdownItem, backgroundColor: plusDropdown === 7 ? "rgba(101, 25, 225, 0.1)" : "#FFFFFF" }} onMouseEnter={() => setplusDropdown(7)} onMouseLeave={() => setplusDropdown(null)} onClick={handleopencityform}>
              <img
                src={plusDropdown === 7 ? employeeInactive : employeeActive}
                alt="Dashboard Icon"
                style={mystyles.plusDropdownItemIcon}
              />
              Add New Budget City
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="" onClick={handleShowNotif} style={{position:'relative', display:'inline-block'}}>
            <img src={notificationIcon} alt="Notification Icon" />
            {notifCounts!==0?<span style={{backgroundColor:'#F67052', color:'white', borderRadius:'50px', width:'16px',heigth:'16px', fontSize:'11px', textAlign:'center', position:'absolute', top:'-3px', right:'1px'}}>{notifCounts}</span>:<></>}
          </Nav.Link>
          <Modal
            show={notifShow}
            onHide={handleCloseNotif}
            style={mystyles.notifModal}
            dialogClassName="filter-dialog"
            backdropClassName="filter-backdrop"
            animation={false}
          >
            <div style={{paddingBottom:'24px', marginTop:'24px'}}>

            <Notifications setnav={setnav}/> 
            </div>
          </Modal>
          <Nav.Link onClick={handleShowProfile}>
            <div
              style={mystyles.accountLabel}
              className="d-flex flex-row align-items-center"
            >
              <FontAwesomeIcon icon={faCircleUser} style={mystyles.plusIcon} />
              <p style={mystyles.accLabel}>
                {localStorage.getItem("employeeName")}
              </p>
            </div>
          </Nav.Link>
          <Modal
          show={showProfile}
          onHide={handleCloseProfile}
          backdropClassName="filter-backdrop"
          style={mystyles.dpModal}
          dialogClassName="filter-dialog"
          animation={false}
          >
            <div style={{padding:'12px', width:'15.69vw'}}>
              <div style={mystyles.header}>
                <img src={dp} width={42} height={42} style={{marginRight:'8px'}} />
                <div style={{flexDirection:'column', marginTop:'4px'}}>
                    <div style={mystyles.name}>{localStorage.getItem('employeeName')}</div>
                    <div style={mystyles.email}>{localStorage.getItem('emailWork')}</div>
                </div>
              </div>
              <div style={mystyles.seperator}></div>
              <div onClick={(e) => { setnav(15); handleCloseProfile() }} style={{display:'flex', flexDirection:'row', marginTop:'16px', cursor:'pointer'}}>
                    <img src={account} width={22} height={22} style={{marginRight:'10px'}}/>
                    <div style={mystyles.buttonText}>Account Settings</div>
              </div>
              {privileges.includes('View Employee Privileges')?<div onClick={(e) => {e.preventDefault();setnav(12);}} style={{display:'flex', flexDirection:'row', marginTop:'16px', cursor:'pointer'}}>
                    <img src={team} width={22} height={22} style={{marginRight:'10px'}}/>
                    <div style={mystyles.buttonText}>Team Management</div>
              </div>:<></>}
              {localStorage.getItem('department')==='Admin'?<div style={{display:'flex', flexDirection:'row', marginTop:'16px', cursor:'pointer'}}>
                    <img src={adminSettings} width={22} height={22} style={{marginRight:'10px'}}/>
                    <div style={mystyles.buttonText}>Admin Settings</div>
              </div>:<></>}
              <div style={{...mystyles.seperator, marginTop:'15px'}}></div>
              <div onClick={() => {navigate("/");localStorage.clear();}} style={{display:'flex', flexDirection:'row', marginTop:'16px', cursor:'pointer'}}>
                    <img src={logout} width={22} height={22} style={{marginRight:'10px'}}/>
                    <div style={mystyles.buttonText}>Logout</div>
              </div>
            </div>
          </Modal>
        </Navbar>
      </div>
      <div style={{ display: "flex", height: "100%", overflowY: "none" }}>
        <Sidebar className="d-flex flex-column" rootStyles={mystyles.sidebar} width="228px" collapsedWidth="68px">
          {isCollapsed
            ? <>
              <p style={mystyles.branding.collapsed}><img src={T} /></p>
              <div style={mystyles.sidebarIconContainer.collapsed} className='d-flex justify-content-center align-items-center' onClick={(e) => { setisCollapsed(!isCollapsed); collapseSidebar() }}>
                <FontAwesomeIcon icon={faChevronRight} color={PRIMARY_COLOR} />
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
                {/* Campaign */}
                <div 
                  style={nav === 19 ? mystyles.sidebarMenuItemActive.collapsed : mystyles.sidebarMenuItem} 
                  onClick={(e) => setnav(19)}
                >
                  <div style={nav === 19 ? mystyles.sidebarMenuItemIconActive.collapsed : mystyles.sidebarMenuItemIcon.collapsed} >
                    <img src={nav === 19 ? campaignActive : campaignInactive} alt="Dashboard Icon" />
                  </div>
                </div>
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
                {/* client */}
                {privileges.includes('View Contacts') ? <div
                  style={
                    nav === 20
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(20)}
                >
                  <div
                    style={
                      nav === 20
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 20 ? contactsActive : contactsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div> : <></>}
                <div
                  style={
                    nav === 16
                      ? mystyles.sidebarMenuItemActive.collapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(16)}
                >
                  <div
                    style={
                      nav === 16
                        ? mystyles.sidebarMenuItemIconActive.collapsed
                        : mystyles.sidebarMenuItemIcon.collapsed
                    }
                  >
                    <img
                      src={nav === 16 ? announcement : announcement}
                      alt="Dashboard Icon"
                    />
                  </div>
                </div>
              </div>
            </>
            : <>
              <p style={mystyles.branding.nonCollapsed}><img style={{ zIndex: 1 }} src={T} /><img style={{ position: 'absolute', zIndex: 2, marginTop: '10px', marginLeft: '-11px' }} src={askforce} /></p>
              <div style={mystyles.sidebarIconContainer.nonCollapsed} className='d-flex justify-content-center align-items-center' onClick={(e) => { setisCollapsed(!isCollapsed); collapseSidebar() }}>
                <FontAwesomeIcon icon={faChevronLeft} color={PRIMARY_COLOR} />
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
                  style={{...
                    prop
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:prop?'#F0F0F1':'#fbfbfb', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)"
                  }}
                  onClick={()=>{setprop(!prop)}}
                >
                  <div
                    style={
                        mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={/* nav === 5 ? proposalsActive :  */proposalsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                         mystyles.sidebarMenuItemText
                    }
                  >
                    Proposals
                  </p>
                  <div style={{marginLeft:'4em'}}>{prop?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronRight} />}</div>
                </div> : <></>}
                {prop?<div
                  style={{...
                    nav === 17
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:nav===17?PRIMARY_COLOR:'#F0F0F1'
                  }}
                  onClick={(e) => setnav(17)}
                >
                  <div
                    style={{...
                      nav === 17
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)", backgroundColor: nav===17?PRIMARY_COLOR:'#F0F0F1'
                    }}
                  >
                  </div>
                  <p
                    style={
                      nav === 17
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Proposals Table
                  </p>
                </div>:<></>}
               {prop? <div
                  style={{...
                    nav === 5
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:nav===5?PRIMARY_COLOR:'#F0F0F1'
                  }}
                  onClick={(e) => setnav(5)}
                >
                  <div
                    style={{...
                      nav === 5
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)",backgroundColor: nav===5?PRIMARY_COLOR:'#F0F0F1'
                    }}
                  >
                    {/* <img
                      src={nav === 5 ? proposalsActive : proposalsInactive}
                      alt="Dashboard Icon"
                    /> */}
                  </div>
                  <p
                    style={
                      nav === 5
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    PM Selector
                  </p>
                </div>:<></>}
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
                {/* Campaign */}
                <div 
                  style={ nav === 19 ? mystyles.sidebarMenuItemActive.nonCollapsed:  mystyles.sidebarMenuItem}
                  onClick={(e) => setnav(19)}
                >
                  <div style={nav === 19 ? mystyles.sidebarMenuItemIconActive.nonCollapsed : mystyles.sidebarMenuItemIcon.nonCollapsed} >
                    <img src={nav === 19 ? campaignActive : campaignInactive} alt="Dashboard Icon" />
                  </div>
                  <p style={nav === 19 ? mystyles.sidebarMenuItemTextActive : mystyles.sidebarMenuItemText} >
                    Campaign
                  </p>
                </div>
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
                  style={{...
                    prop2
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:prop2?'#F0F0F1':'#fbfbfb', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)"
                  }}
                  onClick={()=>{setprop2(!prop2)}}
                >
                  <div
                    style={
                        mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={contactsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                         mystyles.sidebarMenuItemText
                    }
                  >
                    Clients
                  </p>
                  <div style={{marginLeft:'4em'}}>{prop2?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronRight} />}</div>
                </div> : <></>}
                {prop2?<div
                  style={{...
                    nav === 20
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:nav===20?PRIMARY_COLOR:'#F0F0F1'
                  }}
                  onClick={(e) => setnav(20)}
                >
                  <div
                    style={{...
                      nav === 20
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)", backgroundColor: nav===20?PRIMARY_COLOR:'#F0F0F1'
                    }}
                  >
                  </div>
                  <p
                    style={
                      nav === 20
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Organisations
                  </p>
                </div>:<></>}
                {prop2?<div
                  style={{...
                    nav === 21
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:nav===21?PRIMARY_COLOR:'#F0F0F1'
                  }}
                  onClick={(e) => setnav(21)}
                >
                  <div
                    style={{...
                      nav === 21
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)", backgroundColor: nav===21?PRIMARY_COLOR:'#F0F0F1'
                    }}
                  >
                  </div>
                  <p
                    style={
                      nav === 21
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    People
                  </p>
                </div>:<></>}
                {true ? <div
                  style={{...
                    prop3
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:prop3?'#F0F0F1':'#fbfbfb', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)"
                  }}
                  onClick={()=>{setprop3(!prop3)}}
                >
                  <div
                    style={
                        mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={/* nav === 5 ? proposalsActive :  */proposalsInactive}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                         mystyles.sidebarMenuItemText
                    }
                  >
                    Finance
                  </p>
                  <div style={{marginLeft:'4em'}}>{prop3?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronRight} />}</div>
                </div> : <></>}
                {prop3?<div
                  style={{...
                    nav === 24
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:nav===24?PRIMARY_COLOR:'#F0F0F1'
                  }}
                  onClick={(e) => setnav(24)}
                >
                  <div
                    style={{...
                      nav === 24
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)", backgroundColor: nav===24?PRIMARY_COLOR:'#F0F0F1'
                    }}
                  >
                  </div>
                  <p
                    style={
                      nav === 24
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Invoice AR
                  </p>
                </div>:<></>}
               {prop3? <div
                  style={{...
                    nav === 25
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem, backgroundColor:nav===25?PRIMARY_COLOR:'#F0F0F1'
                  }}
                  onClick={(e) => setnav(25)}
                >
                  <div
                    style={{...
                      nav === 25
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0)",backgroundColor: nav===25?PRIMARY_COLOR:'#F0F0F1'
                    }}
                  >
                  </div>
                  <p
                    style={
                      nav === 25
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Invoice AP
                  </p>
                </div>:<></>}
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
                <div
                  style={
                    nav === 16
                      ? mystyles.sidebarMenuItemActive.nonCollapsed
                      : mystyles.sidebarMenuItem
                  }
                  onClick={(e) => setnav(16)}
                >
                  <div
                    style={
                      nav === 16
                        ? mystyles.sidebarMenuItemIconActive.nonCollapsed
                        : mystyles.sidebarMenuItemIcon.nonCollapsed
                    }
                  >
                    <img
                      src={nav === 16 ? announcement : announcement}
                      alt="Dashboard Icon"
                    />
                  </div>
                  <p
                    style={
                      nav === 16
                        ? mystyles.sidebarMenuItemTextActive
                        : mystyles.sidebarMenuItemText
                    }
                  >
                    Announcements
                  </p>
                </div>
              </div>
            </>}
        </Sidebar>
        <div
          style={{
            marginTop: '56px',
            marginLeft: isCollapsed ? "68px" : "228px",
            backgroundColor: "#F8FAFB",
            height: `${window.innerHeight - 56}px`,
            overflowY: 'auto',
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
        style={mystyles.addModal}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={mystyles.addHeading}>Add New Task</div>
                    </div>
                    <div><img onClick={handleCloseTask} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
          {
            <AddTask
              setRed={setred}
              setGreen={setgreen}
              closeModal={handleCloseTask}
              api={apiCall}
              apiCall={setCall}
            />
          }
      </Modal>

      {/* Add RFP Form Modal */}
      <Modal
        show={rfpShow}
        onHide={handleCloseRFP}
        backdrop="static"
        style={mystyles.addModal}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={mystyles.addHeading}>Add New RFP</div>
                    </div>
                    <div><img onClick={handleCloseRFP} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
          {
            <RFPform
              setRed={setred}
              setGreen={setgreen}
              closeModal={handleCloseRFP}
              api={apiCall}
              apiCall={setCall}
            />
          }
      </Modal>

      {/* Add Proposal Form Modal */}
      <Modal
        show={proposalShow}
        onHide={handleCloseProposal}
        backdrop="static"
        style={mystyles.addModal}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={mystyles.addHeading}>Add Proposal</div>
                    </div>
                    <div><img onClick={handleCloseProposal} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
          {
            <ProposalForm
              setRed={setred}
              setGreen={setgreen}
              closeModal={handleCloseProposal}
              api={apiCall}
              apiCall={setCall}
            />
          }
      </Modal>

      <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showCityForm}
            onHide={handleCloseCityForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddCity
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseCityForm}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showDeptForm}
            onHide={handleCloseDeptForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddDepartment
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseDeptForm}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showCategoryForm}
            onHide={handleCloseCategoryForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Project Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddCategory
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseCategoryForm}
                />
              }
            </Modal.Body>
          </Modal>
          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={cityform}
            onHide={handleclosecityform}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Budget City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                <AddBudgetCity
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleclosecityform}
                />
              }
            </Modal.Body>
          </Modal>
    </>
  );
};

export default Dashboard;
