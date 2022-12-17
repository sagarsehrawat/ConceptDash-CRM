import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
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
import BudgetUpdate from "../../Update/BudgetUpdate";
import RFPUpdate from "../../Update/RFPUpdate";
import ProposalsUpdate from "../../Update/ProposalsUpdate";
import ProjectUpdate from "../../Update/ProjectUpdate";
const Dashboard = () => {
  const [nav, setnav] = useState(0);
  const handleDash = (e) => {
    if (nav == 1) return <BudgetUpdate />;
    if (nav === 2) return <RFPUpdate />;
    if (nav === 3) return <ProposalsUpdate />;
    if (nav === 4) return <ProjectUpdate />;
  };

  const [value, setValue] = React.useState("1");
  const [tasks, settasks] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const navigate = useNavigate();
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
  }, []);
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
  const columns = [
    {
      dataField: "Task_ID",
      text: "Task ID",
      sort: true,
    },
    {
      dataField: "Title",
      text: "Title",
      // filter: textFilter()
    },
    {
      dataField: "Priority",
      text: "Priority",
      // filter: textFilter()
      sort: true,
    },
    {
      dataField: "Status",
      text: "Status",
      // filter: textFilter()
    },
    {
      dataField: "percentComplete",
      text: "% Completed",
      // filter: textFilter()
      sort: true,
    },
    {
      dataField: "Assigned_To",
      text: "Assigned To",
    },
    {
      dataField: "Description",
      text: "Description",
    },
    {
      dataField: "Start_Date",
      text: "Start Date",
    },
    {
      dataField: "Due_Date",
      text: "Due Date",
    },
    {
      dataField: "Completed_Date",
      text: "Completion Date",
    },
  ];
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
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="mainCont">
      <div className="container" style={{ minWidth: "80% !important", marginTop:'2rem' }}>
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

              <div className="">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value1}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList centered onChange={handleChange1} aria-label="">
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
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">Title</TableCell>
                              <TableCell align="right">Priority</TableCell>
                              <TableCell align="right">% Complete</TableCell>
                              <TableCell align="right">Description</TableCell>
                              <TableCell align="right">Start Date</TableCell>
                              <TableCell align="right">Due Date</TableCell>
                              <TableCell align="right">Edit/Update</TableCell>
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
                                <TableCell align="right">{row.Title}</TableCell>
                                <TableCell align="right">
                                  {row.Priority}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Percent_Completed}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Description}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Start_Date
                                    ? row.Start_Date.substring(0, 10)
                                    : ""}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Due_Date
                                    ? row.Due_Date.substring(0, 10)
                                    : ""}
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    className="allBtn"
                                    onClick={(e) => {
                                      navigate("/updateTask", { state: row });
                                    }}
                                    style={{
                                      backgroundColor: "#1a73e8",
                                      borderRadius: "25px",
                                      "box-shadow":
                                        "3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    }}
                                  >
                                    Edit
                                  </Button>
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
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">Title</TableCell>
                              <TableCell align="right">
                                Time Remaining
                              </TableCell>
                              <TableCell align="right">Description</TableCell>
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
                                <TableCell align="right">{row.Title}</TableCell>
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
              </div>
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
                <Tab style={{ color: "black" }} label="Requests" value="3" />
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
          <Modal.Title>Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginLeft: "0.5rem" }}>
          {<TimeSheet />}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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
        <Modal.Body>{<AddMyTask />}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
