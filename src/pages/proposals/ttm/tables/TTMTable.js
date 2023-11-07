import React, { useState, useEffect, useRef } from 'react'
import './TTMTable.css'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { HOST, GET_EMPLOYEENAMES, GET_TTM, UPDATE_TTM, PRIMARY_COLOR } from '../../../../Main/Constants/Constants';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons';
import options from '../../../../Images/options.svg'
import tIcon from '../../../../Images/taskIcon.svg'
import NewTaskorMilestone from '../forms/NewTaskorMilestone';
import cross from '../../../../Images/cross.svg'
import moment from 'moment';
import TFChip from '../../../../components/ui/TFChip/TFChip'

function TTMTable(props) {
  const {Name, Id} = props;
  const [change, setchange] = useState(false)
  const [show, setShow] = useState(false);
  const handleCloseStage1 = () => setShow(false);
  const handleShowStage1 = () => setShow(true);
  const tableRef = useRef(null);

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
  const [editingData, seteditingData] = useState([])
  const [emps, setemps] = useState([])
  const [rate, setrate] = useState([])
  const [designations, setdesignations] = useState([])
  const [childArr, setchildArr] = useState([])
  
  
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
          let desigs = JSON.parse(res.data.res[0].Designations);
          console.log(JSON.parse(res.data.res[0].Data))
          formChildArr(desigs)
          setemps(empIDs)
          setrate(hrRates)
          seteditingData(data)
          setdesignations(desigs)
          calculateTotalHrs(data)
          // calcTotalLabour(data)
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, [a]);
  const formChildArr = (desigs) =>{
    console.log(desigs)
    let arr =[];
          desigs.map((e)=>{
            {e.children.map((f)=>{
              arr.push(f);
            })}
          })
          setchildArr(arr)
  }
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


    
  const [totalHrs, settotalHrs] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // const [totalLabour, settotalLabour] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const calcTotalLabour = (data)=>{
    data.map((e)=>{
      e.subtasks.map((h, idx)=>{
        let sum = 0;
        for(let i=0;i<h.hrs.length;i++) {
          sum += h.hrs[i]*rate[i]
        }
        console.log(sum)
      })
    })
  }
  // console.log(totalLabour)
  // console.log(rate)

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
                  designations: JSON.stringify(designations),
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
      flexGrow: 0
  },
  addModal: {
    position: "absolute",
    width: "428px",
    height: '355px',
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
    lineHeight: "20px", /* 142857% */
    height:'40px',
    width:'176px',
    padding: '10px var(--12-pad, 12px)',
    textAlign:'center',
    borderRadius: '0px 24px 24px 0px',
    borderTop: '1px solid #EBEDF8',
    borderRight: '1px solid #EBEDF8',
    borderLeft: '1px solid #EBEDF8',
    borderBottom: '1px solid #EBEDF8',
    background: '#FFF',
  }

  }

  const [selectHeading, setselectHeading] = useState(0);

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
  const [currHeading, setcurrHeading] = useState('')
  const handleAddDesignation =(e)=>{
    setchange(true);
    let temp = [...designations];
    if(!temp[currHeading].children.includes(e.target.value))temp[currHeading].children.push(e.target.value);
    else {
      const index = temp[currHeading].children.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        temp[currHeading].children.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    let idx = 0
    for(let i=0;i<=currHeading;i++) {
      idx+=temp[i].children.length
    }
    let h = [...editingData]
    h.map((f)=>{
      f.subtasks.map((e)=>{
        e.hrs.splice(idx-1, 0, 0);
      })
    })

    let p = [...emps];
    p.splice(idx-1, 0, '')

    let r = [...rate]
    r.splice(idx-1, 0, 0)

    let hr = [...totalHrs]
    hr.splice(idx-1, 0, 0);

    setemps(p)
    settotalHrs(hr)
    setrate(r)
    seteditingData(h);
    setdesignations(temp);
    formChildArr(temp);
    handleCloseDesignTeam();
    handleCloseContractAdmin();
  }
  const findWidth=(x)=>{
    let width = 12*x;
    return `${width}vw`
  }
  const removeDesignation = (idx) =>{
    let arr = [...designations];
    idx++;
    let c=0;
    let save;
    for(let i=0;i<arr.length;i++) {
      c+=arr[i].children.length;
      if(c>=idx) {
        save = i;
        break;
      }
    }
    let removeVal = idx-(c-arr[save].children.length);
    arr[save].children.splice(removeVal-1, 1);
    let p = [...emps];
    p.splice(idx-1, 1)

    let r = [...rate]
    r.splice(idx-1, 1)

    let h = [...editingData]
    h.map((f)=>{
      f.subtasks.map((e)=>{
        e.hrs.splice(idx-1, 1);
      })
    })

    let hr = [...totalHrs]
    hr.splice(idx-1, 1);

    setemps(p)
    setrate(r)
    seteditingData(h);
    setdesignations(arr);
    formChildArr(arr);
    settotalHrs(hr)
  }

  const sumTaskHrs = (arr) =>{
    let sum = 0;
    arr.map((e)=>{
      sum+=e;
    })
    return sum;
  }

  const [selectedMilestone, setseletedMilestone] = useState();

  const findMilestoneStatus = (e) =>{
    let notStarted = 0, inProgress = 0, completed = 0, len = 0;
    e.map((task)=>{
      if(task.visibility) {
        len++;
        if(task.status===0) notStarted++;
        else if(task.status===1) inProgress++;
        else if(task.status===2) completed++;
      }
    })
    console.log(notStarted, inProgress, completed, len)
    if(notStarted===len) return 0;
    else if(completed===len) return 2;
    else return 1;
  }

  const findStartDate = (e) =>{
    if(e.length==0) return null;
    let dates = [];
    e.map((task)=>{
      if(task.visibility)dates.push(task.StartDate)
    })
    if(dates.length===0) return null;
    const datesList = dates.map(dateString => moment(dateString));
    const minDate = moment.min(datesList);
    return minDate.format("DD MMM YYYY")
  }

  const findEndDate = (e) =>{
    if(e.length==0) return null;
    let dates = [];
    e.map((task)=>{
      if(task.visibility) {
        const date = moment(task.StartDate);
        const newDate = date.add(task.Duration, 'days');
        dates.push(newDate)
      }
    })
    if(dates.length===0) return null;
    const datesList = dates.map(dateString => moment(dateString));
    const maxDate = moment.max(datesList);
    return maxDate.format("DD MMM YYYY")
  }

  const calculateDuration = (a, b) =>{
    if(!b || !a) return 0;
    const aMoment = moment(a);
    const bMoment = moment(b);
    const duration = Math.abs(aMoment.diff(bMoment, "days"));
    return duration;
  }

  const handleUpdateChip=()=>{
    
  }

  return (
    isLoading?<LoadingSpinner/>:
    <div>
     {/* <div className='d-flex flex-row justify-content-between'> */}
      {/* <div className='pageHeader'>TTM : {Name}</div> */}
      {/* <Button variant='success' onClick={handleOpenAddTask} style={{marginRight:'2vw', height:'8vh'}}>Add Task</Button> */}
     {/* </div> */}

      {/* Table Header */}
 
      <div className='tableHeader d-flex flex-row justify-content-between'> 
      <div className='d-flex flex-row align-items-center'>
        <div className='tableHeaderText'>{Name}</div>
        {change?<div className='unsaved-text'>You have some unsaved changes!</div>:<></>}
      </div>
        
        {change?<button style={styles.addButton}  onClick={handleSubmit}><p style={styles.addButtonText} >Save Changes</p></button>:<></>}
      </div>

      {/* First four rows table */}
    <div className='tableFixHead'>
      <table className='table table-bordered'>
        <thead>
          <tr style={{zIndex:'9'}}>
            <th className='normals th' style={{verticalAlign:'middle'}}>Project Department</th>
            <th className='normals th' style={{background:'white', verticalAlign:'middle'}} colSpan={4}>Timelines</th>
            {designations.map((e, idx)=>{
              return (
                <>
                {e.Designation=='Design Team'?<th style={{width: findWidth(e.children.length), background:'white', verticalAlign:'middle'}} className='normals th' colSpan={e.children.length}>Design Team   <img style={{cursor:'pointer'}} onClick={()=>{handleOpenDesignTeam();setcurrHeading(idx)}} src={options}/></th>:
                e.Designation=='Transportation, Traffic Engineering, Traffic control plans and Utility Coordination'?<th style={{background:'white', verticalAlign:'middle'}} className='normals th' colSpan={e.children.length}>{e.Designation}</th>:
                e.Designation=='Contract administration and Construction Inspection'?<th style={{width: findWidth(e.children.length), background:'white', verticalAlign:'middle'}} className='normals th' colSpan={e.children.length}>{e.Designation}  <img style={{cursor:'pointer'}} onClick={()=>{handleOpenContractAdmin();setcurrHeading(idx)}} src={options}/></th>:
                <th style={{width: findWidth(e.children.length), background:'white', verticalAlign:'middle'}} className='normals th' colSpan={e.children.length}>{e.Designation}</th>
                }
              </>)
            })}
            <th style={{width:'12vw', background:'white', verticalAlign:'middle'}} className='normals th'>Hrs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='normals td' style={{verticalAlign:'middle'}}>Designation</td>
            <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'white'}}>Status</td>
            <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'white'}}>Start Date</td>
            <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'white'}}>End Date</td>
            <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'white'}}>Duration (Days)</td>
            {childArr.map((e, idx)=>{
              return(
                <>
                <td style={{background:'white', verticalAlign:'middle'}} className='normals td'>
                  <p style={{display:'inline', width:'80%'}}>{e}  </p>
                  <img onClick={()=>removeDesignation(idx)} style={{cursor:'pointer', display:'inline'}} src={options}/>
                </td>
                </>
              
              )
            })}
            <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'#DBDBF4'}}>Total Hrs</td>
            {/* <td className='normals td' rowSpan={3} style={{verticalAlign:'middle', background:'#DBDBF4'}}>Labour Fees($)</td> */}
          </tr>
          <tr className='tr'>
            <td style={{zIndex:'6', background:'white'}} className='normals td'>People</td>
            {emps.map((e, idx)=>{
              return (
                (
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
                <td className='specials td' style={{background:'white'}}>

                    {e?<p style={{ display: "inline" }}>$ </p>:''}
                    <input
                        className='no-focus' 
                        placeholder='$ 0'
                        style={{...style.input, width: e?"35px":'100%'}}
                        value={e?e:''}
                        onChange={(eve)=>handleChangeRate(eve, idx)}
                    />
                    {/* <TFInput
                      placeholder="$ 0"
                      name="idx" 
                      onChange={(name, value)=>handleChangeRate({target: {value}}, idx)}
                      width={e?"35px":"100%"}
                    /> */}
                </td>
              )
            })}
          </tr>
          {editingData?editingData.map((e)=>{
            return(
              <>
              <tr><td
              className='td'
                style={{
                  height: '38px',
                  textAlign:'left',
                  color:' var(--black-text, #0A0A0A)',
                  fontSize: '13px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '20px',
                  backgroundColor: 'white',
                }}>
                   {e.TaskName}
                  </td>
                  <td style={{background:'white'}} className='td'><div>
                      {findMilestoneStatus(e.subtasks)===0
                        ? <div style={{  textAlign:'center', height: '20px', background: '#E4EEFE', border: '0.4px solid #E4EEFE', borderRadius: '24px', paddingLeft: '6px', paddingRight:'6px' }}>Not Started</div> :
                        findMilestoneStatus(e.subtasks)===1 ? <div style={{  textAlign:'center', height: '20px', background: '#FFF4EF', border: '0.4px solid #FFF4EF', borderRadius: '24px', paddingLeft: '10px', paddingRight:'10px' }}>Ongoing</div> :
                        findMilestoneStatus(e.subtasks)===2 ? <div style={{  textAlign:'center', height: '20px', background: '#559776', border: '0.4px solid #559776', borderRadius: '24px', paddingLeft: '10px', paddingRight:'10px' }}>Completed</div> :<></>
                      }</div>
                  </td>
                  <td style={{textAlign:'left', paddingLeft:"15px", background:'white'}} className='td no-focus'>{findStartDate(e.subtasks)?findStartDate(e.subtasks):''}</td>
                  <td style={{textAlign:'left', paddingLeft:"15px", background:'white'}} className='td no-focus'>{findEndDate(e.subtasks)?findEndDate(e.subtasks):''}</td>
                  <td style={{paddingLeft:'12px', width:'fit-content', textAlign:'center', background:'white'}} className='td no-focus'>{calculateDuration(findStartDate(e.subtasks), findEndDate(e.subtasks))}</td>
                  <td colSpan={childArr.length+2} style={{background:'white'}} className='td'>
                    
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
                    <tr className=''>
                      <td style={{paddingLeft:'32px'}} className='td'
                      >{task.TaskName}</td>
                      <td style={{background:'white'}} className='td'><div style={{cursor:'pointer'}} /* onClick={()=>{setcurrStatus(e.status);setid([e.parentID, task.childId]);openstatusModal()}} */>
                      {/* {task.status === 0 && task.Progress<100
                        ? <div style={{  textAlign:'center', height: '20px', background: '#E4EEFE', border: '0.4px solid #E4EEFE', borderRadius: '24px', paddingLeft: '6px', paddingRight:'6px' }}>Not Started</div> :
                          task.status === 1 && task.Progress<100 ? <div style={{  textAlign:'center', height: '20px', background: '#FFF4EF', border: '0.4px solid #FFF4EF', borderRadius: '24px', paddingLeft: '10px', paddingRight:'10px' }}>Ongoing</div> :
                            task.status === 2||task.Progress===100 ? <div style={{  textAlign:'center', height: '20px', background: '#559776', border: '0.4px solid #559776', borderRadius: '24px', paddingLeft: '10px', paddingRight:'10px' }}>Completed</div> :<></>
                      } */}
                      <TFChip label='Status' tableRef={tableRef} options='"Not Started", "Ongoing", "Completed"' id={task.taskID}  />
                      </div></td>
                      <td style={{paddingLeft:'12px', width:'fit-content', textAlign:'center', background:'white'}} className='td no-focus'><DatePicker dateFormat="d MMM yyyy" onChange={(date)=>handleDatesChange(date, "start", e.parentID, task.childId)} selected={new Date(task.StartDate)} /></td>
                      <td style={{paddingLeft:'12px', width:'fit-content', textAlign:'center', background:'white'}} className='td no-focus'><DatePicker dateFormat="d MMM yyyy" onChange={(date)=>handleDatesChange(date, "end", e.parentID, task.childId)} selected={calculateEndDate(new Date(task.StartDate), task.Duration)} /></td>
                      <td style={{ textAlign:'center', background:'white'}} className='td'>
                        <input
                          className='no-focus' placeholder='0'
                          style={{...style.input}}
                          value={Math.ceil(task.Duration)}
                          onChange={(eve)=>handleDurationChange(e.parentID, task.childId , eve)}
                        />
                      </td>
                      {task.hrs.map((h, idx)=>{
                        return (
                          (<td  style={{background:'white'}}> 
                            <input
                              className='no-focus' placeholder='0 hr'
                              style={{...style.input, width: h?'50%':'100%', paddingLeft: h?'3.6vw':"0"}}
                              value={h?h:''}
                              onChange={(eve)=>handleHRchange(e.parentID, task.childId ,idx, eve)}
                            />
                            {/* <TFInput
                              placeholder="0 hr"
                              name="idx"
                              onChange={(name, value)=>handleChangeRate(e.parentID, task.childId, idx, value)}
                              width={e?"50%":"100%"}
                            /> */}
                            {h ? <p style={{ display: "inline" }}> hr</p> : ""}
                          </td>)
                        )
                      })}
                      <td style={{paddingLeft:'32px', zIndex:'6', background:'#DBDBF4'}} className='td'>{sumTaskHrs(task.hrs)} hr</td>
                      {/* <td style={{paddingLeft:'32px', zIndex:'6', background:'#DBDBF4'}} className='td'>{sumTaskHrs(task.hrs)}</td> */}
                    </tr>:<></>}</>
                  )
                })}
                {<tr>
                  <td 
                    className='td'
                    style={{
                      // position:'fixed',
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
                    <div onClick={()=>{handleOpenNewTaskMile();setseletedMilestone(e.parentID)}} style={{ cursor:'pointer'
                    }}>Add Task/Milestone +</div>
                  </td>
                  <td className='td' colSpan={childArr.length+6}>

                  </td>
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
                (<td className='td' style={{background:'#DBDBF4', zIndex:'2'}}>{e}</td>)
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
                (<td className='td' style={{background:'#DBDBF4', zIndex:'1'}}>$ {(e*rate[idx]).toFixed(2)}</td>)
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
                (<td className='td' style={{background:'#DBDBF4', zIndex:'0.5'}}>{hrSum>0?((e/hrSum)*100).toFixed(2):0}%</td>)
              )
            })}
          </tr>
        </tbody>
      </table>
      </div>

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

      <Modal show={openDesignTeam} onHide={handleCloseDesignTeam}>
        <Modal.Header closeButton>
          <Modal.Title>Select Designation (Design Team)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddDesignation}>
            <option>Select Designation</option>
            <option value={'Electrical and Streetlight Designer'}>Electrical and Streetlight Designer</option>
            <option value={'Landscape and Streetscape Architect'}>Landscape and Streetscape Architect</option>
            <option value={'Structural Engineer'}>Structural Engineer</option>
            <option value={'Stormwater Specialist'}>Stormwater Specialist</option>
            <option value={'Senior Design Engineert'}>Senior Design Engineer</option>
            <option value={'Environmental Planner'}>Environmental Planner</option>
            <option value={'Traffic Signal Designer'}>Traffic Signal Designer</option>
            
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={openContractAdmin} onHide={handleCloseContractAdmin}>
        <Modal.Header closeButton>
          <Modal.Title>Select Designation(Contract Administration and Inscpection Services)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddDesignation}>
            <option>Select Designation</option>
            <option value={'Tree Arborist'}>Tree Arborist</option>
            
          </Form.Select>
        </Modal.Body>
      </Modal>


      <Modal
                show={openNewTaskMile}
                onHide={handleCloseNewTaskMile}
                // backdrop="static"
                style={styles.addModal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row', width:'428px'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Add New Task</div>
                    </div>
                    <div><img onClick={handleCloseNewTaskMile} style={{marginRight:'36px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                <div style={{height:'306px'}}>
                    {
                        <NewTaskorMilestone selectedMilestone={selectedMilestone} data = {editingData} seteditingData={seteditingData} change={change} setchange={setchange} show={openNewTaskMile} setshow={handleCloseNewTaskMile} />
                    }</div>
            </Modal>
    </div>
  )
}

export default TTMTable
