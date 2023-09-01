import React, { useState, useEffect } from 'react'
import './TTMTable.css'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { HOST, GET_EMPLOYEENAMES, GET_TTM, UPDATE_TTM } from '../../Constants/Constants';
import LoadingSpinner from '../../Loader/Loader'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';

function TTMTable() {
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

  const [employees, setemployees] = useState([]);
  const [a, seta] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [editingData, seteditingData] = useState([])
  const [emps, setemps] = useState([])
  const [rate, setrate] = useState([])
  
  useEffect(() => {
    setisLoading(true);
    const call = async() => {
      await axios
        .get(HOST + GET_TTM, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), proposalId:"78" }
        })
        .then((res) => {
          let data = JSON.parse(res.data.res[0].Data)
          let empIDs = JSON.parse(res.data.res[0].Employee_Info)[0]
          let hrRates = JSON.parse(res.data.res[0].Employee_Info)[1]
          setemps(empIDs)
          setrate(hrRates)
          seteditingData(data)
          // seteditingData(JSON.parse(res.data.res[0].Data))
        })
        .catch((err) => {
          console.log(err);
        });

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
  
  // console.log(editingData[0].subtasks[0].visibility)
    
const calculateEndDate=(startDate, duration)=> {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
}


    
    const [totalHrs, settotalHrs] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    
    const totals = ()=>{

    {editingData.map((e)=>{
      {e.subtasks.map((f)=>{
        {f.visibility??f.hrs.map((g)=>{
          console.log(1)
        })}
      })}
    })}
}
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
        handleChangeTotals(value, h[a].subtasks[b].hrs[c], c);
        h[a].subtasks[b].hrs[c]=value;
        setchange(true)
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
      let h = [...emps]
      h[b]=parseInt(value);
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
        await axios
            .post(
                HOST + UPDATE_TTM,
                {
                    data: JSON.stringify(editingData),
                    employeeInfo: JSON.stringify([emps, rate])
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                console.log(res)
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
  return (
    isLoading?<LoadingSpinner/>:
    <div>
     <div className='d-flex flex-row justify-content-between'>
      <div className='pageHeader'>TTM : Name of the Proposal/Project</div>
      {change?<Button variant='success' onClick={handleSubmit} style={{marginRight:'2vw', height:'8vh'}}>Save Changes</Button>:<></>}
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
            {emps.map((e, idx)=>{
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
            {rate.map((e, idx)=>{
              return(
                <td className='specials td'>
                  <input
                      className='no-focus' placeholder='$ 0'
                      style={style.input}
                      value={e?e:''}
                      onChange={(eve)=>handleChangeRate(eve, idx)}
                  />
                </td>
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
                      <td style={{paddingLeft:'12px', width:'fit-content'}} className='td no-focus'><DatePicker dateFormat="d MMM yyyy" onChange={(date)=>handleDatesChange(date, "start", e.parentID, task.childID)} selected={new Date(task.StartDate)} /></td>
                      <td style={{paddingLeft:'12px', width:'fit-content'}} className='td no-focus'><DatePicker dateFormat="d MMM yyyy" onChange={(date)=>handleDatesChange(date, "end", e.parentID, task.childID)} selected={calculateEndDate(new Date(task.StartDate), task.Duration)} /></td>
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
                  }}>Add Task +</p></td>
                </tr>}
              </>
            )
          }):<></>}
          {/* <tr className='tr'>
            <td className='td'>Totals</td>
            <td className='td'>20</td>
            <td className='td'>20</td>
            <td className='td'>20</td>
            {totalHrs.map((e)=>{
              return(
                <td className='td' style={{zIndex:'6'}}>{e}</td>
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
    </div>
  )
}

export default TTMTable
