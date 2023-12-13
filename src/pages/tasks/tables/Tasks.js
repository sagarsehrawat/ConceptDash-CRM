import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import taskList from "../../../Images/TaskList.svg";
import timesheet from "../../../Images/Timesheet.svg";
import report from "../../../Images/Report.svg";
import person from "../../../Images/Person.svg";
import filter from "../../../Images/Filter.svg";
import edit from "../../../Images/Editor.svg";
import del from "../../../Images/Delete.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'
import cross from '../../../Images/cross.svg'
import tIcon from '../../../Images/taskIcon.svg'
import {
  faArrowDown,
  faArrowsUpDown,
  faArrowUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCross,
  faDownload,
  faEdit,
  faFilter,
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { DELETE_TASK, GET_EMPLOYEENAMES, GET_PAGE_TASKS, HOST, UPDATE_TASK_STATUS, PRIMARY_COLOR, UPDATE_TASK_PRIORITY } from "../../../Main/Constants/Constants";
import LoadingSpinner from "../../../Main/Loader/Loader";
import AddTask from "../forms/AddTask";
import UpdateTask from "../forms/UpdateTask";
import TimeSheet from "../../../Main/TimeSheet/TimeSheet";
import Reports from "../../reports/index";
import AuthenticationContext from "../../../Context/AuthContext";
import GreenAlert from "../../../Main/Loader/GreenAlert";
import RedAlert from "../../../Main/Loader/RedAlert";
import './Tasks.css'
import TFChip from "../../../components/form/TFChip/TFChip";
import TFButton from '../../../components/ui/TFButton/TFButton'
import plusIcon from '../../../assets/icons/Plus.svg'
import TFDeleteModal from '../../../components/modals/TFDeleteModal/TFDeleteModal'

function Tasks(props) {
  const { isCollapsed } = props;
  const { privileges, setPrivileges } = useContext(AuthenticationContext);
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const [details, setdetails] = useState([true, true, true, true, true, true])
  const [apiCall2, setCall2] = useState(0);
  const [task, settask] = useState(true);

  const styles = {
    heading: {
      width: "48px",
      height: "28px",
      marginLeft: "32px",
      marginTop: "24px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
    },
    headerContainer: {
      marginLeft: "32px",
      marginRight: "24px",
    },
    priorityText: {
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px"
    },
    searchInputContainer: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "8px 12px",
      gap: "4px",
      width: "234px",
      height: "36px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px 0 0 6px",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      color: "#0D163A",
      opacity: 0.7,
    },
    searchButton: {
      width: "34px",
      height: "36px",
      background: "#ffffff",
      borderRadius: "0px 6px 6px 0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      backgroundColor: "#D9D9D9",
    },
    addButton: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 16px",
      gap: "8px",
      width: "151px",
      height: "40px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "5px",
    },
    addButtonText: {
      width: "155px",
      height: "24px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      color: "#FBFBFB",
      flex: "none",
      margin: 0,
      flexGrow: 0,
    },
    dropdown1: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      // justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "135px",
      height: "36px",
      marginLeft: "12px",
      top: "64px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: '14px'
    },
    dp1Text: {
      marginLeft: "5px",
      width: "80px",
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
    },
    dropdown2: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "125px",
      height: "36px",
      marginLeft: "12px",
      top: "64px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      cursor: "pointer",
    },
    filterModal: {
      position: "absolute",
      width: "175px",
      height: "fit-content",
      left: isCollapsed ? "380px" : "540px",
      top: "232px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
    },
    filterModal1: {
      position: "absolute",
      width: "480px",
      height: "fit-content",
      left: isCollapsed ? "528px" : "688px",
      top: "232px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
    },
    filterSubcontainer1: {
      width: "130px",
      height: "216px",
      overflowY: "scroll",
      marginLeft: "27px",
    },
    filterSubcontainer: {
      width: "175px",
      height: "216px",
      overflowY: "scroll",
      marginLeft: "27px",
    },
    filterSubheading: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      marginBottom: "8px",
    },
    filterSubSubContainer: {
      display: "flex",
      flexDirection: "row",
      // alignItems: "center",
      // justifyContent: "center",
      padding: "4px",
      gap: "10px",
      width: "120px",
      height: "24px",
      background: "#F7F7F9",
      borderRadius: "6px",
      marginBottom: "8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      cursor: "pointer",
    },
    filterBodyText: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
    },
    updateButtonStatus: {
      padding: "4px 12px",
      gap: "10px",
      width: "65px",
      height: "28px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "6px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      textAlign: 'center',
      marginTop: "20px",
      marginLeft: "25px",
    },
    filterButton3: {
      padding: "4px 12px",
      gap: "10px",
      width: "56px",
      height: "28px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "6px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      marginLeft: "30px",
      marginBottom: "10px",
    },
    table: {
      width: "100%",
      overflowX: "hidden",
      borderCollapse: "collapse"
    },
    tableHeader2: {
      height: "35px",
      background: "#F7F7F9",
      textAlign: "center",
      borderBottom: "0px"
    },
    tableHeading: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "13px",
      color: "#70757A",
      borderBottom: "1px solid #EBE9F1",
      verticalAlign: "middle",
      textAlign: "left",
    },
    tableBody: {
      background: "#FFFFFF",
      width: '100%'
    },
    row2: {
      height: "44px",
      width: "100%",
      background: "#FFFFFF",
      borderBottom: "1px solid #EBE9F1",
    },
    cell: {
      height: "44px",
      float: "center",
      textAlign: "left",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: '20px'
    },
    statusModal: {
      position: "absolute",
      width: "175px",
      height: "fit-content",
      // left: isCollapsed ? "950px" : "1110px",
      left: "45%",
      top: "232px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
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
      color: "#0A0A0A",
      // marginTop:'12px'
  }
  };

  //Add Form Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Update Form Modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  //Filter Modal
  const [filterModal, setfilterModal] = useState(false);
  const closeFilterModal = () => setfilterModal(false);
  const openFilterModal = () => setfilterModal(true);

  //Filter Modal 2
  const [filterModal1, setfilterModal1] = useState(false);
  const closeFilterModal1 = () => setfilterModal1(false);
  const openFilterModal1 = () => setfilterModal1(true);

  //Delete Modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const [value, setvalue] = useState("");
  const [employees, setemployees] = useState([]);
  const [general, setgeneral] = useState([]);
  const [projects, setprojects] = useState([]);
  const [proposals, setproposals] = useState([]);
  const [rfps, setrfps] = useState([]);
  const [hr, sethr] = useState([]);
  const [finance, setfinance] = useState([]);
  const [isLoadingEmp, setisLoadingEmp] = useState(false);
  const [returnData, setreturnData] = useState({
    employee: [],
    assignedBy: [],
    status: [],
    priority: [],
  });
  useEffect(() => {
    setisLoadingEmp(true);
    const call = async () => {
      await axios
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setemployees(res.data.res);
          setisLoadingEmp(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, []);
  const [isLoading, setisLoading] = useState(false)
  const [eid, seteid] = useState(parseInt(localStorage.getItem('employeeId')))
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_PAGE_TASKS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            filter: JSON.stringify(returnData),
            search: value,
            id: eid
          },
        })
        .then((res) => {
          let pj = [], prop = [], rf = [], gen = [], fin = [], HR = []
          let arr = res.data.res;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === "Projects") {
              pj.push(arr[i]);
            } else if (arr[i].type === "Proposals") {
              prop.push(arr[i])
            } else if (arr[i].type === "RFP") {
              rf.push(arr[i])
            } else if (arr[i].type === "General") {
              gen.push(arr[i])
            } else if (arr[i].type === "Finance") {
              fin.push(arr[i])
            } else {
              HR.push(arr[i])
            }
          }
          setprojects(pj);
          setproposals(prop);
          setrfps(rf);
          setgeneral(gen);
          setfinance(fin);
          sethr(HR);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    call()
  }, [apiCall, apiCall2])

  const handleFilter = (key, value) => {
    if (returnData[key].includes(value)) {
      setreturnData((prevFilter) => ({
        ...prevFilter,
        [key]: prevFilter[key].filter((element) => element !== value),
      }));
    } else {
      setreturnData((prevFilter) => ({
        ...prevFilter,
        [key]: [...prevFilter[key], value],
      }));
    }
  };

  const filterSize1 = () => {
    return (
      returnData.assignedBy.length +
      returnData.status.length +
      returnData.priority.length
    );
  };
  const formatDate = (date) => {
    if (date === "" || date === null || date === undefined) return "";
    const formattedDate = moment(date)
    return formattedDate.format('D MMM, YYYY')
  }

  const handleDelete = () => {
    axios
      .delete(
        HOST + DELETE_TASK,
        { headers: { auth: "Rose " + localStorage.getItem("auth"), id: deleteID, } }
      )
      .then((res) => {
        if (res.data.success) {
          handleCloseDelete()
          setgreen(true);
          setCall(apiCall + 1)
        } else {
          setred(true)
        }
      })
      .catch((err) => {
        setred(true);
        console.log(err);
      });
  }
  const [deleteID, setdeleteID] = useState('');
  const [idx, setidx] = useState('');
  const [updateTask, setupdateTask] = useState([]);
  const handleEmployeeChange =(e)=>{
    seteid(e.target.value);
    setCall(apiCall+1);
  }
  
  const handleStatusUpdate = async (taskId, s) => {
    let status;
    if(s==="Not Started") status = 1;
    if(s==="In Progress") status = 2;
    if(s==="Completed") status = 3;
    

    const response = await axios
      .post(
        HOST + UPDATE_TASK_STATUS,
        {
          taskId,
          status
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      );
      setCall(apiCall+1);

      return response;
  }

  const handlePriorityUpdate = async (taskId, p) => {
    let priority;
    if(p==='Critical') priority = 1;
    if(p==='High') priority = 2;
    if(p==='Medium') priority = 3;
    if(p==='Low') priority = 4;

    console.log(p);
    const response = await axios.post(
      HOST + UPDATE_TASK_PRIORITY,
      {
        taskId,
        priority,
      },
      {
        headers: { auth: "Rose " + localStorage.getItem("auth") },
      }
      );
      setCall(apiCall+1);
      
      return response;
    }
    
    const getPriority = (priority, id) => {
      if(priority===1) return <TFChip value="Critical" onChange={handlePriorityUpdate} name={id} options={["Low", "Medium", "High", "Critical"]}/>
      if(priority===2) return <TFChip value="High" onChange={handlePriorityUpdate} name={id} options={["Low", "Medium", "High", "Critical"]}/>
      if(priority===3) return <TFChip value="Medium" onChange={handlePriorityUpdate} name={id} options={["Low", "Medium", "High", "Critical"]}/>
      if(priority===4) return <TFChip value="Low" onChange={handlePriorityUpdate} name={id} options={["Low", "Medium", "High", "Critical"]}/>
    }
    
    const getStatus = (status, id) => {
      if(status===1) return <TFChip value="Not Started" onChange={handleStatusUpdate} name id={id} options={["Not Started", "In Progress", "Completed"]}/>
      if(status===2) return <TFChip value="In Progress" onChange={handleStatusUpdate} name={id} options={["Not Started", "In Progress", "Completed"]}/>
      if(status===3) return <TFChip value="Completed" onChange={handleStatusUpdate} name={id} options={["Not Started", "In Progress", "Completed"]}/>
    }
  
  return (
    <div>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div style={styles.heading}>Tasks</div>
      <div style={{ marginTop: "8px" }}>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            float: "left",
          }}
          style={{ margin: "0" }}
        >
          <TabContext value={value1}>
            <Box sx={{}}>
              <TabList
                centered
                onChange={handleChange}
                aria-label=""
                TabIndicatorProps={{
                  style: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                }}
                sx={{
                  //   marginRight: "400px",
                  marginLeft: "20px",
                  float: "left",
                  height: "57px",
                }}
              >
                <Tab
                  style={{
                    color: value1 == 1 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="Task List"
                  value="1"
                  icon={
                    <img
                      style={{ marginRight: "6px", marginTop: "6px" }}
                      src={taskList}
                    />
                  }
                />
                {/* <Tab
                  style={{
                    color: value1 == 2 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="Task Board"
                  value="2"
                  icon={
                    <img
                      style={{ marginRight: "6px", marginTop: "6px" }}
                      src={timesheet}
                    />
                  }
                /> */}
                <Tab
                  style={{
                    color: value1 == 3 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="Timesheet"
                  value="3"
                  icon={
                    <img
                      style={{ marginRight: "6px", marginTop: "6px" }}
                      src={timesheet}
                    />
                  }
                />
                <Tab
                  style={{
                    color: value1 == 4 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="Report/Overview"
                  value="4"
                  icon={
                    <img
                      style={{ marginRight: "6px", marginTop: "6px" }}
                      src={report}
                    />
                  }
                />
              </TabList>
            </Box>
            <TabPanel value="1" style={{padding:'0px'}}>
              <div
                style={{
                  width: "100%",
                  float: "left",
                  //   marginLeft: "5px",
                  marginTop: "20px",
                }}
              >
                <div
                  className="d-flex flex-row justify-content-between"
                  style={styles.headerContainer}
                >
                  <div className="d-flex flex-row">
                    <input
                      style={styles.searchInputContainer}
                      type="text"
                      value={value}
                      onChange={(e) => setvalue(e.target.value)}
                      placeholder="Search Tasks"
                    />
                    <Button style={styles.searchButton}>
                      <FontAwesomeIcon onClick={(e) => setCall(apiCall + 1)} icon={faMagnifyingGlass} color="black" />
                    </Button>

                    {privileges.includes('View Employee Tasks') ? (
                        <Form.Select 
                        className="d-flex flex-row"
                        style={{
                          ...styles.dropdown1,
                          backgroundColor:"white",
                        }}
                        onChange={handleEmployeeChange}
                        >
                          <option>Select Employee</option>
                          {employees.map(e => (
                            <option selected={e.Employee_ID===eid} value={e.Employee_ID}>{e.Full_Name===localStorage.getItem('employeeName')?'My Tasks':e.Full_Name}</option>
                          ))}
                        </Form.Select>
                    ) : (
                      <></>
                    )}
                    <Modal
                      show={filterModal}
                      onHide={closeFilterModal}
                      style={styles.filterModal}
                      dialogClassName="filter-dialog"
                      backdropClassName="filter-backdrop"
                      animation={false}
                    >

                      <div
                        style={styles.filterSubcontainer}
                        className="filter-container"
                      >
                        <p style={styles.filterSubheading}>
                          &nbsp;</p>
                        {employees.map((e) => {
                          return (
                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: eid === e.Employee_ID
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() =>
                                seteid(e.Employee_ID)
                              }
                            >
                              <p style={styles.filterBodyText}>
                                {e.Full_Name}
                              </p>
                            </div>
                          )
                        })}

                        <Button
                          style={styles.updateButtonStatus}
                          onClick={(e) => {
                            setCall(apiCall + 1);
                            closeFilterModal();
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </Modal>
                    <div
                      className="d-flex flex-row"
                      style={{
                        ...styles.dropdown2,
                        backgroundColor:
                          filterSize1() > 0 ? "#DBDBF4" : "white",
                      }}
                      onClick={openFilterModal1}
                    >
                      <img src={filter} />
                      <p style={styles.dp1Text}>
                        Filters
                        {filterSize1() > 0 ? `/ ${filterSize1()}` : ""}
                      </p>
                      {filterSize1() > 0 ? (
                        <></>
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
                      )}
                    </div>
                    <Modal
                      show={filterModal1}
                      onHide={closeFilterModal1}
                      style={styles.filterModal1}
                      dialogClassName="filter-dialog"
                      backdropClassName="filter-backdrop"
                      animation={false}
                    >
                      <div
                        style={{
                          width: "480px",
                          height: "356px",
                          boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
                          borderRadius: "6px",
                        }}
                      >
                        <div
                          className="d-flex flex-row justify-content-between align-items-center"
                          style={{
                            marginTop: "16px",
                            marginLeft: "20px",
                            marginRight: "30px",
                            marginBottom: "20px",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "'Roboto'",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#0A0A0A",
                              margin: "0px",
                            }}
                          >
                            Filters
                          </p>
                          <div className="d-flex align-items-center">
                            <Button
                              style={{
                                fontFamily: "'Roboto'",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "14px",
                                backgroundColor: "white",
                                border: "none",
                                color: PRIMARY_COLOR,
                                marginRight: "32px",
                              }}
                              disabled={filterSize1() === 0}
                              onClick={(e) =>{
                                setreturnData({
                                  employee: [],
                                  assignedBy: [],
                                  status: [],
                                  priority: [],
                                });
                                setCall(apiCall + 1);
                              closeFilterModal1();
                              }}
                            >
                              Clear All
                            </Button>
                            <FontAwesomeIcon
                              icon={faX}
                              style={{ height: "9px", cursor: "pointer" }}
                              color = {PRIMARY_COLOR}
                              onClick={closeFilterModal1}
                            />
                          </div>
                        </div>
                        <div
                          className="d-flex flex-row justify-content-between"
                          style={{ marginLeft: "0px", marginRight: "20px" }}
                        >
                          <div
                            style={styles.filterSubcontainer1}
                            className="filter-container"
                          >
                            <p style={styles.filterSubheading}>
                              Assigned By{" "}
                              {returnData.assignedBy.length === 0
                                ? ""
                                : `/${returnData.assignedBy.length}`}
                            </p>
                            {isLoadingEmp ? (
                              <LoadingSpinner />
                            ) : (
                              employees.map((e) => {
                                return (
                                  <div
                                    style={{
                                      ...styles.filterSubSubContainer,
                                      backgroundColor:
                                        returnData.assignedBy.includes(
                                          e.Employee_ID
                                        )
                                          ? "#DBDBF4"
                                          : "#F7F7F9",
                                    }}
                                    onClick={() =>
                                      handleFilter("assignedBy", e.Employee_ID)
                                    }
                                  >
                                    <p style={styles.filterBodyText}>
                                      {e.Full_Name}
                                    </p>
                                  </div>
                                );
                              })
                            )}
                          </div>
                          <div
                            style={styles.filterSubcontainer1}
                            className="filter-container"
                          >
                            <p style={styles.filterSubheading}>
                              Status{" "}
                              {returnData.status.length === 0
                                ? ""
                                : `/${returnData.status.length}`}
                            </p>

                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.status.includes(
                                  2
                                )
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() =>
                                handleFilter("status", 2)
                              }
                            >
                              <p style={styles.filterBodyText}>Completed</p>
                            </div>
                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.status.includes(
                                  0
                                )
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() =>
                                handleFilter("status", 0)
                              }
                            >
                              <p style={styles.filterBodyText}>
                                Not Started Yet
                              </p>
                            </div>
                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.status.includes(
                                  1
                                )
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() =>
                                handleFilter("status", 1)
                              }
                            >
                              <p style={styles.filterBodyText}>In Progress</p>
                            </div>
                          </div>
                          <div
                            style={styles.filterSubcontainer1}
                            className="filter-container"
                          >
                            <p style={styles.filterSubheading}>
                              Priority{" "}
                              {returnData.priority.length === 0
                                ? ""
                                : `/${returnData.priority.length}`}
                            </p>

                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.priority.includes(1)
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() => handleFilter("priority", 1)}
                            >
                              <p style={styles.filterBodyText}>Critical</p>
                            </div>
                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.priority.includes(2)
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() => handleFilter("priority", 2)}
                            >
                              <p style={styles.filterBodyText}>High</p>
                            </div>
                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.priority.includes(3)
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() => handleFilter("priority", 3)}
                            >
                              <p style={styles.filterBodyText}>Medium</p>
                            </div>
                            <div
                              style={{
                                ...styles.filterSubSubContainer,
                                backgroundColor: returnData.priority.includes(4)
                                  ? "#DBDBF4"
                                  : "#F7F7F9",
                              }}
                              onClick={() => handleFilter("priority", 4)}
                            >
                              <p style={styles.filterBodyText}>Low</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="d-flex flex-row justify-content-end"
                          style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            marginTop: "20px",
                          }}
                        >
                          {/* <Button style={styles.filterButton2} onClick={(e) => setfilter2('Advanced')}>Go to Advanced Filters</Button> */}
                          <Button
                            style={styles.filterButton3}
                            onClick={(e) => {
                              setCall(apiCall + 1);
                              closeFilterModal1();
                            }}
                          >
                            Filter
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  {/* <button className="addButton" onClick={handleShow}>
                    <p style={styles.addButtonText}>+ Add New Task</p>
                  </button> */}
                  <TFButton icon={plusIcon} label="Add New Task" handleClick={handleShow} />
                </div>
                {/* Table */}
                <div style={{ borderBottom: "1px solid #EBE9F1", height: "548px", overflow: "auto", position: "relative", marginTop: '32px', width: '100%' }}>
                  <table style={styles.table} className='rfp-table'>
                    <thead style={styles.tableHeader2}>
                      <tr>
                        <th scope="col" style={{ ...styles.tableHeading, width: "26vw", borderBottom: "1px solid #EBE9F1", textAlign: "left", paddingLeft: "32px" }} className='fixed-header'>Tasks</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '9vw' : '8vw' }} className='fixed-header2'>Start Date</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '10vw' : '8vw' }} className='fixed-header2'>Due Date</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '10vw' : '8vw', textAlign:'left' }} className='fixed-header2'>Assigned By</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '10vw' : '8vw' }} className='fixed-header2'>Priority</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '10vw' : '8vw' }} className='fixed-header2'>Status</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '10vw' : '9vw' }} className='fixed-header2'>Reviewed By</th>
                        <th scope="col" style={{ ...styles.tableHeading, width: isCollapsed ? '10vw' : '9vw' }} className='fixed-header2'>Action</th>
                      </tr>
                    </thead>
                    <tbody style={styles.tableBody}>
                      {isLoading ? <tr style={{ height: "512px", width: "100%", background: "white" }}>
                        <td colSpan={9}>
                          <LoadingSpinner />
                        </td>
                      </tr> :
                        <>
                          {/* Projects */}
                          {projects.length === 0 ? <></> :
                            <>
                              <tr>
                                <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [!prev[0], ...prev.slice(1)])} >
                                  <FontAwesomeIcon icon={details[0] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                  Projects
                                </td>
                              </tr>
                              {details[0] ? projects.map((e, idx) => (
                                <tr style={styles.row2}>
                                  <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e.project_name ? e.project_name : '-'}</p>&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e.title}</p>
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.start_date)}
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.due_date)}
                                  </td>
                                  <td style={{...styles.cell, textAlign:'left'}}>
                                    {e.assigner}
                                  </td>
                                  <td style={{...styles.cell}}>
                                    {getPriority(e.priority, e.task_id)}
                                  </td>
                                  <td style={{ ...styles.cell}}>
                                  {getStatus(e.status, e.task_id)}
                                  </td>
                                  <td style={styles.cell}>
                                    {e.reviewer}
                                  </td>
                                  <td style={styles.cell}>
                                    <img style={{ marginRight: '20px', cursor: 'pointer' }} src={edit} onClick={() => { setidx(idx); setupdateTask(e); settask(false); handleShowUpdate() }} />
                                    <img style={{ cursor: 'pointer' }} src={del} onClick={() => { setdeleteID(e.task_id); handleShowDelete(); }} />
                                  </td>
                                </tr>
                              )) : <></>}
                            </>
                          }

                          {/* Proposals */}
                          {proposals.length === 0 ? <></> :
                            <>
                              <tr>
                                <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [prev[0], !prev[1], ...prev.slice(2)])} >
                                  <FontAwesomeIcon icon={details[1] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                  Proposals
                                </td>
                              </tr>
                              {details[1] ? proposals.map((e) => (
                                <tr style={styles.row2}>
                                  <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e.project_name ? e.project_name : '-'}</p>&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e.title}</p>
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.start_date)}
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.due_date)}
                                  </td>
                                  <td style={{...styles.cell, textAlign:'left'}}>
                                    {e.assigner}
                                  </td>
                                  <td style={styles.cell} align='center'>
                                  {getPriority(e.priority, e.task_id)}
                                  </td>
                                  <td style={{ ...styles.cell}}>
                                  {getStatus(e.status, e.task_id)}
                                  </td>
                                  <td style={styles.cell}>
                                    {e.reviewer}
                                  </td>
                                  <td style={styles.cell}>
                                    <img style={{ marginRight: '20px', cursor: 'pointer' }} src={edit} onClick={() => { setidx(idx); setupdateTask(e); settask(false); handleShowUpdate() }} />
                                    <img style={{ cursor: 'pointer' }} src={del} onClick={() => { setdeleteID(e.task_id); handleShowDelete(); }} />
                                  </td>
                                </tr>
                              )) : <></>}
                            </>
                          }

                          {/* RFPs */}
                          {rfps.length === 0 ? <></> :
                            <>
                              <tr>
                                <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [prev[0], prev[1], !prev[2], ...prev.slice(3)])} >
                                  <FontAwesomeIcon icon={details[2] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                  RFPs
                                </td>
                              </tr>
                              {details[2] ? rfps.map((e) => (
                                <tr style={styles.row2}>
                                  <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e.project_name ? e.project_name : '-'}</p>&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e.title}</p>
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.start_date)}
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.due_date)}
                                  </td>
                                  <td style={{...styles.cell, textAlign:'left'}}>
                                    {e.assigner}
                                  </td>
                                  <td style={styles.cell} >
                                  {getPriority(e.priority, e.task_id)}
                                  </td>
                                  <td style={{ ...styles.cell}}>
                                  {getStatus(e.status, e.task_id)}
                                  </td>
                                  <td style={styles.cell}>
                                    {e.reviewer}
                                  </td>
                                  <td style={styles.cell}>
                                    <img style={{ marginRight: '20px', cursor: 'pointer' }} src={edit} onClick={() => { setidx(idx); setupdateTask(e); settask(false); handleShowUpdate() }} />
                                    <img style={{ cursor: 'pointer' }} src={del} onClick={() => { setdeleteID(e.task_id); handleShowDelete(); }} />
                                  </td>
                                </tr>
                              )) : <></>}
                            </>
                          }

                          {/* General */}
                          {general.length === 0 ? <></> :
                            <>
                              <tr>
                                <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [prev[0], prev[1], prev[2], !prev[3], ...prev.slice(4)])} >
                                  <FontAwesomeIcon icon={details[3] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                  General
                                </td>
                              </tr>
                              {details[3] ? general.map((e) => (
                                <tr style={styles.row2}>
                                  <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e.project_name ? e.project_name : 'General'}</p>&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e.title}</p>
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.start_date)}
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.due_date)}
                                  </td>
                                  <td style={{...styles.cell, textAlign:'left'}}>
                                    {e.assigner}
                                  </td>
                                  <td style={styles.cell}>
                                  {getPriority(e.priority, e.task_id)}
                                  </td>
                                  <td style={{ ...styles.cell}}>
                                  {getStatus(e.status, e.task_id)}
                                  </td>
                                  <td style={styles.cell}>
                                    {e.reviewer}
                                  </td>
                                  <td style={styles.cell}>
                                    <img style={{ marginRight: '20px', cursor: 'pointer' }} src={edit} onClick={() => { setidx(idx); setupdateTask(e); settask(false); handleShowUpdate() }} />
                                    <img style={{ cursor: 'pointer' }} src={del} onClick={() => { setdeleteID(e.task_id); handleShowDelete(); }} />
                                  </td>
                                </tr>
                              )) : <></>}
                            </>
                          }

                          {/* Finance */}
                          {finance.length === 0 ? <></> :
                            <>
                              <tr>
                                <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [prev[0], prev[1], prev[2], prev[3], !prev[4], ...prev.slice(5)])} >
                                  <FontAwesomeIcon icon={details[4] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                  Finance
                                </td>
                              </tr>
                              {details[4] ? finance.map((e) => (
                                <tr style={styles.row2}>
                                  <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e.project_name ? e.project_name : 'Finance'}</p>&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e.title}</p>
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.start_date)}
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.due_date)}
                                  </td>
                                  <td style={{...styles.cell, textAlign:'left'}}>
                                    {e.assigner}
                                  </td>
                                  <td style={styles.cell}>
                                  {getPriority(e.priority, e.task_id)}
                                  </td>
                                  <td style={{ ...styles.cell}}>
                                  {getStatus(e.status, e.task_id)}
                                  </td>
                                  <td style={styles.cell}>
                                    {e.reviewer}
                                  </td>
                                  <td style={styles.cell}>
                                    <img style={{ marginRight: '20px', cursor: 'pointer' }} src={edit} onClick={() => { setidx(idx); setupdateTask(e); settask(false); handleShowUpdate() }} />
                                    <img style={{ cursor: 'pointer' }} src={del} onClick={() => { setdeleteID(e.task_id); handleShowDelete(); }} />
                                  </td>
                                </tr>
                              )) : <></>}
                            </>
                          }


                          {/* HR */}
                          {hr.length === 0 ? <></> :
                            <>
                              <tr>
                                <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [prev[0], prev[1], prev[2], prev[3], prev[4], !prev[5], ...prev.slice(6)])} >
                                  <FontAwesomeIcon icon={details[5] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                  HR
                                </td>
                              </tr>
                              {details[5] ? hr.map((e) => (
                                <tr style={styles.row2}>
                                  <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e.project_name ? e.project_name : 'HR'}</p>&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                                    <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e.title}</p>
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.start_date)}
                                  </td>
                                  <td style={styles.cell}>
                                    {formatDate(e.due_date)}
                                  </td>
                                  <td style={{...styles.cell, textAlign:'left'}}>
                                    {e.assigner}
                                  </td>
                                  <td style={styles.cell}>
                                  {getPriority(e.priority, e.task_id)}
                                  </td>
                                  <td style={{ ...styles.cell}}>
                                  {getStatus(e.status, e.task_id)}
                                  </td>
                                  <td style={styles.cell}>
                                    {e.reviewer}
                                  </td>
                                  <td style={styles.cell}>
                                    <img style={{ marginRight: '20px', cursor: 'pointer' }} src={edit} onClick={() => { setidx(idx); setupdateTask(e); settask(false); handleShowUpdate() }} />
                                    <img style={{ cursor: 'pointer' }} src={del} onClick={() => { setdeleteID(e.task_id); handleShowDelete(); }} />
                                  </td>
                                </tr>
                              )) : <></>}
                            </>
                          }
                        </>}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
            {/* <TabPanel value="2">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                Board
              </div>
            </TabPanel> */}
            <TabPanel value="3" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left', }}>
                <TimeSheet />
              </div>
            </TabPanel>
            <TabPanel value="4" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left', marginTop: '20px' }}>
                <Reports isCollapsed={isCollapsed} />
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                style={styles.addModal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Add New Task</div>
                    </div>
                    <div><img onClick={handleClose} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                {
                        <AddTask
                        setRed={setred}
                        setGreen={setgreen}
                        closeModal={handleClose}
                        api={apiCall}
                        apiCall={setCall}
                      />
                    }
                
            </Modal>

            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                backdrop="static"
                style={styles.addModal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Update Task</div>
                    </div>
                    <div><img onClick={handleCloseUpdate} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                {
                        <UpdateTask
                          updateTask={updateTask}
                          setgreen={setgreen}
                          setred={setred}
                          closeModal={handleCloseUpdate}
                          api={apiCall2}
                          apiCall={setCall2}
                      />
                    }
                
            </Modal>

      
      {/* Delete Modal */}
      <TFDeleteModal show={showDelete} onHide={()=>setShowDelete(false)} onDelete={handleDelete} label='Task'/>
    </div>
  );
}

export default Tasks;
