import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import LoadingSpinner from "../../Loader/Loader";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";

import GreenAlert from "../../Loader/GreenAlert";
import RedAlert from "../../Loader/RedAlert";
import {
  HOST,
  GET_TASKS_BY_ID,
  GET_PROJECT_TASKS_BY_ID,
  UPDATE_PROJECT_TASK_5,
  UPDATE_PROJECT_TASK_4,
  COUNTS,
  RFP_ANALYSIS,
  PROPOSAL_STATUS_COUNTS,
  BUDGET_AMOUNT,
} from "../../Constants/Constants";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TestDemo from "../../Calendar";
import TimeSheet from "../../TimeSheet/TimeSheet";
import AddMyTask from "../../Form/AddMyTask";
import UpdateTask from "../../Form/UpdateTask";

const Dashboard = () => {
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [value, setValue] = React.useState("1");
  const [tasks, settasks] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [budgetsCount, setbudgetsCount] = useState(0);
  const [RFPCount, setRFPCount] = useState(0);
  const [proposalCount, setproposalCount] = useState(0);
  const [projectCount, setprojectCount] = useState(0);

  const [goRFP, setgoRFP] = useState(0);
  const [nogoRFP, setnogoRFP] = useState(0);
  const [reviewRFP, setreviewRFP] = useState(0);

  const [wonProposals, setwonProposals] = useState(0);
  const [lostProposals, setlostProposals] = useState(0);

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 4,
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];
  const [budget1, setbudget1] = useState(0);
  const [budget2, setbudget2] = useState(0);
  const [budget3, setbudget3] = useState(0);
  const [budget4, setbudget4] = useState(0);
  const [budget5, setbudget5] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_TASKS_BY_ID, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            id: localStorage.getItem("employeeId"),
          },
        })
        .then((res) => {
          settasks(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_PROJECT_TASKS_BY_ID, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            id: localStorage.getItem("employeeId"),
          },
        })
        .then((res) => {
          setProjectTasks(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + BUDGET_AMOUNT, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.res.length; i++) {
            if (res.data.res[i].Budget_Year === years[0]) {
              setbudget1(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[1]) {
              setbudget2(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[2]) {
              setbudget3(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[3]) {
              setbudget4(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[4]) {
              setbudget5(res.data.res[i].Total_Budget);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + PROPOSAL_STATUS_COUNTS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          if (res.data.res[0].Status === "Won") {
            setwonProposals(res.data.res[0].Price);
          } else {
            setlostProposals(res.data.res[0].Price);
          }
          if (res.data.res[1].Status === "Won") {
            setwonProposals(res.data.res[1].Price);
          } else {
            setlostProposals(res.data.res[1].Price);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + RFP_ANALYSIS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setgoRFP(res.data.res[0].Go);
          setnogoRFP(res.data.res[0].NoGo);
          setreviewRFP(res.data.res[0].Review);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + COUNTS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setbudgetsCount(res.data.res[0].bCount);
          setRFPCount(res.data.res[0].rCount);
          setproposalCount(res.data.res[0].pCount);
          setprojectCount(res.data.res[0].proCount);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsLoading(false);
    };
    call();
  }, [apiCall]);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (e.target.name === "Review Proposal") {
      axios
        .post(
          HOST + UPDATE_PROJECT_TASK_5,
          {
            id: e.target.value,
          },
          { headers: { auth: "Rose " + localStorage.getItem("auth") } }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          HOST + UPDATE_PROJECT_TASK_4,
          {
            id: e.target.value,
          },
          { headers: { auth: "Rose " + localStorage.getItem("auth") } }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTS, setShowTS] = useState(false);

  const handleCloseTS = () => setShowTS(false);
  const handleShowTS = () => setShowTS(true);

  const handleCloseAddTask = () => setShowAddTask(false);
  const handleShowAddTask = () => setShowAddTask(true);

  const [value1, setValue1] = useState("1");
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const dhm = (ms) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    if (days < 0 || hours < 0 || minutes < 0 || sec < 0) {
      return null;
    }
    return days + "d " + hours + "hrs ";
  };

  const dataCounts = {
    labels: ["Budgets", "RFPs", "Proposals", "Projects"],
    datasets: [
      {
        data: [budgetsCount, RFPCount, proposalCount, projectCount],
        backgroundColor: ["#9BBFE0", "#E8A09A", "#FBE29F", "#C6D68F"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB", "#74BBFB", "#74BBFB"],
      },
    ],
  };

  const dataForRFP = {
    labels: ["Go", "NoGo", "Review"],
    datasets: [
      {
        data: [goRFP, nogoRFP, reviewRFP],
        backgroundColor: ["#0674C4", "#DDDDDD", "#64C2A6"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB", "#74BBFB"],
      },
    ],
  };

  const wonLostProposals = {
    labels: ["Won", "Lost"],
    datasets: [
      {
        data: [wonProposals, lostProposals],
        backgroundColor: ["#00008B", "#1F75FE"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB"],
      },
    ],
  };
  const data = {
    labels: years,
    datasets: [
      {
        label: "Budgets for last 5 years (in USD)",
        data: [budget1, budget2, budget3, budget4, budget5],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const [rowData, setrowData] = useState([]);
  const handleUpdate = (e) => {
    setrowData(e);
    handleShowUpdate();
  };
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mainCont">
            <div
              className="container"
              style={{ minWidth: "80% !important", marginTop: "2rem" }}
            >
              <div className="row d-flex justify-content-around">
                <Card style={{ width: "25rem" }}>
                  <h3 style={{ textAlign: "center" }}>Overall Counts</h3>
                  <Pie data={dataCounts} />
                </Card>
                <Card style={{ width: "25rem" }}>
                  <h3 style={{ textAlign: "center" }}>RFP Analysis</h3>
                  <Pie data={dataForRFP} />
                </Card>
                <Card style={{ width: "25rem" }}>
                  <h3 style={{ textAlign: "center" }}>Bid Price</h3>
                  <Pie data={wonLostProposals} />
                </Card>
                <Card style={{ marginTop: "2rem", width: "76rem" }}>
                  <h3 style={{ textAlign: "center" }}>Budgets(Last 5 years)</h3>
                  <Line height={100} data={data} />
                </Card>
              </div>
              <div
                className="row body-2 d-flex justify-content-around"
                style={{ marginTop: "5vh" }}
              >
                <div
                  className="col-3 card d-flex align-items-center tableCont"
                  style={{
                    borderRadius: "1px",
                    width: "45%",
                    paddingTop: "0.8rem",
                    height: "55vh",
                    overflowY: "auto",
                    "box-shadow":
                      "1px 1px 1px 1px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <div style={{ textAlign: "center" }}>
                      <h2
                        style={{
                          textDecoration: "underline",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        My Focus
                      </h2>
                      <Button
                        onClick={handleShowAddTask}
                        style={{ display: "inline-block", float: "right" }}
                      >
                        +
                      </Button>
                    </div>

                    {/* <div className="container"> */}

                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <TabContext value={value1}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            centered
                            onChange={handleChange1}
                            aria-label=""
                          >
                            <Tab label="Employee Focus" value="1" />
                            <Tab label="Project Focus" value="3" />
                          </TabList>
                        </Box>
                        <TabPanel centered value="1">
                          <TableContainer
                            component={Paper}
                            style={{
                              "box-shadow":
                                "1px 1px 1px 1px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
                            }}
                          >
                            <Table
                              sx={{ minWidth: 750 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Title</TableCell>
                                  <TableCell>Priority</TableCell>
                                  <TableCell>% Complete</TableCell>
                                  <TableCell>Description</TableCell>
                                  <TableCell>Start Date</TableCell>
                                  <TableCell>Due Date</TableCell>
                                  <TableCell>Edit/Update</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {tasks.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>{row.Title}</TableCell>
                                    <TableCell>{row.Priority}</TableCell>
                                    <TableCell>
                                      {row.Percent_Completed}
                                    </TableCell>
                                    <TableCell>{row.Description}</TableCell>
                                    <TableCell>
                                      {row.Start_Date
                                        ? row.Start_Date.substring(0, 10)
                                        : ""}
                                    </TableCell>
                                    <TableCell>
                                      {row.Due_Date
                                        ? row.Due_Date.substring(0, 10)
                                        : ""}
                                    </TableCell>
                                    <TableCell>
                                      <svg
                                        width="40"
                                        height="40"
                                        viewBox="30 0 220 220"
                                      >
                                        <image
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            handleUpdate(row);
                                          }}
                                          href="data:image/png;base64,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"
                                        />
                                      </svg>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </TabPanel>
                        <TabPanel centered value="3">
                          <TableContainer
                            component={Paper}
                            style={{
                              "box-shadow":
                                "3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            }}
                          >
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="right">Title</TableCell>
                                  <TableCell align="right">
                                    Time Remaining
                                  </TableCell>
                                  <TableCell align="right">
                                    Description
                                  </TableCell>
                                  <TableCell align="right">
                                    Task Completed
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {projectTasks.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell align="right">
                                      {row.Title}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.Due_Date
                                        ? dhm(
                                            new Date(row.Due_Date).getTime() -
                                              new Date().getTime()
                                          )
                                          ? dhm(
                                              new Date(row.Due_Date).getTime() -
                                                new Date().getTime()
                                            )
                                          : "Missing"
                                        : ""}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.Description}
                                    </TableCell>
                                    {row.Title !== "Review RFP" ? (
                                      <TableCell align="right">
                                        <Button
                                          name={row.Title}
                                          value={row.Task_ID}
                                          onClick={handleSubmit}
                                        >
                                          Task Done
                                        </Button>
                                      </TableCell>
                                    ) : (
                                      ""
                                    )}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </TabPanel>
                      </TabContext>
                    </Box>
                    {/* </div> */}
                  </div>
                </div>
                <div
                  className="col-3 card d-flex align-items-center tableCont"
                  style={{
                    borderRadius: "1px",
                    overflowY: "auto",
                    width: "47%",
                    "box-shadow":
                      "1px 1px 1px 1px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <div style={{ textAlign: "center" }}>{<TestDemo />}</div>
                </div>
              </div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext centered value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      centered
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab style={{ color: "black" }} label="Forms" value="1" />
                      <Tab
                        style={{ color: "black" }}
                        label="Requests"
                        value="3"
                      />
                    </TabList>
                  </Box>
                  <TabPanel centered value="1"></TabPanel>
                  <TabPanel value="3"></TabPanel>
                </TabContext>
              </Box>
            </div>

            {/* TimeSheet Modal */}
            <Modal
              show={showTS}
              onHide={handleCloseTS}
              backdrop="static"
              size="lg"
              dialogClassName="modal-150w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title>TimeSheet</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ marginLeft: "0.5rem" }}>
                {<TimeSheet />}
              </Modal.Body>
            </Modal>

            {/* Add Task Modal */}
            <Modal
              show={showAddTask}
              onHide={handleCloseAddTask}
              size="lg"
              backdrop="static"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  <AddMyTask
                    setRed={setred}
                    setGreen={setgreen}
                    closeModal={handleCloseAddTask}
                    api={apiCall}
                    apiCall={setCall}
                  />
                }
              </Modal.Body>
            </Modal>
            <Modal
              show={showUpdate}
              onHide={handleCloseUpdate}
              backdrop="static"
              size="xl"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  <UpdateTask
                    row={rowData}
                    setRed={setred}
                    setGreen={setgreen}
                    closeModal={handleCloseUpdate}
                    api={apiCall}
                    apiCall={setCall}
                  />
                }
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
