import React, { useState, useEffect } from 'react'
import './TTMTable.css'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { HOST, GET_EMPLOYEENAMES } from '../../Constants/Constants';
import LoadingSpinner from '../../Loader/Loader'

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
    
    const [totalHrs, settotalHrs] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    const totals = ()=>{

    
    taskData.map((e)=>{
      let updatedData = [...totalHrs];
      for(let i=0;i<13;i++) {
        let val = e[i]+totalHrs[i];
        updatedData[i] = val;
      }
      settotalHrs(updatedData)
    })
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
    const handleHRchange = (a, b, c) =>{
        let value = c.target.value;
        let h = {...taskData}
        handleChangeTotals(value, h[a][b], b);
        h[a][b]=value;
        settaskData(h);
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
    console.log(editingData)

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
              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                      {task.hrs.map((e, idx)=>{
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
                      })}
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
          {/* <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
            }}>Project Initiation </div></td>
          </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Project Initiation meeting</td>
                {taskData[0].map((e, idx)=>{
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
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Background data collection and Field review</td>
                {taskData[1].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(1, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Public and Stakeholder Consultation</td>
                {taskData[2].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(2, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Review meeting with City/Municipality/Town/County</td>
                {taskData[3].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(3, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              {stageOneTask.includes('1')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Obtaining necessary permits</td>
                {taskData[4].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(4, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('2')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Pre-design Site visit</td>
                {taskData[5].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(5, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('3')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Preliminary Survey</td>
                {taskData[6].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(6, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('4')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Traffic Count</td>
                {taskData[7].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(7, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('5')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Identification of Problem/ Opportunity</td>
                {taskData[8].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(8, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                <p className='empty' onClick={handleShow} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>
              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Environmental Assessment (Project Dependent)</p></td>
              </tr>
              {stageOneTask.includes('6')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Development of Alternative Solutions</td>
                {taskData[9].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(9, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('7')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Development of Alternative Design concepts for preferred solution</td>
                {taskData[10].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(10, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('8')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Environmental Study Report (ESR)</td>
                {taskData[11].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(11, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('9')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Public Information Centre</td>
                {taskData[12].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(12, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                position: 'sticky'
              }}>
                <p className='empty' onClick={handleShowStage2} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>
              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Site Investigations (Project Dependent)</p></td>
              </tr>
              {stageOneTask.includes('10')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Topographic Survey</td>
                {taskData[13].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(13, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('11')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Legal Survey</td>
                {taskData[14].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(14, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('12')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Geotechnical Investigation</td>
                {taskData[15].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(15, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('13')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>SUE Investigation</td>
                {taskData[16].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(16, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('14')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>CCTV Inspection</td>
                {taskData[17].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(17, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('15')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Hydrogeological Investigation</td>
                {taskData[18].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(18, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('16')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Environmental Assessment</td>
                {taskData[19].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(19, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                <p className='empty' onClick={handleShowStage3} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>

              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Preliminary Design </p></td>
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Preliminary Design (30%)</td>
                {taskData[20].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(20, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Preliminary Design - Submission and Review</td>
                {taskData[21].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(21, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Traffic Control Plan and Construction Staging</td>
                {taskData[22].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(22, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Review meeting with City/Municipality/Town/County</td>
                {taskData[23].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(23, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              {stageOneTask.includes('17')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Coordination meeting with relevant authorities</td>
                {taskData[24].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(24, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('18')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Public Information Centre</td>
                {taskData[25].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(25, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                <p className='empty' onClick={handleShowStage4} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>

              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Detailed Design (60%)</p></td>
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Detailed Design (60%)</td>
                {taskData[26].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(26, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Preliminary Design - Submission and Review</td>
                {taskData[27].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(27, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              {stageOneTask.includes('19')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Streetlight Design</td>
                {taskData[28].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(28, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('20')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Streetscaaping and Landscaping</td>
                {taskData[29].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(29, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('21')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Property Acquisition Plan</td>
                {taskData[30].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(30, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('22')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Soil Management Plan</td>
                {taskData[31].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(31, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('23')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Traffic Control Plan and Construction Staging</td>
                {taskData[32].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(32, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                <p className='empty' onClick={handleShowStage5} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>

              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Detailed Design (90%)</p></td>
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Detailed Design (90%)</td>
                {taskData[33].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(33, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Detailed Design (90%) - Submission and Review</td>
                {taskData[34].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(34, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Traffic Control Plan and Construction Staging</td>
                {taskData[35].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(35, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Agency and Regulatory Approvals</td>
                {taskData[36].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(36, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Review meeting with City/Municipality/Town/County</td>
                {taskData[37].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(37, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Coordination with affected landowners and stakeholder</td>
                {taskData[38].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(38, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Finalization of Traffic Management Plan</td>
                {taskData[39].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(39, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Final Design</p></td>
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>FInal Design - Submission and Review</td>
                {taskData[40].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(40, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Preparationa nd Submission of Final Engineering drawings</td>
                {taskData[41].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(41, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              {stageOneTask.includes('24')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Draft Quantitiy Take-off and Cost Estimation</td>
                {taskData[42].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(42, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                <p className='empty' onClick={handleShowStage6} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>

              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Tender</p></td>
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Preparation and submission of detailed cost estimate and tender documents</td>
                {taskData[43].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(43, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Review of tender submissions and provide recommendation letter for the award of the tender/construction contract</td>
                {taskData[44].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(44, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>

              <tr><td colSpan={span+1} bgcolor='#E4FEF1'
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
                <p className='empty' style={{
                  paddingLeft:'24px'
                }}>Contract Administration and Inscpection Services</p></td>
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Pre-construction meeting</td>
                {taskData[45].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(45, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Contract Administration</td>
                {taskData[46].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(46, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Construction Inspection</td>
                {taskData[47].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(47, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>As-built drawings</td>
                {taskData[48].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(48, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              {stageOneTask.includes('25')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Completion and Warranty site inspections</td>
                {taskData[49].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(49, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
              {stageOneTask.includes('26')?<tr>
                <td style={{paddingLeft:'32px'}} className='td'>Maintenance Period Support</td>
                {taskData[50].map((e, idx)=>{
                  return (
                    <td  >
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(50, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>:<></>}
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
                <p className='empty' onClick={handleShowStage7} style={{
                  paddingLeft:'24px', cursor:'pointer'
                }}>Add Task +</p></td>
              </tr>
              
              <tr className='tr'>
                <td className='td' style={{paddingLeft:'32px', zIndex:'9', backgroundColor:'#DBDBF4', border:'1px solid #f7f7f9'}} >Total Hours</td>
                {totalHrs.map((e, idx)=>{
                  return (
                    <td className='td' style={{backgroundColor:'#DBDBF4', border:'1px solid #f7f7f9', zIndex:'5'}}>
                      <p
                        className='no-focus' placeholder='0'
                        style={style.input}
                      >{e}</p>
                    </td>
                  )
                })}
              </tr>
              <tr className='tr'>
                <td className='td' style={{paddingLeft:'32px', zIndex:'8', backgroundColor:'#DBDBF4', border:'1px solid #f7f7f9'}} >Total Fees</td>
                {totalHrs.map((e, idx)=>{
                  return (
                    <td className='td' style={{backgroundColor:'#DBDBF4', border:'1px solid #f7f7f9', zIndex:'4'}}>
                      <p
                        className='no-focus' placeholder='0'
                        style={style.input}
                      >{e*taskData[52][idx]}</p>
                    </td>
                  )
                })}
              </tr>
              <tr className='tr'>
                <td className='td' style={{paddingLeft:'32px', zIndex:'7', backgroundColor:'#DBDBF4', border:'1px solid #f7f7f9'}} >Time Percentage</td>
                {totalHrs.map((e, idx)=>{
                  return (
                    <td className='td' style={{backgroundColor:'#DBDBF4', border:'1px solid #f7f7f9', zIndex:'3'}}>
                      <p
                        className='no-focus' placeholder='0'
                        style={style.input}
                      >{((e/calcTotal())*100).toPrecision(3)} %</p>
                    </td>
                  )
                })}
              </tr> */}
              {/* <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Total Hours</td>
                {taskData[50].map((e, idx)=>{
                  return (
                    <td>
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(50, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td style={{paddingLeft:'32px'}} className='td'>Total Hours</td>
                {taskData[50].map((e, idx)=>{
                  return (
                    <td>
                      <input
                        className='no-focus' placeholder='0'
                        style={style.input}
                        value={e?e:''}
                        onChange={(eve)=>handleHRchange(50, idx, eve)}
                      />
                    </td>
                  )
                })}
              </tr> */}

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
