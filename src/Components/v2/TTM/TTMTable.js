import React, { useState, useEffect } from 'react'
import './TTMTable.css'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { HOST, GET_EMPLOYEENAMES } from '../../Constants/Constants';
import LoadingSpinner from '../../Loader/Loader'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TTMTable() {
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

  const [showStage6, setShowStage6] = useState(false);
  const handleCloseStage6 = () => setShowStage6(false);
  const handleShowStage6 = () => setShowStage6(true);

  const [showStage7, setShowStage7] = useState(false);
  const handleCloseStage7 = () => setShowStage7(false);
  const handleShowStage7 = () => setShowStage7(true);

  const [employees, setemployees] = useState([]);
  const [a, seta] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
        totals()
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
  const [editingData, seteditingData] = useState([
    {
        TaskID: 1, parentID: 0,
        TaskName: 'Project initiation',
        StartDate: new Date('04/02/2023'),
        EndDate: new Date('04/21/2023'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Project Initiation meeting', StartDate: new Date('04/02/2019'), Duration: 0,
                Progress: 30, resources: [1], info: 'Measure the total property area alloted for construction',
                hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: true, childID: 0
            },
            {
                TaskID: 3, TaskName: 'Background data collection and Field review', StartDate: new Date('04/02/2019'), Duration: 4, Predecessor: '2',
                resources: [2, 3, 5], info: 'Obtain an engineered soil test of lot where construction is planned.' +
                    'From an engineer or company specializing in soil testing',
                    hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: true, childID: 1
            },
            { TaskID: 4, TaskName: 'Public and Stakeholder Consultation', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: true, childID: 2 },
            { TaskID: 5, TaskName: 'Review meeting with City/Municipality/Town/County', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: true, childID: 3 },
            { TaskID: 6, TaskName: 'Obtaining necessary permits', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 4 },
            { TaskID: 7, TaskName: 'Pre-design Site visit', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 5 },
            { TaskID: 8, TaskName: 'Preliminary Survey', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 9, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 6 },
            { TaskID: 4, TaskName: 'Traffic Count', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 7 },
            { TaskID: 10, TaskName: 'Identification of Problem/ Opportunity', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
            hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 8 },
        ]
    },
    {
      TaskID: 11, parentID: 1,
      TaskName: 'Environmental Assessment (Project Dependent)',
      StartDate: new Date('04/02/2023'),
      EndDate: new Date('04/21/2023'),
      subtasks: [
          { TaskID: 4, TaskName: 'Development of Alternative Solutions', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
          hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 0 },
          { TaskID: 4, TaskName: 'Development of Alternative Design concepts for preferred solution', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
          hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 1 },
          { TaskID: 4, TaskName: 'Environmental Study Report (ESR)', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
          hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 2 },
          { TaskID: 4, TaskName: 'Public Information Centre', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3', Progress: 30,
          hrs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], visibility: false, childID: 3 },
      ]
  }
  ])
  // console.log(editingData[0].subtasks[0].visibility)
    const [taskData, settaskData] = useState([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      [5, 6, 7, 8, 9, 6, 7, 8, 9, 10, 11, 12, 13],
    ]);

    
