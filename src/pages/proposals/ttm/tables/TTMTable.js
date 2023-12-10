import React, { useState, useEffect, useRef } from "react";
import "./TTMTable.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {
  HOST,
  GET_EMPLOYEENAMES,
  GET_TTM,
  UPDATE_TTM,
  PRIMARY_COLOR,
} from "../../../../Main/Constants/Constants";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import options from "../../../../Images/options.svg";
import tIcon from "../../../../Images/taskIcon.svg";
import NewTaskorMilestone from "../forms/NewTaskorMilestone";
import cross from "../../../../Images/cross.svg";
import moment from "moment";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFIcon from "../../../../components/ui/TFIcon/TFIcon";
import info from "../../../../assets/icons/Info.svg";
import TFOptionsModal from "../../../../components/modals/TFOptionsModal/TFOptionsModal";
import TFInput from "../../../../components/form/TFInput/TFInput";

function TTMTable(props) {
  const { Name, Id } = props;
  const [change, setchange] = useState(false);
  const [show, setShow] = useState(false);
  const handleCloseStage1 = () => setShow(false);
  const handleShowStage1 = () => setShow(true);
  const tableRef = useRef(null);

  const [openAddTask, setopenAddTask] = useState(false);
  const handleOpenAddTask = () => setopenAddTask(true);
  const handleCloseAddTask = () => setopenAddTask(false);

  const [openDesignTeam, setopenDesignTeam] = useState(false);
  const handleOpenDesignTeam = () => setopenDesignTeam(true);
  const handleCloseDesignTeam = () => setopenDesignTeam(false);

  const [openContractAdmin, setopenContractAdmin] = useState(false);
  const handleOpenContractAdmin = () => setopenContractAdmin(true);
  const handleCloseContractAdmin = () => setopenContractAdmin(false);

  const [openNewTaskMile, setopenNewTaskMile] = useState(false);
  const handleOpenNewTaskMile = () => setopenNewTaskMile(true);
  const handleCloseNewTaskMile = () => setopenNewTaskMile(false);

  const [a, seta] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [editingData, seteditingData] = useState([]);
  const [emps, setemps] = useState([]);
  const [rate, setrate] = useState([]);
  const [designations, setdesignations] = useState([]);
  const [childArr, setchildArr] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_TTM, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            proposalId: Id,
          },
        })
        .then((res) => {
          // console.log(JSON.parse(res.data.res[0].Designations))
          let data = JSON.parse(res.data.res[0].Data);
          let empIDs = JSON.parse(res.data.res[0].Employee_Info)[0];
          let hrRates = JSON.parse(res.data.res[0].Employee_Info)[1];
          let consultantNames = JSON.parse(res.data.res[0].Employee_Info).length===3 ? JSON.parse(res.data.res[0].Employee_Info)[2]:[];
          let desigs = JSON.parse(res.data.res[0].Designations);
          formChildArr(desigs);
          setemps(empIDs);
          setrate(hrRates);
          seteditingData(data);
          setdesignations(desigs);
          calculateTotalHrs(data);
          calcTotalLabour(data);
          setConsultants(consultantNames);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, [a]);
  const formChildArr = (desigs) => {
    let arr = [];
    desigs.map((e) => {
      {
        e.children.map((f) => {
          arr.push(f);
        });
      }
    });
    setchildArr(arr);
  };
  const style = {
    input: {
      border: "none",
      boxShadow: "none",
      outline: "none",
      width: "100%",
      display: "inline",
      background: "rgb(0 0 0 / 0%)",
      // padding: "12px 0px",
      textAlign: "center",
      ":focus": {
        border: "5px solid black",
        // boxShadow: "none",
        outline: "none",
      },
    },
  };
  const buttonStyle = {
    backgroundColor: "#dddfeb", // Background color
    color: "white", // Text color
    padding: "4px 8px", // Padding for the button
    borderRadius: "4px", // Rounded corners
    cursor: "pointer", // Change cursor on hover
  };

  const calculateEndDate = (startDate, duration) => {
    startDate = moment(startDate);
    const endDate = startDate.add(duration, "days");
    return endDate;
  };

  const [totalHrs, settotalHrs] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const calcTotalLabour = (data) => {
    data.map((e) => {
      e.subtasks.map((h, idx) => {
        let sum = 0;
        for (let i = 0; i < h.hrs.length; i++) {
          sum += h.hrs[i] * rate[i];
        }
      });
    });
  };
  // console.log(totalLabour)
  // console.log(rate)

  const handleAddTaskStage1 = async (e, pId) => {
    setisLoading(true);
    let val = e.target.value;
    let prevVal = editingData[pId].subtasks[val].visibility;
    editingData[pId].subtasks[val].visibility = !prevVal;
    setchange(true);
    setisLoading(false);
  };
  const handleHRchange = (a, b, c, d, e) => {
    if (e === "hrs") {
      let value = d.target.value;
      let h = [...editingData];
      h[a].subtasks[b].hrs[c] = parseInt(value ? value : 0);
      setchange(true);
      calculateTotalHrs(h);
      seteditingData(h);
    } else if (e === "consultants") {
      let value = d.target.value;
      let h = [...editingData];
      h[a].subtasks[b].subConsultants[c] = parseInt(value ? value : 0);
      setchange(true);
      seteditingData(h);
    }
  };
  const handleChangeEmployee = (a, b, c) => {
    if (c === "employee") {
      let value = a.target.value;
      let h = [...emps];
      h[b] = value;
      setchange(true);
      setemps(h);
    } else if (c === "consultants") {
      let value = a.target.value;
      let h = [...consultants];
      h[b] = value;
      setchange(true);
      setConsultants(h);
    }
  };
  const handleChangeRate = (a, b) => {
    let value = a.target.value;
    let h = [...rate];
    h[b] = parseInt(value);
    setchange(true);
    setrate(h);
  };
  let span = 13;

  const getDurationInDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = Math.abs(end - start);
    const durationInDays = Math.round(durationInMilliseconds / oneDay);
    return durationInDays;
  };
  const handleDatesChange = (e, time, p, c) => {
    let h = [...editingData];
    if (time === "start") {
      h[p].subtasks[c].StartDate = e.toString();
    } else if (time === "end") {
      let val = e.diff(h[p].subtasks[c].StartDate, "days");
      h[p].subtasks[c].Duration = val;
    }
    setchange(true);
    seteditingData(h);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setchange(!change);
    await axios
      .post(
        HOST + UPDATE_TTM,
        {
          data: JSON.stringify(editingData),
          employeeInfo: JSON.stringify([emps, rate, consultants]),
          designations: JSON.stringify(designations),
          proposalId: Id,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        if (res.data.success) {
          // setsubmitLoading(false)
          seta(a + 1);
        }
        // seteditProfile(false);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const styles = {
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
      textAlign: "center",
      marginTop: "20px",
      marginLeft: "25px",
    },
    addButton: {
      marginRight: "2vw",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 16px",
      gap: "8px",
      // width: "177px",
      height: "36px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "5px",
    },
    addButtonText: {
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
    addModal: {
      position: "absolute",
      width: "428px",
      height: "355px",
      left: "40%",
      marginTop: "24vh",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
    },
    addHeading: {
      // width: "auto",
      height: "28px",
      marginLeft: "8px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
      // marginTop:'12px'
    },
    formHeadings: {
      color: "var(--Black-text, #3D424F)",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "20px" /* 142857% */,
      height: "40px",
      width: "176px",
      padding: "10px var(--12-pad, 12px)",
      textAlign: "center",
      borderRadius: "0px 24px 24px 0px",
      borderTop: "1px solid #EBEDF8",
      borderRight: "1px solid #EBEDF8",
      borderLeft: "1px solid #EBEDF8",
      borderBottom: "1px solid #EBEDF8",
      background: "#FFF",
    },
  };

  const [selectHeading, setselectHeading] = useState(0);

  const [currStatus, setcurrStatus] = useState("");
  const [id, setid] = useState([0, 0]);

  //Status Update Modal
  const [statusModal, setstatusModal] = useState(false);
  const closestatusModal = () => setstatusModal(false);
  const openstatusModal = () => setstatusModal(true);

  const updateStatus = (name, value) => {
    let h = [...editingData];
    h[id[0]].subtasks[id[1]].status =
      value === "Not Started" ? 0 : value === "In Progress" ? 1 : 2;
    seteditingData(h);
    setchange(true);
  };
  const [hrSum, sethrSum] = useState(0);
  const calculateTotalHrs = (data) => {
    let maxHrsLength = 0;
    data.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        maxHrsLength = Math.max(maxHrsLength, subtask.hrs.length);
      });
    });

    const totalHr = Array.from({ length: maxHrsLength }, () => 0);

    data.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        subtask.hrs.forEach((value, index) => {
          totalHr[index] += value;
        });
      });
    });

    let sum = 0;
    for (let i = 0; i < totalHr.length; i++) {
      sum += parseInt(totalHr[i]);
    }
    sethrSum(sum);
    settotalHrs(totalHr);
  };

  const handleDurationChange = (p, c, e) => {
    let value = e.target.value;
    let h = [...editingData];
    h[p].subtasks[c].Duration = parseInt(value ? value : 0);
    setchange(true);
    seteditingData(h);
  };
  
  const findWidth = (x) => {
    let width = 12 * x;
    return `${width}vw`;
  };
  const removeDesignation = (idx, cid) => {
    let arr = [...designations];
    idx++;
    let c = 0;
    let save;
    for (let i = 0; i < arr.length; i++) {
      c += arr[i].children.length;
      if (c >= idx) {
        save = i;
        break;
      }
    }
    let removeVal = idx - (c - arr[save].children.length);
    arr[save].children.splice(removeVal - 1, 1);
    let p = [...emps];
    p.splice(idx - 1, 1);

    let r = [...rate];
    r.splice(idx - 1, 1);

    let h = [...editingData];
    h.map((f) => {
      f.subtasks.map((e) => {
        e.hrs.splice(idx - 1, 1);
      });
    });

    let hr = [...totalHrs];
    hr.splice(idx - 1, 1);

    setemps(p);
    setrate(r);
    seteditingData(h);
    setdesignations(arr);
    formChildArr(arr);
    settotalHrs(hr);
    setchange(true)
  };

  const sumTaskHrs = (arr) => {
    let sum = 0;
    arr.map((e) => {
      sum += e;
    });
    return sum;
  };

  const [selectedMilestone, setseletedMilestone] = useState();

  const findMilestoneStatus = (e) => {
    let notStarted = 0,
      inProgress = 0,
      completed = 0,
      len = 0;
    e.map((task) => {
      if (task.visibility) {
        len++;
        if (task.status === 0) notStarted++;
        else if (task.status === 1) inProgress++;
        else if (task.status === 2) completed++;
      }
    });
    if (notStarted === len) return 0;
    else if (completed === len) return 2;
    else return 1;
  };

  const findStartDate = (e) => {
    if (e.length == 0) return null;
    let dates = [];
    e.map((task) => {
      if (task.visibility) dates.push(task.StartDate);
    });
    if (dates.length === 0) return null;
    const datesList = dates.map((dateString) => moment(dateString));
    const minDate = moment.min(datesList);
    return minDate.format("DD MMM YYYY");
  };

  const findEndDate = (e) => {
    if (e.length == 0) return null;
    let dates = [];
    e.map((task) => {
      if (task.visibility) {
        const date = moment(task.StartDate);
        const newDate = date.add(task.Duration, "days");
        dates.push(newDate);
      }
    });
    if (dates.length === 0) return null;
    const datesList = dates.map((dateString) => moment(dateString));
    const maxDate = moment.max(datesList);
    return maxDate.format("DD MMM YYYY");
  };

  const calculateDuration = (a, b) => {
    if (!b || !a) return 0;
    const aMoment = moment(a);
    const bMoment = moment(b);
    const duration = Math.abs(aMoment.diff(bMoment, "days"));
    return duration;
  };

  const [hoverTaskId, setHoverTaskId] = useState(null);
  const [hoverDesigName, setHoverDesigName] = useState(null);

  const handleDesignationNameChange = (key, value, idx) => {
    let arr = [...designations];
    idx++;
    let c = 0;
    let save;
    for (let i = 0; i < arr.length; i++) {
      c += arr[i].children.length;
      if (c >= idx) {
        save = i;
        break;
      }
    }
    let desig = idx - (c - arr[save].children.length);
    arr[save].children[idx-1] = value;
    setdesignations(arr);
    formChildArr(arr);
    setchange(true)
  }
  
  const addDesignation = (idx) => {
    let arr = [...designations];
    idx++;
    let c = 0;
    let save;
    for (let i = 0; i < arr.length; i++) {
      c += arr[i].children.length;
      if (c >= idx) {
        save = i;
        break;
      }
    }
    let desig = idx - (c - arr[save].children.length);
    arr[save].children.splice(idx, 0, "New");
    let h = [...editingData];
    h.map((f) => {
      f.subtasks.map((e) => {
        e.hrs.splice(idx, 0, 0);
      });
    });

    let p = [...emps];
    p.splice(idx, 0, "");

    let r = [...rate];
    r.splice(idx, 0, 0);

    let hr = [...totalHrs];
    hr.splice(idx, 0, 0);

    setemps(p);
    settotalHrs(hr);
    setrate(r);
    seteditingData(h);
    setdesignations(arr);
    formChildArr(arr);
    setchange(true);
  }

  const handleNameChange = (key, value, name, parent, child) => {
    let h = [...editingData];
    if (name === "task") {
      h[parent].TaskName = value;
    } else if (name === "subTask") {
      h[parent].subtasks[child].TaskName = value;
    }
    seteditingData(h);
    setchange(true);
  };

  const options = document.getElementById('options-modal');

  const handleDeleteTaskMileStone = (pid, cid) =>{
    let h = [...editingData]
    h = h.filter(obj => obj.parentID !== id);
    seteditingData(h);
    setchange(true)
  }

  const handleDeleteTask = (parentID, childId) =>{
    let h = [...editingData]
    h.map((e)=>{
      if(e.parentID===parentID) e.subtasks.splice(childId, 1);
    })
    seteditingData(h);
    setchange(true)
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="tableHeader d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="tableHeaderText">{Name}</div>
          {change ? (
            <div className="unsaved-text">You have some unsaved changes!</div>
          ) : (
            <></>
          )}
        </div>

        {change ? (
          <button style={styles.addButton} onClick={handleSubmit}>
            <p style={styles.addButtonText}>Save Changes</p>
          </button>
        ) : (
          <></>
        )}
      </div>

      {/* First four rows table */}
      <div className="tableFixHead">
        <table className="table table-bordered">
          <thead>
            <tr style={{ zIndex: "9" }}>
              <th className="normals th" style={{ verticalAlign: "middle" }}>
                Project Department
              </th>
              <th
                className="normals th"
                style={{
                  background: "white",
                  verticalAlign: "middle",
                  width: "36vw",
                }}
                colSpan={4}
              >
                Timelines
              </th>
              {designations.map((e, idx) => {
                return (
                  <>
                  <th
                      style={{
                        width: findWidth(e.children.length),
                        background: "white",
                        verticalAlign: "middle",
                      }}
                      className="normals th"
                      colSpan={e.children.length}
                    >
                      {e.Designation}
                    </th>
                  </>
                );
              })}
              <th
                style={{
                  width: "12vw",
                  background: "white",
                  verticalAlign: "middle",
                }}
                className="normals th"
              >
                Hrs
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="normals td" style={{ verticalAlign: "middle" }}>
                Designation
              </td>
              <td
                className="normals td"
                rowSpan={3}
                style={{ verticalAlign: "middle", background: "white" }}
              >
                Status
              </td>
              <td
                className="normals td"
                rowSpan={3}
                style={{ verticalAlign: "middle", background: "white" }}
              >
                Start Date
              </td>
              <td
                className="normals td"
                rowSpan={3}
                style={{ verticalAlign: "middle", background: "white" }}
              >
                End Date
              </td>
              <td
                className="normals td"
                rowSpan={3}
                style={{ verticalAlign: "middle", background: "white" }}
              >
                Duration (Days)
              </td>
              {childArr.map((e, idx) => {
                return (
                  <>
                    <td
                      onMouseOut={() => options?console.log(1):setHoverDesigName(null)}
                      onMouseOver={() => setHoverDesigName(e)}
                      style={{ background: "white", verticalAlign: "middle" }}
                      className="normals td"
                    >
                      <div className="d-flex d-row justify-content-between">

                      <TFInput
                        onChange={(key, value) =>
                          handleDesignationNameChange(
                            key,
                            value,
                            idx
                          )
                        }
                        value={e}
                        width="130px"
                      />
                      <TFOptionsModal addDesignation={addDesignation} deleteFunction={removeDesignation} pid={idx} cid={null} type='desigs' visible={hoverDesigName === e} />
                      </div>
                    </td>
                  </>
                );
              })}
              <td
                className="normals td"
                rowSpan={3}
                style={{ verticalAlign: "middle", background: "#DBDBF4" }}
              >
                Total Hrs
              </td>
              {/* <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'#DBDBF4'}}>Labour Fees($)</td> */}
            </tr>
            <tr className="tr">
              <td
                style={{ zIndex: "6", background: "white" }}
                className="normals td"
              >
                People
              </td>
              {emps.map((e, idx) => {
                return (
                  <td className="specials td">
                    <input
                      type="text"
                      className="no-focus"
                      placeholder="Name"
                      style={{ ...style.input, display: "inline" }}
                      value={e ? e : ""}
                      onChange={(eve) =>
                        handleChangeEmployee(eve, idx, "employee")
                      }
                    />
                  </td>
                );
              })}
              {consultants.map((e, idx) => {
                return (
                  <td className="specials td">
                    <input
                      type="text"
                      className="no-focus"
                      placeholder="Name"
                      style={{ ...style.input, display: "inline" }}
                      value={e ? e : ""}
                      onChange={(eve) =>
                        handleChangeEmployee(eve, idx, "consultants")
                      }
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="normals td">Rate Per Hour</td>
              {rate.map((e, idx) => {
                return (
                  <td className="specials td" style={{ background: "white" }}>
                    {e ? <p style={{ display: "inline" }}>$ </p> : ""}
                    <input
                      className="no-focus"
                      placeholder="$ 0"
                      style={{ ...style.input, width: e ? "35px" : "100%" }}
                      value={e ? e : ""}
                      onChange={(eve) => handleChangeRate(eve, idx)}
                    />
                  </td>
                );
              })}
            </tr>
            {editingData ? (
              editingData.map((e) => {
                return (
                  <>
                    <tr>
                      <td
                        onMouseOut={() => options?console.log(1):setHoverTaskId(null)}
                        onMouseOver={() => setHoverTaskId(e.TaskID)}
                        className="td"
                        style={{
                          height: "38px",
                          textAlign: "left",
                          color: " var(--black-text, #0A0A0A)",
                          fontSize: "13px",
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "20px",
                          backgroundColor: "white",
                        }}
                      >
                        <div className="d-flex flex-row justify-content-between">
                          <div>
                            <TFInput
                              onChange={(key, value) =>
                                handleNameChange(
                                  key,
                                  value,
                                  "task",
                                  e.parentID,
                                  null
                                )
                              }
                              value={e.TaskName}
                              width="320px"
                            />
                          </div>
                          <TFOptionsModal addDesignation={null} deleteFunction={handleDeleteTaskMileStone} pid={e.parentID} cid={null} type='tasks' visible={hoverTaskId === e.TaskID} />
                        </div>
                      </td>
                      <td style={{ background: "white" }} className="td">
                        <div>
                          {findMilestoneStatus(e.subtasks) === 0 ? (
                            <TFChip value="Not Started" />
                          ) : findMilestoneStatus(e.subtasks) === 1 ? (
                            <TFChip value="In Progress" />
                          ) : findMilestoneStatus(e.subtasks) === 2 ? (
                            <TFChip value="Completed" />
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "15px",
                          background: "white",
                        }}
                        className="td no-focus"
                      >
                        <TFDateChip
                          value={findStartDate(e.subtasks)}
                          name={e.TaskID}
                        />
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "15px",
                          background: "white",
                        }}
                        className="td no-focus"
                      >
                        <TFDateChip
                          value={findEndDate(e.subtasks)}
                          name={e.TaskID}
                        />
                      </td>
                      <td
                        style={{
                          paddingLeft: "12px",
                          width: "fit-content",
                          textAlign: "center",
                          background: "white",
                        }}
                        className="td no-focus"
                      >
                        {calculateDuration(
                          findStartDate(e.subtasks),
                          findEndDate(e.subtasks)
                        )}
                      </td>
                      <td
                        colSpan={childArr.length + 2}
                        style={{ background: "white" }}
                        className="td"
                      ></td>
                    </tr>
                    {e.subtasks.map((task) => {
                      return (
                        <>
                          {task.visibility ? (
                            <tr className="">
                              <td
                                style={{ paddingLeft: "32px" }}
                                className="td"
                                onMouseOut={() => options?console.log(1):setHoverTaskId(null)}
                                onMouseOver={() => setHoverTaskId(task.TaskID)}
                              >
                                <div className="d-flex flex-row justify-content-between">
                                  <div>
                                    <TFInput
                                      onChange={(key, value) =>
                                        handleNameChange(
                                          key,
                                          value,
                                          "subTask",
                                          e.parentID,
                                          task.childId
                                        )
                                      }
                                      value={task.TaskName}
                                      width="320px"
                                    />
                                  </div>
                                  <TFOptionsModal
                                    addDesignation={null}
                                    deleteFunction={handleDeleteTask}
                                    pid={e.parentID}
                                    cid={task.childId}
                                    visible={hoverTaskId === task.TaskID}
                                    type='tasks'
                                  />
                                </div>
                              </td>
                              <td
                                style={{ background: "white" }}
                                className="td"
                              >
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setid([e.parentID, task.childId]);
                                  }}
                                >
                                  <TFChip
                                    value={
                                      task.status === 0
                                        ? "Not Started"
                                        : task.status === 1
                                        ? "In Progress"
                                        : "Completed"
                                    }
                                    options={[
                                      "Not Started",
                                      "In Progress",
                                      "Completed",
                                    ]}
                                    name={task.TaskID}
                                    onChange={updateStatus}
                                  />
                                </div>
                              </td>
                              <td
                                style={{
                                  paddingLeft: "12px",
                                  width: "fit-content",
                                  textAlign: "center",
                                  background: "white",
                                }}
                                className="td no-focus"
                              >
                                <TFDateChip
                                  value={task.StartDate}
                                  name={task.TaskID}
                                  onChange={(name, value) =>
                                    handleDatesChange(
                                      value,
                                      "start",
                                      e.parentID,
                                      task.childId
                                    )
                                  }
                                />
                              </td>
                              <td
                                style={{
                                  paddingLeft: "12px",
                                  width: "fit-content",
                                  textAlign: "center",
                                  background: "white",
                                }}
                                className="td no-focus"
                              >
                                <TFDateChip
                                  value={moment(task.StartDate).add(
                                    task.Duration,
                                    "days"
                                  )}
                                  name={task.TaskID}
                                  onChange={(name, value) =>
                                    handleDatesChange(
                                      value,
                                      "end",
                                      e.parentID,
                                      task.childId
                                    )
                                  }
                                />
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  background: "white",
                                }}
                                className="td"
                              >
                                <input
                                  className="no-focus"
                                  placeholder="0"
                                  style={{ ...style.input }}
                                  value={Math.ceil(task.Duration)}
                                  onChange={(eve) =>
                                    handleDurationChange(
                                      e.parentID,
                                      task.childId,
                                      eve
                                    )
                                  }
                                />
                              </td>
                              {task.hrs.map((h, idx) => {
                                return (
                                  <td style={{ background: "white" }}>
                                    <input
                                      className="no-focus"
                                      placeholder="0 hr"
                                      style={{
                                        ...style.input,
                                        width: h ? "50%" : "100%",
                                        paddingLeft: h ? "3.6vw" : "0",
                                      }}
                                      value={h ? h : ""}
                                      onChange={(eve) =>
                                        handleHRchange(
                                          e.parentID,
                                          task.childId,
                                          idx,
                                          eve,
                                          "hrs"
                                        )
                                      }
                                    />
                                    {h ? (
                                      <p style={{ display: "inline" }}> hr</p>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                );
                              })}
                              {task.subConsultants?task.subConsultants.map((h, idx) => {
                                return (
                                  <td style={{ background: "white" }}>
                                    <input
                                      className="no-focus"
                                      placeholder="0 hr"
                                      style={{
                                        ...style.input,
                                        width: h ? "50%" : "100%",
                                        paddingLeft: h ? "3.6vw" : "0",
                                      }}
                                      value={h ? h : ""}
                                      onChange={(eve) =>
                                        handleHRchange(
                                          e.parentID,
                                          task.childId,
                                          idx,
                                          eve,
                                          "consultants"
                                        )
                                      }
                                    />
                                    {h ? (
                                      <p style={{ display: "inline" }}> hr</p>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                );
                              }):<></>}
                              <td
                                style={{
                                  paddingLeft: "32px",
                                  zIndex: "6",
                                  background: "#DBDBF4",
                                }}
                                className="td"
                              >
                                {sumTaskHrs(task.hrs)} hr
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                    {
                      <tr>
                        <td
                          className="td"
                          style={{
                            height: "38px",
                            textAlign: "left",
                            color: "var(--dark-grey, #70757A)",
                            fontSize: "13px",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "20px",
                            backgroundColor: "#FFF",
                          }}
                        >
                          <div
                            onClick={() => {
                              handleOpenNewTaskMile();
                              setseletedMilestone(e.parentID);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Add Task/Milestone +
                          </div>
                        </td>
                        <td className="td" colSpan={childArr.length + 6}></td>
                      </tr>
                    }
                  </>
                );
              })
            ) : (
              <></>
            )}
            <tr className="tr" style={{ zIndex: "3", background: "#DBDBF4" }}>
              <td className="td" style={{ zIndex: "3", background: "#DBDBF4" }}>
                Totals
              </td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              {totalHrs.map((e, idx) => {
                return (
                  <td
                    className="td"
                    style={{ background: "#DBDBF4", zIndex: "2" }}
                  >
                    {e}
                  </td>
                );
              })}
            </tr>
            <tr className="tr" style={{ zIndex: "2" }}>
              <td className="td" style={{ zIndex: "2", background: "#DBDBF4" }}>
                Total Fees
              </td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              {totalHrs.map((e, idx) => {
                return (
                  <td
                    className="td"
                    style={{ background: "#DBDBF4", zIndex: "1" }}
                  >
                    $ {(e * rate[idx]).toFixed(2)}
                  </td>
                );
              })}
            </tr>
            <tr className="tr" style={{ zIndex: "1" }}>
              <td className="td" style={{ zIndex: "1", background: "#DBDBF4" }}>
                Time Percentage
              </td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              <td className="td" style={{ background: "#DBDBF4" }}></td>
              {totalHrs.map((e, idx) => {
                return (
                  <td
                    className="td"
                    style={{ background: "#DBDBF4", zIndex: "0.5" }}
                  >
                    {hrSum > 0 ? ((e / hrSum) * 100).toFixed(2) : 0}%
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        show={openNewTaskMile}
        onHide={handleCloseNewTaskMile}
        style={styles.addModal}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div
          className="d-flex flex-row justify-content-between align-items-center"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            flexDirection: "row",
            width: "428px",
          }}
        >
          <div className="d-flex flex-row">
            <img src={tIcon} />
            <div style={styles.addHeading}>Add New Task</div>
          </div>
          <div>
            <img
              onClick={handleCloseNewTaskMile}
              style={{ marginRight: "36px", marginTop: "6px", float: "right" }}
              src={cross}
            />
          </div>
        </div>
        <div style={{ height: "306px" }}>
          {
            <NewTaskorMilestone
              selectedMilestone={selectedMilestone}
              data={editingData}
              seteditingData={seteditingData}
              change={change}
              setchange={setchange}
              show={openNewTaskMile}
              setshow={handleCloseNewTaskMile}
            />
          }
        </div>
      </Modal>
    </div>
  );
}

export default TTMTable;
