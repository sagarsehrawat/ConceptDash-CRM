import { faCalendarDays, faChevronDown, faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import AuthenticationContext from '../../Context/AuthContext'
import LoadingSpinner from '../Loader/Loader'
import moment from 'moment'
import axios from 'axios'
import { ADD_TIMESHEET, GET_EMPLOYEENAMES, GET_WEEKLY_TIMESHEET, HOST, PRIMARY_COLOR } from '../Constants/Constants'
import GreenAlert from '../Loader/GreenAlert'
import RedAlert from '../Loader/RedAlert'
import { Modal } from 'react-bootstrap'
import AddTask from '../../pages/tasks/forms/AddTask'
import cross from '../../Images/cross.svg'
import tIcon from '../../Images/taskIcon.svg'

const TimeSheet = (props) => {
  const { isCollapsed } = props
  const { privileges, setPrivileges } = useContext(AuthenticationContext)
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [hours, sethours] = useState({
    Projects: [],
    Proposals: [],
    General: [],
    RFP: [],
    HR: [],
    Finance: []
  });
  const [prevHours, setprevHours] = useState(null);
  const [details, setdetails] = useState([true, true, true, true, true, true])
  const [date, setdate] = useState(moment());

  const [employees, setemployees] = useState([]);
  const [employeeId, setemployeeId] = useState(localStorage.getItem('employeeId'));

  const [isLoading, setIsLoading] = useState(false);

  const [timerId, setTimerId] = useState(null);

  //Add Form Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const styles = {
    searchInputContainer: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "8px 8px 8px 12px",
      gap: "4px",
      width: "194px",
      height: "36px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px 0px 0px 6px",
    },
    searchButton: {
      width: "30px",
      height: "36px",
      background: "#D9D9D9",
      borderRadius: "0px 6px 6px 0px",
      marginRight: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      boxShadow: "none"
    },
    addButton: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 16px",
      gap: "8px",
      width: "142px",
      height: "40px",
      background: "#FFFFFF",
      border: "1px solid #7367F0",
      boxShadow: "0px 4px 8px rgba(195, 195, 198, 0.25)",
      borderRadius: "5px",
      color: "#7367F0"
    },
    employeeDropdown: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "164px",
      height: "36px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      outline: "none"
    },
    tableHeader: {
      background: "#F7F7F9",
      borderWidth: "1px 0px 0px 0px",
      borderStyle: "solid",
      borderColor: "#EBE9F1",
      padding: "13px 32px 0px 32px",
      height: "35px",
      zIndex: "1",
      position: "relative"
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
      textAlign: "center"
    },
    tableBody: {
      background: "#FFFFFF",

    },
    row2: {
      height: "44px",
      background: "#FFFFFF",
      borderBottom: "1px solid #EBE9F1",
    },
    cell: {
      height: "44px",
      textAlign: "center",
      borderBottom: "1px solid #EBE9F1",
      borderRight: "1px solid #EBE9F1",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "13px"
    },
    input: {
      border: "none",
      boxShadow: "none",
      outline: "none",
      width: "30px",
      display: "inline",
      background: "white",
      padding: "12px 0px",
      ':focus': {
        border: "none",
        boxShadow: "none",
        outline: "none",
      }
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
  }

  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          let id = localStorage.getItem('employeeId')
          let arr = res.data.res.filter(e => (parseInt(id) !== e.employee_id))
          setemployees(arr)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    call()
  }, [])


  useEffect(() => {
    const call = async () => {
      setIsLoading(true)
      await axios
        .get(HOST + GET_WEEKLY_TIMESHEET, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            employeeid: employeeId,
            startdate: date.clone().startOf('isoweek').format('YYYY-MM-DD')
          },
        })
        .then((res) => {
          console.log(res.data.res)
          let h = {
            Projects: [],
            Proposals: [],
            General: [],
            RFP: [],
            HR: [],
            Finance: []
          };
          res.data.res.map(e => {
            let arr = []
            for (let i = 0; i < 7; i++) {
              if (e.timesheet[i] === null) {
                arr.push("");
                continue;
              }
              let [hr, min, sec] = e.timesheet[i].split(":")
              hr = parseInt(hr);
              min = parseInt(min);
              if (min === 0) {
                arr.push(`${hr}:00`)
              } else {
                arr.push(`${hr}:${min}`)
              }
            }
            if (e.type === "Projects" || e.type === "Proposals" || e.type === "RFP") arr.push(e.project_name ?? "")
            else arr.push("")
            arr.push(e.title)
            arr.push(e.task_id)
            h[e.type].push(arr)
          })
          sethours(h)
          h = JSON.parse(JSON.stringify(h))
          setprevHours(h)
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err);
        });
    }
    call()
  }, [apiCall])


  const handleChange = (e, row, col, val, taskId, date) => {
    const h = { ...hours };
    let value = val.target.value
    h[e][row][col] = value;
    sethours(h)
    if (timerId) {
      clearTimeout(timerId); // cancel previous timer
    }
    setTimerId(setTimeout(() => {
      timeAPI(e, row, col, taskId, date, value)
    }, 1500));
  }

  const getDayTotal = (idx) => {
    if (idx === 7)
      return addTime([
        ...hours.Projects.map(e => addTime(e.slice(0, 7))),
        ...hours.Proposals.map(e => addTime(e.slice(0, 7))),
        ...hours.RFP.map(e => addTime(e.slice(0, 7))),
        ...hours.Finance.map(e => addTime(e.slice(0, 7))),
        ...hours.HR.map(e => addTime(e.slice(0, 7))),
        ...hours.General.map(e => addTime(e.slice(0, 7))),
      ])
    return addTime([
      ...hours.Projects.map(e => (e[idx])),
      ...hours.Proposals.map(e => (e[idx])),
      ...hours.RFP.map(e => (e[idx])),
      ...hours.Finance.map(e => (e[idx])),
      ...hours.HR.map(e => (e[idx])),
      ...hours.General.map(e => (e[idx]))
    ])
  }

  const addTime = (times) => {
    let totalMinutes = 0;
    for (let i = 0; i < times.length; i++) {
      let time = times[i];
      if (time) {
        let [hours, minutes] = time.split(':');
        totalMinutes += parseInt(hours) * 60 + parseInt(minutes);
      }
    }
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  const timeAPI = async (e, row, col, taskId, date, time) => {
    if (/^\d+$/.test(time)) {
      if (parseInt(time) === 0 || parseInt(time) > 9) time = null
      else time = parseInt(time) + ':00' ;
    } else if (/^\d+:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(':');
      if (hours === 0 || hours > 9 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
        time = null
      }
    } else if (time === '') {
      time = ''
    } else {
      time = null
    }

    const h = { ...hours };
    h[e][row][col] = time !== null ? time : prevHours[e][row][col]
    sethours(h)
    if (time === null) return;

    await axios
      .post(HOST + ADD_TIMESHEET,
        {
          employeeId: employeeId,
          time: time === '' ? '' : `0${time}:00`,
          date: date,
          column: col,
          taskId: taskId
        },
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        },

      )
      .then((res) => {
        if (!res.data.success) {
          h[e][row][col] = prevHours[e][row][col]
          sethours(h)
          setred(true)
        } else {
          setprevHours(h)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {/* Header Buttons and Dropdowns */}
      <div className='d-flex flex-row justify-content-between align-items-center' style={{ marginLeft: "32px", marginRight: "32px", marginTop: "20px", marginBottom: "32px" }}>
        <div className='d-flex flex-row'>
          <select style={styles.employeeDropdown} onChange={(e) => { setemployeeId(e.target.value); setCall(apiCall + 1); }} disabled={!privileges.includes('View Employee Timesheet')}>
            <option value={localStorage.getItem('employeeId')}>My Timesheet</option>
            {employees.map(e => (
              <option value={e.Employee_ID}>{e.Full_Name}</option>
            ))}
          </select>
        </div>
        <button style={styles.addButton} onClick={handleShow}>+ Add New Task</button>
      </div>

      {/* Table Header */}
      <div style={styles.tableHeader} className='d-flex flex-row justify-content-start align-items-center'>
        <FontAwesomeIcon icon={faChevronLeft} color={PRIMARY_COLOR} style={{ cursor: "pointer", marginRight: "18px" }} onClick={(e) => { setdate(date.clone().subtract(7, 'days')); setCall(apiCall + 1) }} />
        <FontAwesomeIcon icon={faCalendarDays} color={PRIMARY_COLOR} style={{ marginRight: "10px" }} />
        <div style={{ width: "0px", height: "22px", border: "1px solid #EBE9F1", marginRight: "8px" }}></div>
        <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", marginRight: "16px" }}>{`${date.clone().startOf('isoWeek').format('DD')} - ${date.clone().startOf('isoWeek').add(6, 'days').format('DD MMM, YYYY')}`}</p>
        <FontAwesomeIcon icon={faChevronRight} color={PRIMARY_COLOR} style={{ cursor: "pointer", marginRight: "18px" }} onClick={(e) => { setdate(date.clone().add(7, 'days')); setCall(apiCall + 1) }} />
      </div>

      {/* Table */}
      <div style={{ borderBottom: "1px solid #EBE9F1", height: "548px", overflow: "auto", position: "relative" }}>
        <table style={styles.table} className='rfp-table'>
          <thead style={styles.tableHeader2}>
            <tr>
              <th scope="col" style={{ ...styles.tableHeading, width: "250px", borderBottom: "1px solid #EBE9F1", textAlign: "left", paddingLeft: "32px" }} className='fixed-header'>Tasks</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').add(1, 'days').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').add(2, 'days').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').add(3, 'days').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').add(4, 'days').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').add(5, 'days').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>{date.clone().startOf('isoWeek').add(6, 'days').format('D ddd')}</th>
              <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>Total</th>
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
                {hours.Projects.length === 0 ? <></> :
                  <>
                    <tr>
                      <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [!prev[0], ...prev.slice(1)])} >
                        <FontAwesomeIcon icon={details[0] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                        Projects
                      </td>
                    </tr>
                    {details[0] ? hours.Projects.map((e, idx) => (
                      <tr style={styles.row2} id={idx}>
                        <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e[7]}</p>&nbsp;&nbsp;
                          <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e[8]}</p>
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][0] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][0]}
                            onChange={(eve) => handleChange("Projects", idx, 0, eve, e[9], date.clone().startOf('isoWeek').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][0] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][1] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][1]}
                            onChange={(eve) => handleChange("Projects", idx, 1, eve, e[9], date.clone().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][1] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][2] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][2]}
                            onChange={(eve) => handleChange("Projects", idx, 2, eve, e[9], date.clone().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][2] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][3] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][3]}
                            onChange={(eve) => handleChange("Projects", idx, 3, eve, e[9], date.clone().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][3] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][4] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][4]}
                            onChange={(eve) => handleChange("Projects", idx, 4, eve, e[9], date.clone().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][4] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][5] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][5]}
                            onChange={(eve) => handleChange("Projects", idx, 5, eve, e[9], date.clone().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][5] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Projects[idx][6] !== "" ? "30px" : "50px" }}
                            value={hours.Projects[idx][6]}
                            onChange={(eve) => handleChange("Projects", idx, 6, eve, e[9], date.clone().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Projects[idx][6] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={{ ...styles.cell, background: "#DBDBF4", fontWeight: "500" }}>
                          {addTime(hours.Projects[idx].slice(0, 7)) + " hr"}
                        </td>
                      </tr>
                    )) : <></>}
                  </>
                }

                {/* Proposals */}
                {hours.Proposals.length === 0 ? <></> :
                  <>
                    <tr>
                      <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [prev[0], !prev[1], ...prev.slice(2)])} >
                        <FontAwesomeIcon icon={details[1] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                        Proposals
                      </td>
                    </tr>
                    {details[1] ? hours.Proposals.map((e, idx) => (
                      <tr style={styles.row2}>
                        <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e[7]}</p>&nbsp;&nbsp;
                          <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e[8]}</p>
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][0] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][0]}
                            onChange={(eve) => handleChange("Proposals", idx, 0, eve, e[9], date.clone().startOf('isoWeek').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][0] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][1] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][1]}
                            onChange={(eve) => handleChange("Proposals", idx, 1, eve, e[9], date.clone().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][1] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][2] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][2]}
                            onChange={(eve) => handleChange("Proposals", idx, 2, eve, e[9], date.clone().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][2] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][3] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][3]}
                            onChange={(eve) => handleChange("Proposals", idx, 3, eve, e[9], date.clone().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][3] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][4] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][4]}
                            onChange={(eve) => handleChange("Proposals", idx, 4, eve, e[9], date.clone().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][4] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][5] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][5]}
                            onChange={(eve) => handleChange("Proposals", idx, 5, eve, e[9], date.clone().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][5] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Proposals[idx][6] !== "" ? "30px" : "50px" }}
                            value={hours.Proposals[idx][6]}
                            onChange={(eve) => handleChange("Proposals", idx, 6, eve, e[9], date.clone().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Proposals[idx][6] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={{ ...styles.cell, background: "#DBDBF4", fontWeight: "500" }}>
                          {addTime(hours.Proposals[idx].slice(0, 7)) + " hr"}
                        </td>
                      </tr>
                    )) : <></>}
                  </>
                }

                {/* RFP */}
                {hours.RFP.length === 0 ? <></> :
                  <>
                    <tr>
                      <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [...prev.slice(0, 3), !prev[3], ...prev.slice(4, 6)])} >
                        <FontAwesomeIcon icon={details[3] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                        RFP
                      </td>
                    </tr>
                    {details[3] ? hours.RFP.map((e, idx) => (
                      <tr style={styles.row2}>
                        <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A" }}>{e[7]}</p>&nbsp;&nbsp;
                          <FontAwesomeIcon icon={faChevronRight} color="black" height={5} style={{ display: "inline", }} />&nbsp;&nbsp;
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e[8]}</p>
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][0] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][0]}
                            onChange={(eve) => handleChange("RFP", idx, 0, eve, e[9], date.clone().startOf('isoWeek').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][0] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][1] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][1]}
                            onChange={(eve) => handleChange("RFP", idx, 1, eve, e[9], date.clone().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][1] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][2] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][2]}
                            onChange={(eve) => handleChange("RFP", idx, 2, eve, e[9], date.clone().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][2] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][3] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][3]}
                            onChange={(eve) => handleChange("RFP", idx, 3, eve, e[9], date.clone().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][3] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][4] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][4]}
                            onChange={(eve) => handleChange("RFP", idx, 4, eve, e[9], date.clone().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][4] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][5] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][5]}
                            onChange={(eve) => handleChange("RFP", idx, 5, eve, e[9], date.clone().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][5] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.RFP[idx][6] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.RFP[idx][6]}
                            onChange={(eve) => handleChange("RFP", idx, 6, eve, e[9], date.clone().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.RFP[idx][6] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={{ ...styles.cell, background: "#DBDBF4", fontWeight: "500" }}>
                          {addTime(hours.RFP[idx].slice(0, 7)) + " hr"}
                        </td>
                      </tr>
                    )) : <></>}
                  </>}

                {/* General */}
                {hours.General.length === 0 ? <></> :
                  <>
                    <tr>
                      <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [...prev.slice(0, 2), !prev[2], ...prev.slice(3, 6)])} >
                        <FontAwesomeIcon icon={details[2] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                        General
                      </td>
                    </tr>
                    {details[2] ? hours.General.map((e, idx) => (
                      <tr style={styles.row2}>
                        <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e[8]}</p>
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][0] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][0]}
                            onChange={(eve) => handleChange("General", idx, 0, eve, e[9], date.clone().startOf('isoWeek').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][0] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][1] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][1]}
                            onChange={(eve) => handleChange("General", idx, 1, eve, e[9], date.clone().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][1] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][2] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][2]}
                            onChange={(eve) => handleChange("General", idx, 2, eve, e[9], date.clone().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][2] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][3] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][3]}
                            onChange={(eve) => handleChange("General", idx, 3, eve, e[9], date.clone().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][3] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][4] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][4]}
                            onChange={(eve) => handleChange("General", idx, 4, eve, e[9], date.clone().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][4] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][5] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][5]}
                            onChange={(eve) => handleChange("General", idx, 5, eve, e[9], date.clone().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][5] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            style={{ ...styles.input, width: hours.General[idx][6] !== "" ? "30px" : "50px" }}
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            value={hours.General[idx][6]}
                            onChange={(eve) => handleChange("General", idx, 6, eve, e[9], date.clone().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.General[idx][6] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={{ ...styles.cell, background: "#DBDBF4", fontWeight: "500" }}>
                          {addTime(hours.General[idx].slice(0, 7)) + " hr"}
                        </td>
                      </tr>
                    )) : <></>}
                  </>}

                {/* HR */}
                {hours.HR.length === 0 ? <></> :
                  <>
                    <tr>
                      <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [...prev.slice(0, 4), !prev[4], ...prev.slice(5, 6)])} >
                        <FontAwesomeIcon icon={details[4] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                        HR
                      </td>
                    </tr>
                    {details[4] ? hours.HR.map((e, idx) => (
                      <tr style={styles.row2}>
                        <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e[8]}</p>
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][0] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][0]}
                            onChange={(eve) => handleChange("HR", idx, 0, eve, e[9], date.clone().startOf('isoWeek').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][0] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][1] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][1]}
                            onChange={(eve) => handleChange("HR", idx, 1, eve, e[9], date.clone().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][1] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][2] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][2]}
                            onChange={(eve) => handleChange("HR", idx, 2, eve, e[9], date.clone().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][2] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][3] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][3]}
                            onChange={(eve) => handleChange("HR", idx, 3, eve, e[9], date.clone().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][3] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][4] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][4]}
                            onChange={(eve) => handleChange("HR", idx, 4, eve, e[9], date.clone().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][4] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][5] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][5]}
                            onChange={(eve) => handleChange("HR", idx, 5, eve, e[9], date.clone().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][5] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.HR[idx][6] !== "" ? "30px" : "50px" }}
                            value={hours.HR[idx][6]}
                            onChange={(eve) => handleChange("HR", idx, 6, eve, e[9], date.clone().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.HR[idx][6] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={{ ...styles.cell, background: "#DBDBF4", fontWeight: "500" }}>
                          {addTime(hours.HR[idx].slice(0, 7)) + " hr"}
                        </td>
                      </tr>
                    )) : <></>}
                  </>}

                {/* Finance */}
                {hours.Finance.length === 0 ? <></> :
                  <>
                    <tr>
                      <td colSpan={9} style={{ background: "#DBDBF4", height: "40px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={(e) => setdetails(prev => [...prev.slice(0, 5), !prev[5]])} >
                        <FontAwesomeIcon icon={details[5] ? faChevronDown : faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                        Finance
                      </td>
                    </tr>
                    {details[5] ? hours.Finance.map((e, idx) => (
                      <tr style={styles.row2}>
                        <td style={{ ...styles.cell, textAlign: "left", paddingLeft: "56px" }}>
                          <p style={{ display: "inline", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "13px", color: "#0A0A0A" }}>{e[8]}</p>
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][0] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][0]}
                            onChange={(eve) => handleChange("Finance", idx, 0, eve, e[9], date.clone().startOf('isoWeek').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][0] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][1] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][1]}
                            onChange={(eve) => handleChange("Finance", idx, 1, eve, e[9], date.clone().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][1] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][2] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][2]}
                            onChange={(eve) => handleChange("Finance", idx, 2, eve, e[9], date.clone().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][2] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][3] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][3]}
                            onChange={(eve) => handleChange("Finance", idx, 3, eve, e[9], date.clone().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][3] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][4] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][4]}
                            onChange={(eve) => handleChange("Finance", idx, 4, eve, e[9], date.clone().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][4] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][5] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][5]}
                            onChange={(eve) => handleChange("Finance", idx, 5, eve, e[9], date.clone().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][5] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={styles.cell}>
                          <input className='no-focus'
                            placeholder='0:00 hr'
                            disabled={employeeId !== localStorage.getItem('employeeId') || date.isBefore(moment().startOf('isoWeek'))}
                            style={{ ...styles.input, width: hours.Finance[idx][6] !== "" ? "30px" : "50px" }}
                            value={hours.Finance[idx][6]}
                            onChange={(eve) => handleChange("Finance", idx, 6, eve, e[9], date.clone().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD'))}
                          />
                          {hours.Finance[idx][6] !== "" ? <p style={{ display: "inline" }}>hr</p> : ""}
                        </td>
                        <td style={{ ...styles.cell, background: "#DBDBF4", fontWeight: "500" }}>
                          {addTime(hours.Finance[idx].slice(0, 7)) + " hr"}
                        </td>
                      </tr>
                    )) : <></>}
                  </>}
              </>}
          </tbody>
        </table>
      </div>
      {/* Footer Table */}
      <table style={styles.table} >
        <thead style={styles.tableHeader2}>
          <tr style={{ background: "#DBDBF4" }}>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", paddingLeft: "56px", textAlign: "left", width: "250px", borderBottom: "1px solid #EBE9F1", }} className=''>Total</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(0)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(1)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(2)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(3)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(4)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(5)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(6)} hr</th>
            <th scope="col" style={{ ...styles.cell, fontWeight: "700", border: "none", background: "#DBDBF4", padding: "0px", textAlign: "center", width: "100px" }} className=''>{getDayTotal(7)} hr</th>
          </tr>
        </thead>
      </table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        style={styles.addModal}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div className='d-flex flex-row justify-content-between align-items-center' style={{ marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection: 'row' }}>
          <div className='d-flex flex-row'>
            <img src={tIcon} />
            <div style={styles.addHeading}>Add New Task</div>
          </div>
          <div><img onClick={handleClose} style={{ marginRight: '26px', marginTop: '6px', float: 'right' }} src={cross} /></div>
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
    </>
  )
}

export default TimeSheet