const calculateEndDate=(startDate, duration)=> {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
}


    
    const [totalHrs, settotalHrs] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    const totals = ()=>{

    
    // taskData.map((e)=>{
    //   let updatedData = [...totalHrs];
    //   for(let i=0;i<13;i++) {
    //     let val = e[i]+totalHrs[i];
    //     updatedData[i] = val;
    //   }
    //   settotalHrs(updatedData)
    // })
}
    const [prevTasks, setprevTasks] = useState(null);
    const [toChangei, settoChangei] = useState();
    const [toChangeidx, settoChangeidx] = useState();
    const [stageOneTask, setStageOneTask] = useState([]);
    const handleAddTaskStage1 = async (e, pId)=>{
      setisLoading(true);
      // let d = {...editingData};
      let val = e.target.value;
      let prevVal = editingData[pId].subtasks[val].visibility;

      editingData[pId].subtasks[val].visibility = !prevVal;
      // seteditingData(d);
      handleCloseStage1()
      setisLoading(false);
    }
    const call = ()=>{
      setTimeout(() => {
        console.log(1);
      }, 3000);
    }
    const handleHRchange = (a, b, c, d) =>{
        let value = d.target.value;
        let h = [...editingData]
        // handleChangeTotals(value, h[a][b], b);
        h[a].subtasks[b].hrs[c]=value;
        seteditingData(h);
    }
    const handleChangeTotals=(newvalue, oldvalue, col)=>{
      let updated = [...totalHrs];
      newvalue=newvalue?newvalue:0;
      oldvalue=oldvalue?oldvalue:0
      let val = parseInt(updated[col])-parseInt(oldvalue)+parseInt(newvalue);
      updated[col] = val;
      settotalHrs(updated)
    }
    const handleChangeEmployee = (a, b) =>{
      let value = a.target.value;
      let h = {...taskData}
      h[51][b]=value;
      settaskData(h);
  }
    let span = taskData[0].length;
    const calcTotal = () =>{
      let totalSum = 0;
      for(let i=0;i<totalHrs.length;i++) {
        totalSum+=totalHrs[i];
      }
      return totalSum;
    }
    const formatDate = (date) => {
      if (date === "" || date === null || date === undefined) return "";
      const formattedDate = moment(date)
      return formattedDate.format('D MMM, YYYY')
  }

  return (
    isLoading?<LoadingSpinner/>:
    <div>
     <div className='pageHeader'>
      TTM : Name of the Proposal/Project   
     </div> 

      {/* Table Header */}
 
      <div className='tableHeader'> 
        <div className='tableHeaderText'>Name of the Proposal/Project</div>
      </div>

      {/* First four rows table */}
    <div className='tableFixHead'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th className='normals th'>Project Department</th>
            <th className='normals th' colSpan={3}>Timelines</th>
            <th className='normals th' colSpan={3}>Project Management</th>
            <th className='normals th' colSpan={2}>Design</th>
            <th className='normals th' colSpan={3}>Design Team</th>
            <th className='normals th'>Transportation, Traffic Engineering, Traffic control plans and Utility Coordination</th>
            <th className='normals th' colSpan={2}>Bids and Tender Preparation Team</th>
            <th className='normals th' colSpan={2}>Contract administration and Construction Inspection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='normals td'>Designation</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>Start Date</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>End Date</td>
            <td className='normals td' rowSpan={3} style={{paddingTop:'10vh'}}>Duration</td>
            <td className='normals td'>Project Manager</td>
            <td className='normals td'>Project Director</td>
            <td className='normals td'>Qa/QC lead and Risk Manager</td>
            <td className='normals td'>Technical Design Lead</td>
            <td className='normals td'>Transportation Planning and Engineering Lead</td>
            <td className='normals td'>Roadway Designers</td>
            <td className='normals td'>Watermain, Sanitary and Storm Sewer Designers</td>
            <td className='normals td'>Cad Technician</td>
            <td className='normals td'>Transportation, Traffic Engineering, Traffic control plans and Utility Coordination</td>
            <td className='normals td'>TakeOff Engineer</td>
            <td className='normals td'>Junior Engineer</td>
            <td className='normals td'>Contract Administrator</td>
            <td className='normals td'>Site Inspector</td>
          </tr>
          <tr className='tr'>
            <td style={{zIndex:'6'}} className='normals td'>People</td>
            {taskData[51].map((e, idx)=>{
              return (
                <td className='specials td'>
                  <Form.Group>
                    <Form.Select
                      name="assignedTo"
                      onChange={(eve)=>handleChangeEmployee(eve, idx)}
                      // required
                      className="form-select"
                      style={{border:'none', fontSize:'1em', textAlign:'center'}}
                    >
                      <option>Select Employee</option>
                      {employees.length !== 0 ? (
                        employees.map((option) => (
                          <option selected={option.Employee_ID===e} value={option.Employee_ID}>{option.Full_Name}</option>
                        ))
                      ) : (
                        <option value="">None</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </td>
              )
            })
              }
          </tr>
          <tr>
            <td className='normals td'>Rate Per Hour</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
            <td className='specials td'>$ 0.00</td>
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
                  backgroundColor: '#E4FEF1',
                }}>
                  <div className='empty' style={{
                    paddingLeft:'24px'
                  }}>{e.TaskName}</div></td>
                </tr>
                {e.subtasks.map((task)=>{
                  return(
                    <>
                    {task.visibility?
                    <tr>
                      <td style={{paddingLeft:'32px'}} className='td'>{task.TaskName}</td>
                      <td style={{paddingLeft:'12px', width:'fit-content'}} className='td no-focus'><DatePicker selected={task.StartDate} /></td>
                      <td style={{paddingLeft:'12px', width:'fit-content'}} className='td no-focus'><DatePicker selected={calculateEndDate(task.StartDate, task.Duration)} /></td>
                      <td style={{paddingLeft:'32px'}} className='td'>{task.Duration===0?1:task.Duration}</td>
                      {task.hrs.map((h, idx)=>{
                        return (
                          <td  > 
                            <input
                              className='no-focus' placeholder='0'
                              style={style.input}
                              value={h?h:''}
                              onChange={(eve)=>handleHRchange(e.parentID, task.childID ,idx, eve)}
                            />
                          </td>
                        )
                      })}
                      {/* {hrsArray.map((e, idx)=>{
                        return (
                          <td  > 
                            <input
                              className='no-focus' placeholder='0'
                              style={style.input}
                              value={e?e:''}
                              onChange={(eve)=>handleHRchange(0, idx, eve)}
                            />
                      </td>
                        )
                      })} */}
                    </tr>:<></>}</>
                  )
                })}
                <tr><td colSpan={span+1} bgcolor='#FFF'
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
                  <p className='empty' onClick={handleShowStage1} style={{
                    paddingLeft:'24px', cursor:'pointer'
                  }}>Add Task +</p></td>
                </tr>
              </>
            )
          }):<></>}
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
          <Form.Select onChange={handleAddTaskStage1}>
            <option>Select Task</option>
            {stageOneTask.includes('6')?<></>:<option value='6'>Development of Alternative Solutions</option>}
            {stageOneTask.includes('7')?<></>:<option value='7'>Development of Alternative Design concepts for preferred solution</option>}
            {stageOneTask.includes('8')?<></>:<option value='8'>Environmental Study Report (ESR)</option>}
            {stageOneTask.includes('9')?<></>:<option value='9'>Public Information Centre</option>}
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage3} onHide={handleCloseStage3}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Site Investigations (Project Dependent))</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddTaskStage1}>
            <option>Select Task</option>
            {stageOneTask.includes('10')?<></>:<option value='10'>Topographic Survey</option>}
            {stageOneTask.includes('11')?<></>:<option value='11'>Legal Survey</option>}
            {stageOneTask.includes('12')?<></>:<option value='12'>Geotechnical Investigation</option>}
            {stageOneTask.includes('13')?<></>:<option value='13'>SUE Investigation</option>}
            {stageOneTask.includes('14')?<></>:<option value='14'>CCTV Inspection</option>}
            {stageOneTask.includes('15')?<></>:<option value='15'>Hydrogeological Investigation</option>}
            {stageOneTask.includes('16')?<></>:<option value='16'>Environmental Assessment</option>}
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage4} onHide={handleCloseStage4}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Preliminary Design )</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddTaskStage1}>
            <option>Select Task</option>
            {stageOneTask.includes('17')?<></>:<option value='17'>Coordination meeting with relevant authorities</option>}
            {stageOneTask.includes('18')?<></>:<option value='18'>Public Information Centre</option>}
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage5} onHide={handleCloseStage5}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Detailed Design (60%))</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddTaskStage1}>
            <option>Select Task</option>
            {stageOneTask.includes('19')?<></>:<option value='19'>Streetlight Design</option>}
            {stageOneTask.includes('20')?<></>:<option value='20'>Streetscaaping and Landscaping</option>}
            {stageOneTask.includes('21')?<></>:<option value='21'>Property Acquisition Plan</option>}
            {stageOneTask.includes('22')?<></>:<option value='22'>Soil Management Plan</option>}
            {stageOneTask.includes('23')?<></>:<option value='23'>Traffic Control Plan and Construction Staging</option>}
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage6} onHide={handleCloseStage6}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Final Design)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddTaskStage1}>
            <option>Select Task</option>
            {stageOneTask.includes('24')?<></>:<option value='24'>Draft Quantitiy Take-off and Cost Estimation</option>}
          </Form.Select>
        </Modal.Body>
      </Modal>

      <Modal show={showStage7} onHide={handleCloseStage7}>
        <Modal.Header closeButton>
          <Modal.Title>Select Task (Contract Administration and Inscpection Services)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={handleAddTaskStage1}>
            <option>Select Task</option>
            {stageOneTask.includes('25')?<></>:<option value='25'>Completion and Warranty site inspections</option>}
            {stageOneTask.includes('26')?<></>:<option value='26'>Maintenance Period Support</option>}
          </Form.Select>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TTMTable
