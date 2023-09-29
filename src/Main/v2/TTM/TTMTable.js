import React, { useState, useEffect } from 'react'
import './TTMTable.css'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { HOST, GET_EMPLOYEENAMES, GET_TTM, UPDATE_TTM, PRIMARY_COLOR } from '../../Constants/Constants';
import LoadingSpinner from '../../Loader/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons';

function TTMTable(props) {
  const {Name, Id} = props;
  const [change, setchange] = useState(false)
  const [show, setShow] = useState(false);
  const handleCloseStage1 = () => setShow(false);
  const handleShowStage1 = () => setShow(true);

  const [showStage2, setShowStage2] = useState(false);
  const handleCloseStage2 = () => setShowStage2(false);
  const handleShowStage2 = () => setShowStage2(true);

  const [showStage3, setShowStage3] = useState(false);
  const handleCloseStage3 = () => setShowStage3(false);
  const handleShowStage3 = () => setShowStage3(true);

  const [showStage4, setShowStage4] = useState(false);
  const handleCloseStage4 = () => setShowStage4(false);
  const handleShowStage4 = () => setShowStage4(true);

  const [showStage5, setShowStage5] = useState(false);
  const handleCloseStage5 = () => setShowStage5(false);
  const handleShowStage5 = () => setShowStage5(true);

  const [showStage9, setShowStage9] = useState(false);
  const handleCloseStage9 = () => setShowStage9(false);
  const handleShowStage9 = () => setShowStage9(true);

  const [showStage7, setShowStage7] = useState(false);
  const handleCloseStage7 = () => setShowStage7(false);
  const handleShowStage7 = () => setShowStage7(true);

  const [openAddTask, setopenAddTask] = useState(false);
  const handleOpenAddTask = () => setopenAddTask(true);
  const handleCloseAddTask = () => setopenAddTask(false);

  const [a, seta] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [editingData, seteditingData] = useState([])
  const [emps, setemps] = useState([])
  const [rate, setrate] = useState([])
  const [designations, setdesignations] = useState([])

  const [roadWayDesignersColspan, setRoadWayDesignersColspan] = useState(1)
  const [watermainColspan, setWatermainColspan] = useState(1)
  const [transportationColspan, setTransportationColspan] = useState(1)
  const [visible, setvisible] = useState([])
  const toggleRoadwayColspan = () => {
    setchange(true);
    setRoadWayDesignersColspan(prevColspan => (prevColspan === 1 ? 2 : 1));
    setvisible((prevState) => {
      const updatedVisible = [...prevState]; // Create a copy of the current state
      updatedVisible[6] = prevState[6] === 1 ? 0 : 1; // Toggle the 7th index
      return updatedVisible; // Return the updated state
    });
  };
  const toggleWatermainColspan = () => {
    setchange(true);
    setWatermainColspan(prevColspan => (prevColspan === 1 ? 2 : 1));
    setvisible((prevState) => {
      const updatedVisible = [...prevState]; // Create a copy of the current state
      updatedVisible[8] = prevState[8] === 1 ? 0 : 1; // Toggle the 7th index
      return updatedVisible; // Return the updated state
    });
  };
  const toggleTransportationColspan = () => {
    setchange(true);
    setTransportationColspan(prevColspan => (prevColspan === 1 ? 2 : 1));
    setvisible((prevState) => {
      const updatedVisible = [...prevState]; // Create a copy of the current state
      updatedVisible[11] = prevState[11] === 1 ? 0 : 1; // Toggle the 7th index
      return updatedVisible; // Return the updated state
    });
  };
  
  useEffect(() => {
    setisLoading(true);
    const call = async() => {
      await axios
        .get(HOST + GET_TTM, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), proposalId:Id }
        })
        .then((res) => {
          let data = JSON.parse(res.data.res[0].Data)
          let empIDs = JSON.parse(res.data.res[0].Employee_Info)[0]
          let hrRates = JSON.parse(res.data.res[0].Employee_Info)[1]
          let visibleColumns = JSON.parse(res.data.res[0].Visible_Columns);
          let desigs = JSON.parse(res.data.res[0].Designations);
          setemps(empIDs)
          setrate(hrRates)
          seteditingData(data)
          setvisible(visibleColumns)
          setdesignations(desigs)
          if(visibleColumns[6])setRoadWayDesignersColspan(2);
          if(visibleColumns[8])setWatermainColspan(2);
          if(visibleColumns[11])setTransportationColspan(2);
          calculateTotalHrs(data)
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, [a]);
  const style = {
    input: {
      border: "none",
      boxShadow: "none",
      outline: "none",
      width: "100%",
      display: "inline",
      background: "rgb(0 0 0 / 0%)",
      // padding: "12px 0px",
      textAlign:'center',
      ':focus' : {
        border: "5px solid black",
        // boxShadow: "none",
        outline: "none",
      }
    }
  }
  const buttonStyle = {
    backgroundColor: '#dddfeb', // Background color
    color: 'white',            // Text color
    padding: '4px 8px',       // Padding for the button
    borderRadius: '4px',       // Rounded corners
    cursor: 'pointer',         // Change cursor on hover
  };
    
const calculateEndDate=(startDate, duration)=> {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
}


    
  const [totalHrs, settotalHrs] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const handleAddTaskStage1 = async (e, pId)=>{
      setisLoading(true);
      let val = e.target.value;
      let prevVal = editingData[pId].subtasks[val].visibility;
      editingData[pId].subtasks[val].visibility = !prevVal;
      handleCloseStage1()
      handleCloseStage2()
      handleCloseStage3()
      handleCloseStage4()
      handleCloseStage5()
      handleCloseStage7()
      handleCloseStage9()
      setchange(true);
      setisLoading(false);
    }
    const handleHRchange = (a, b, c, d) =>{
        let value = d.target.value;
        let h = [...editingData]
        h[a].subtasks[b].hrs[c]=parseInt(value?value:0);
        setchange(true)
        calculateTotalHrs(h)
        seteditingData(h);
    }
    const handleChangeEmployee = (a, b) =>{
      let value = a.target.value;
      let h = [...emps]
      h[b]=value;
      setchange(true)
      setemps(h);
  }
  const handleChangeRate = (a, b) =>{
    let value = a.target.value;
    let h = [...rate]
    h[b]=parseInt(value);
    setchange(true)
    setrate(h);
}
    let span = 13;

  const getDurationInDays=(startDate, endDate)=> {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = Math.abs(end - start);
    const durationInDays = Math.round(durationInMilliseconds / oneDay);
    return durationInDays;
  }
  const handleDatesChange = (e, time, p, c)=>{
    let h = [...editingData]
    if(time==="start") {
      h[p].subtasks[c].StartDate = e;
    } else if(time==="end") {
      const endDate = new Date(e);
      let val = getDurationInDays(h[p].subtasks[c].StartDate, endDate);
      h[p].subtasks[c].Duration = val;
    }
    setchange(true)
    seteditingData(h)
  }

  const functionArray = [
    handleShowStage1,
    handleShowStage2,
    handleShowStage3,
    handleShowStage4,
    handleShowStage5,
    handleShowStage7,
    handleShowStage9,
  ];
  const handleSubmit = async(e) =>{
    e.preventDefault();
        setisLoading(true);
        setchange(!change)
        await axios
            .post(
                HOST + UPDATE_TTM,
                {
                  data: JSON.stringify(editingData),
                  employeeInfo: JSON.stringify([emps, rate]),
                  visibleColumns: JSON.stringify(visible),
                  proposalId: Id,
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                if(res.data.success) {
                    // setsubmitLoading(false)
                    seta(a+1);
                }
                // seteditProfile(false);
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });

  }
  const styles={

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
      textAlign: 'center',
      marginTop: "20px",
      marginLeft: "25px",
    },
    addButton: {
      marginRight:'2vw',
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 16px",
      gap: "8px",
      // width: "177px",
      height: "40px",
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
      flexGrow: 0
  },
  }
  const [currStatus, setcurrStatus] = useState('')
  const [id, setid] = useState([0, 0])

  //Status Update Modal
  const [statusModal, setstatusModal] = useState(false);
  const closestatusModal = () => setstatusModal(false);
  const openstatusModal = () => setstatusModal(true);

  const updateStatus=()=>{
    let h = [...editingData];
    h[id[0]].subtasks[id[1]].status = currStatus;
    seteditingData(h)
    closestatusModal();
    setchange(true)
  }
  const [hrSum, sethrSum] = useState(0);
  const calculateTotalHrs=(data)=> {
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
    for(let i=0;i<totalHr.length;i++) {
      sum+=parseInt(totalHr[i]);
    }
    sethrSum(sum);
    settotalHrs(totalHr);
  }

  const handleDurationChange = (p, c, e) =>{
    let value = e.target.value;
    let h = [...editingData];
    h[p].subtasks[c].Duration = parseInt(value?value:0);
    setchange(true)
    seteditingData(h)
  }
  return (
    isLoading?<LoadingSpinner/>:
    <div>
     <div className='d-flex flex-row justify-content-between'>
      <div className='pageHeader'>TTM : {Name}</div>
      {change?<button style={styles.addButton}  onClick={handleSubmit}><p style={styles.addButtonText} >Save Changes</p></button>:<></>}
      <Button variant='success' onClick={handleOpenAddTask} style={{marginRight:'2vw', height:'8vh'}}>Add Task</Button>
     </div>

      {/* Table Header */}
 
      <div className='tableHeader'> 
        <div className='tableHeaderText'>{Name}</div>
      </div>

      {/* First four rows table */}
    <div className='tableFixHead'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th className='normals th'>Project Department</th>
            <th className='normals th' colSpan={4}>Timelines</th>
            <th className='normals th' colSpan={3}>Project Management</th>
            <th className='normals th' colSpan={2}>Design</th>
            <th className='normals th' colSpan={1 + roadWayDesignersColspan + watermainColspan}>Design Team</th>
            <th className='normals th' colSpan={transportationColspan}>Transportation, Traffic Engineering, Traffic control plans and Utility Coordination</th>
            <th className='normals th' colSpan={2}>Bids and Tender Preparation Team</th>
            <th className='normals th' colSpan={2}>Contract administration and Construction Inspection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='normals td'>Designation</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>Status</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>Start Date</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>End Date</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>Duration</td>
            <td className='normals td'>Project Manager</td>
            <td className='normals td'>Project Director</td>
            <td className='normals td'>Qa/QC lead and Risk Manager</td>
            <td className='normals td'>Technical Design Lead</td>
            <td className='normals td'>Transportation Planning and Engineering Lead</td><td className='normals td' colSpan={roadWayDesignersColspan}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyItems: 'center'  }}>
            Roadway Designers {'  '}
              <span onClick={toggleRoadwayColspan} style={buttonStyle}>
                {roadWayDesignersColspan === 1 ? '+' : '-'}
              </span>
            </div>
            </td>
            <td className='normals td' colSpan={watermainColspan}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyItems: 'center'  }}>
            Watermain, Sanitary and Storm Sewer Designers {' '}
              <span onClick={toggleWatermainColspan} style={buttonStyle}>
                {watermainColspan === 1 ? '+' : '-'}
              </span>
            </div>
            </td>
            <td className='normals td'>Cad Technician</td> <td className='normals td' colSpan={transportationColspan}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyItems: 'center' }}>
              Transportation, Traffic Engineering, Traffic control plans, and Utility Coordination {'  '}
              <span onClick={toggleTransportationColspan} style={buttonStyle}>
                {transportationColspan === 1 ? '+' : '-'}
              </span>
            </div>
          </td>
            <td className='normals td'>TakeOff Engineer</td>
            <td className='normals td'>Junior Engineer</td>
            <td className='normals td'>Contract Administrator</td>
            <td className='normals td'>Site Inspector</td>
          </tr>
          <tr className='tr'>
            <td style={{zIndex:'6'}} className='normals td'>People</td>
            {emps.map((e, idx)=>{
              return (
                visible[idx] === 0? <></> :(
                <td className='specials td'>
                  <input
                    type="text"
                    className='no-focus' placeholder='Name'
                    style={{...style.input, display:'inline'}}
                    value={e?e:''}
                    onChange={(eve)=>handleChangeEmployee(eve, idx)}
                  />
                </td>)
              )
            })
              }
          </tr>
          <tr>
            <td className='normals td'>Rate Per Hour</td>
            {rate.map((e, idx)=>{
              return(
                visible[idx] === 0? <></> :(<td className='specials td'>
                  <input
                      className='no-focus' placeholder='0'
                      style={{...style.input, display:'inline'}}
                      value={e?e:''}
                      onChange={(eve)=>handleChangeRate(eve, idx)}
                  />
                </td>)
              )
            })}
          </tr>
          {editingData?editingData.map((e)=>{
            return(
              <>
              <tr><td colSpan={span+4} bgcolor='#E4FEF1'
                style={{
                  height: '38px',
                  textAlign:'left',
                  color:' var(--black-text, #0A0A0A)',
                  fontSize: '13px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '20px',
                  // backgroundColor: '#E4FEF1',
                }}>
                  <div className='d-flex justify-content-start empty'>
                    <div>{e.TaskName}</div>
                    
                  </div>
                  </td>
                  <Modal
                    show={statusModal}
                    onHide={closestatusModal}
                    style={styles.statusModal}
                    dialogClassName="filter-dialog"
                    backdropClassName="filter-backdrop"
                    animation={false}
                  >
                    <div className="d-flex flex-row align-items-center">
                      <div
                        style={{
                          fontFamily: "'Roboto'",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "14px",
                          backgroundColor: "white",
                          border: "none",
                          color: PRIMARY_COLOR,
                          marginRight: "65px",
                          marginTop: "8px",
                          marginLeft: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        Update Status
                      </div>
                      <FontAwesomeIcon
                        icon={faX}
                        style={{ height: "9px", cursor: "pointer" }}
                        color={PRIMARY_COLOR}
                        onClick={closestatusModal}
                      />
                    </div>
                    <div
                      style={styles.filterSubcontainer}
                      className="filter-container"
                    >
                      <p style={styles.filterSubheading}>
                        &nbsp;</p>

                      <div
                        style={{
                          ...styles.filterSubSubContainer,
                          backgroundColor: currStatus === 0
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        onClick={() =>
                          setcurrStatus(0)
                        }
                      >
                        <p style={styles.filterBodyText}>
                          Not Started
                        </p>
                      </div>
                      <div
                        style={{
                          ...styles.filterSubSubContainer,
                          backgroundColor: currStatus === 1
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        onClick={() =>
                          setcurrStatus(1)
                        }
                      >
                        <p style={styles.filterBodyText}>
                          Ongoing
                        </p>
                      </div>
                      <div
                        style={{
                          ...styles.filterSubSubContainer,
                          backgroundColor: currStatus === 2
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        onClick={() =>
                          setcurrStatus(2)
                        }
                      >
                        <p style={styles.filterBodyText}>
                          Completed
                        </p>
                      </div>
                      <Button
                        style={styles.updateButtonStatus}
                        onClick={updateStatus}
                      >
                        Update
                      </Button>
                    </div>

                  </Modal>
                </tr>
                {e.subtasks.map((task)=>{
                  return(
                    <>
                    {task.visibility?
                    <tr>
                      <td style={{paddingLeft:'32px'}} className='td'
                      >{task.TaskName}</td>
                      <td style={{}} className='td'><div style={{cursor:'pointer'}} onClick={()=>{setcurrStatus(e.status);setid([e.parentID, task.childId]);openstatusModal()}}>
                      {task.status === 0 && task.Progress<100
                        ? <div style={{  textAlign:'center', height: '20px', background: '#E4EEFE', border: '0.4px solid #E4EEFE', borderRadius: '24px', paddingLeft: '6px', paddingRight:'6px' }}>Not Started</div> :
                          task.status === 1 && task.Progress<100 ? <div style={{  textAlign:'center', height: '20px', background: '#FFF4EF', border: '0.4px solid #FFF4EF', borderRadius: '24px', paddingLeft: '10px', paddingRight:'10px' }}>Ongoing</div> :
                            task.status === 2||task.Progress===100 ? <div style={{  textAlign:'center', height: '20px', background: '#559776', border: '0.4px solid #559776', borderRadius: '24px', paddingLeft: '10px', paddingRight:'10px' }}>Completed</div> :<></>
                      }</div></td>
                      <td style={{paddingLeft:'12px', width:'fit-content', textAlign:'center'}} className='td no-focus'><DatePicker dateFormat="d MMM yyyy" onChange={(date)=>handleDatesChange(date, "start", e.parentID, task.childId)} selected={new Date(task.StartDate)} /></td>
                      <td style={{paddingLeft:'12px', width:'fit-content', textAlign:'center'}} className='td no-focus'><DatePicker dateFormat="d MMM yyyy" onChange={(date)=>handleDatesChange(date, "end", e.parentID, task.childId)} selected={calculateEndDate(new Date(task.StartDate), task.Duration)} /></td>
                      <td style={{paddingLeft:'32px', textAlign:'center'}} className='td'>
                        <input
                          className='no-focus' placeholder='0'
                          style={style.input}
                          value={Math.ceil(task.Duration)}
                          onChange={(eve)=>handleDurationChange(e.parentID, task.childId , eve)}
                        />
                      </td>
                      {task.hrs.map((h, idx)=>{
                        return (
                          visible[idx] === 0? <></> :(<td  > 
                            <input
                              className='no-focus' placeholder='0'
                              style={style.input}
                              value={h?h:''}
                              onChange={(eve)=>handleHRchange(e.parentID, task.childId ,idx, eve)}
                            />
                          </td>)
                        )
                      })}
                    </tr>:<></>}</>
                  )
                })}
                {e.parentID===5||e.parentID===7?<></>:<tr><td colSpan={span+1} bgcolor='#FFF'
                style={{
                  height: '38px',
                  textAlign:'left',
                  color:'var(--dark-grey, #70757A)',
                  fontSize: '13px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '20px',
                  backgroundColor: '#FFF',
                }}>
                  <p className='empty' onClick={() => functionArray[e.parentID]()} style={{
                    paddingLeft:'24px', cursor:'pointer'
                  }}>Add/Remove Task +</p></td>
                </tr>}
              </>
            )
          }):<></>}
          <tr className='tr' style={{zIndex:'3', background:'#DBDBF4'}}>
            <td className='td' style={{zIndex:'3', background:'#DBDBF4'}}>Totals</td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            {totalHrs.map((e, idx)=>{
              return(
                visible[idx] === 0? <></> :(<td className='td' style={{background:'#DBDBF4', zIndex:'2'}}>{e}</td>)
              )
            })}
          </tr>
          <tr className='tr' style={{zIndex:'2'}}>
            <td className='td' style={{zIndex:'2', background:'#DBDBF4'}}>Total Fees</td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            {totalHrs.map((e, idx)=>{
              return(
                visible[idx] === 0? <></> :(<td className='td' style={{background:'#DBDBF4', zIndex:'1'}}>$ {(e*rate[idx]).toFixed(2)}</td>)
              )
            })}
          </tr>
          <tr className='tr' style={{zIndex:'1'}}>
            <td className='td' style={{zIndex:'1', background:'#DBDBF4'}}>Time Percentage</td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            <td className='td' style={{background:'#DBDBF4'}}></td>
            {totalHrs.map((e, idx)=>{
              return(
                visible[idx] === 0? <></> :(<td className='td' style={{background:'#DBDBF4', zIndex:'0.5'}}>{hrSum>0?((e/hrSum)*100).toFixed(2):0}%</td>)
              )
            })}
          </tr>
        </tbody>
      </table>
      </div>
      <Modal show={show} onHide={handleCloseStage1}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Project Initiation Stage)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 0)}}>
            <option>Select Task</option>
            <option value='4'>Obtaining necessary permits</option>
            <option value='5'>Pre-design Site visit</option>
            <option value='6'>Preliminary Survey</option>
            <option value='7'>Traffic Count</option>
            <option value='8'>Identification of Problem/ Opportunity</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage2} onHide={handleCloseStage2}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Environmental Assessment (Project Dependent))</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 1)}}>
            <option>Select Task</option>
            <option value='0'>Development of Alternative Solutions</option>
            <option value='1'>Development of Alternative Design concepts for preferred solution</option>
            <option value='2'>Environmental Study Report (ESR)</option>
            <option value='3'>Public Information Centre</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage3} onHide={handleCloseStage3}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Site Investigations (Project Dependent))</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 2)}}>
            <option>Select Task</option>
            <option value='0'>Topographic Survey</option>
            <option value='1'>Legal Survey</option>
            <option value='2'>Geotechnical Investigation</option>
            <option value='3'>SUE Investigation</option>
            <option value='4'>CCTV Inspection</option>
            <option value='5'>Hydrogeological Investigation</option>
            <option value='6'>Environmental Assessment</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage4} onHide={handleCloseStage4}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Preliminary Design )</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 3)}}>
            <option>Select Task</option>
            <option value='4'>Coordination meeting with relevant authorities</option>
            <option value='5'>Public Information Centre</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage5} onHide={handleCloseStage5}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Detailed Design (60%))</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 4)}}>
            <option>Select Task</option>
            <option value='2'>Streetlight Design</option>
            <option value='3'>Streetscaaping and Landscaping</option>
            <option value='4'>Property Acquisition Plan</option>
            <option value='5'>Soil Management Plan</option>
            <option value='6'>Traffic Control Plan and Construction Staging</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage7} onHide={handleCloseStage7}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Final Design)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 6)}}>
            <option>Select Task</option>
            <option value='2'>Draft Quantitiy Take-off and Cost Estimation</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage9} onHide={handleCloseStage9}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Contract Administration and Inscpection Services)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{handleAddTaskStage1(e, 8)}}>
            <option>Select Task</option>
            <option value='4'>Completion and Warranty site inspections</option>
            <option value='5'>Maintenance Period Support</option>
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={openAddTask} onHide={handleCloseAddTask}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Contract Administration and Inscpection Services)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e)=>{console.log(e.target.value)}}>
            <option>Select Milestone</option>
            {editingData.map((e, idx)=>{
              return (<option value={idx}>{e.TaskName}</option>)
            })}
          </Form.Select>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TTMTable
