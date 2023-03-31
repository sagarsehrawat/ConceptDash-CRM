import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import taskList from "../../Images/TaskList.svg";
import timesheet from "../../Images/Timesheet.svg";
import report from "../../Images/Report.svg";
import person from "../../Images/Person.svg";
import filter from "../../Images/Filter.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { GET_EMPLOYEENAMES, GET_PAGE_TASKS, HOST } from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import AddTask from "../Form/AddTask";
import TimeSheet from "../TimeSheet/TimeSheet";

function Tasks(props) {
  const { isCollapsed } = props;
//   const { privileges, setPrivileges } = useContext(AuthenticationContext);
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
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
      marginLeft: "4px",
      marginRight: "24px",
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
      background: "#6519E1",
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
      alignItems: "center",
      justifyContent: "center",
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
    filterButton3: {
      padding: "4px 12px",
      gap: "10px",
      width: "56px",
      height: "28px",
      background: "#6519E1",
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
  };

  //Add Form Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Filter Modal
  const [filterModal, setfilterModal] = useState(false);
  const closeFilterModal = () => setfilterModal(false);
  const openFilterModal = () => setfilterModal(true);

  //Filter Modal 2
  const [filterModal1, setfilterModal1] = useState(false);
  const closeFilterModal1 = () => setfilterModal1(false);
  const openFilterModal1 = () => setfilterModal1(true);

  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const [value, setvalue] = useState("");
  const [employees, setemployees] = useState([]);
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
  useEffect(() => {
    // setIsLoading(true);
    const call = async () => {
        await axios
            .get(HOST + GET_PAGE_TASKS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    filter: JSON.stringify(returnData),
                    search: value,
                },
            })
            .then((res) => {
                console.log(res.data.res);
                // setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    call()
}, [apiCall])
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
  const filterSize = () => {
    return returnData.employee.length;
  };
  const filterSize1 = () => {
    return (
      returnData.assignedBy.length +
      returnData.status.length +
      returnData.priority.length
    );
  };
  return (
    <div>
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
                    backgroundColor: "#6519E1",
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
                    color: value1 == 1 ? "#6519E1" : "#70757A",
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
                <Tab
                  style={{
                    color: value1 == 2 ? "#6519E1" : "#70757A",
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
                />
                <Tab
                  style={{
                    color: value1 == 3 ? "#6519E1" : "#70757A",
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
                    color: value1 == 4 ? "#6519E1" : "#70757A",
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
            <TabPanel value="1">
              <div
                style={{
                  width: "100%",
                  float: "left",
                  marginLeft: "5px",
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
                      // value={value}
                      // onChange={filterData}
                      placeholder="Search Tasks"
                    />
                    <Button style={styles.searchButton}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
                    </Button>

                    {localStorage.getItem("department") === "Admin" ? (
                      <div
                        className="d-flex flex-row"
                        style={{
                          ...styles.dropdown1,
                          backgroundColor:
                            filterSize() > 0 ? "#DBDBF4" : "white",
                        }}
                        onClick={openFilterModal}
                      >
                        <img src={person} />
                        <p style={styles.dp1Text}>
                          My Tasks
                          {filterSize() > 0 ? `/ ${filterSize()}` : ""}
                        </p>
                        {filterSize() > 0 ? (
                          <></>
                        ) : (
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            color="#70757A"
                          />
                        )}
                      </div>
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
                      <div className="d-flex flex-row align-items-center">
                        <Button
                          style={{
                            fontFamily: "'Roboto'",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            backgroundColor: "white",
                            border: "none",
                            color: "#6519E1",
                            marginRight: "70px",
                            marginTop: "8px",
                            marginLeft: "8px",
                            marginBottom: "8px",
                          }}
                          disabled={filterSize() === 0}
                          onClick={(e) =>
                            setreturnData({
                              employee: [],
                              assignedBy: [],
                              status: [],
                              priority: [],
                            })
                          }
                        >
                          Clear All
                        </Button>
                        <FontAwesomeIcon
                          icon={faX}
                          style={{ height: "9px", cursor: "pointer" }}
                          color="#6519E1"
                          onClick={closeFilterModal}
                        />
                      </div>
                      <div
                        style={styles.filterSubcontainer}
                        className="filter-container"
                      >
                        <p style={styles.filterSubheading}>
                          Employees{" "}
                          {returnData.employee.length === 0
                            ? ""
                            : `/${returnData.employee.length}`}
                        </p>
                        {isLoadingEmp ? (
                          <LoadingSpinner />
                        ) : (
                          employees.map((e) => {
                            return (
                              <div
                                style={{
                                  ...styles.filterSubSubContainer,
                                  backgroundColor: returnData.employee.includes(
                                    e.Employee_ID
                                  )
                                    ? "#DBDBF4"
                                    : "#F7F7F9",
                                }}
                                onClick={() =>
                                  handleFilter("employee", e.Employee_ID)
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
                        className="d-flex flex-row"
                        style={{
                          marginLeft: "20px",
                          marginRight: "20px",
                          marginTop: "20px",
                        }}
                      >
                        {/* <Button style={styles.filterButton2} onClick={(e) => setfilter2('Advanced')}>Go to Advanced Filters</Button> */}
                        <Button
                          style={styles.filterButton3}
                          onClick={(e) => { setCall(apiCall + 1); closeFilterModal(); }}
                        >
                          Filter
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
                                color: "#6519E1",
                                marginRight: "32px",
                              }}
                              disabled={filterSize1() === 0}
                              onClick={(e) =>
                                setreturnData({
                                  employee: [],
                                  assignedBy: [],
                                  status: [],
                                  priority: [],
                                })
                              }
                            >
                              Clear All
                            </Button>
                            <FontAwesomeIcon
                              icon={faX}
                              style={{ height: "9px", cursor: "pointer" }}
                              color="#6519E1"
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
                              <p style={styles.filterBodyText}>Super Urgent</p>
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
                              <p style={styles.filterBodyText}>Urgent</p>
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
                  <button style={styles.addButton} onClick={handleShow}>
                    <p style={styles.addButtonText}>+ Add New Task</p>
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                Board
              </div>
            </TabPanel>
            <TabPanel value="3">
                <div style={{width: '100%', float:'left',}}>
                    <TimeSheet />
                </div>
            </TabPanel>
            <TabPanel value="4">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                Reports
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
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
              closeModal={handleClose}
              api={apiCall}
              apiCall={setCall}
            />
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Tasks;