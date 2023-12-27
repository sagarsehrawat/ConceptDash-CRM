import React from 'react'
import { useState } from 'react';
import checkIcon from '../../../../Images/checkIcon.svg'
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function NewTaskorMilestone(props) {
  const [selectHeading, setselectHeading] = useState(0);
  const [taskName, settaskName] = useState('');
  const [milestoneName, setmilestoneName] = useState('');
  const {data, seteditingData, change, setchange, show, setshow, selectedMilestone} = props;
  const [milestoneID, setmilestoneID] = useState(selectedMilestone);
  const handleChange = (e) =>{
    const {name, value} = e.target;
    if(name==='mileID') {
      setmilestoneID(value);
    }
    if(name==='task') {
      settaskName(value);
    }
    if(name==='milename') {
      setmilestoneName(value);
    }
  }
  console.log(milestoneID)
  const styles = {
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
    },
    headingText: {
      color: "var(--Dark-grey, #70757A)",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px"
    },
    buttonCSS: {
      borderRadius: "5px",
      border: "1px solid var(--Checkbox-colour, #BEBEC0)",
      boxShadow: "0px 4px 8px 0px rgba(88, 82, 246, 0.25)",
      height:'36px',
      padding: "var(--8-pad, 8px) 16px",
      justifyContent: "center",
      alignItems: "center",
      gap: "var(--8-pad, 8px)",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px"
    }
  }
  const addTask = () =>{
    let h = [...data];
    let mileID;
    for(let i=0;i<h.length;i++) {
      if(h[i].parentID===milestoneID) {
        mileID = i;
        break;
      }
    }
    console.log(mileID)
    let newTaskID = h.length;
    for(let i=0;i<h.length;i++) {
      newTaskID+=h[i].subtasks.length;
    }
    let hrLength = h[0].subtasks[0].hrs.length;
    const arr = new Array(hrLength).fill(0);
    let newChildID = h[mileID].subtasks.length>0?h[mileID].subtasks[h[mileID].subtasks.length-1].childId:0;
    let insertData = {
        TaskID: newTaskID,
        TaskName: taskName,
        StartDate: new Date(),
        Duration: 0,
        Predecessor: '',
        Progress: 0,
        hrs: arr,
        visibility: true,
        status: 0,
        childId: newChildID+1,
    }
    h[mileID].subtasks.push(insertData)
    seteditingData(h);
    setchange(!change);
    setshow();
    // h[milestoneID].subtasks
  }
  const addMilestone = () =>{
    let h = [...data];
    let newMileID = h.length;
    let newTaskID = h.length;
    for(let i=0;i<h.length;i++) {
      newTaskID+=h[i].subtasks.length;
    }
    let insertData = {
      TaskID: newTaskID,
      parentID: newMileID,
      TaskName: milestoneName,
      StartDate: new Date(),
      EndDate: new Date(),
      subtasks: []
    }
    h.splice(selectedMilestone+1, 0, insertData)
    seteditingData(h);
    setchange(!change);
    setshow();
    // h[milestoneID].subtasks
  }
  return (
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      <div style={{display:'flex', flexDirection:'row', marginLeft:'16px'}}>
        <div onClick={()=>setselectHeading(0)} style={{...styles.formHeadings, borderRadius:'24px 0px 0px 24px', background: selectHeading===0?"#EFF1FA":"#FFF", color: selectHeading===0?"var(--mob-primary-colour, #8361FE)":"var(--Black-text, #3D424F)"}}>{selectHeading===0?<img src={checkIcon} style={{marginRight:'8px'}} />:<></>}Add Task</div>
        <div onClick={()=>setselectHeading(1)} style={{...styles.formHeadings, background: selectHeading===1?"#EFF1FA":"#FFF", color: selectHeading===1?"var(--mob-primary-colour, #8361FE)":"var(--Black-text, #3D424F)"}}>{selectHeading===1?<img src={checkIcon} style={{marginRight:'8px'}} />:<></>}Add Milestone</div>
      </div>
      {selectHeading===0?
        <div style={{marginTop:'20px'}}>
          <Form className="form-main" style={{marginTop:'0px', marginLeft:'12px', marginRight:'0px'}}>
            <Row>
              <Form.Label style={styles.headingText}>Choose Milestone<span style={{color:'red'}}>*</span></Form.Label>
              <Form.Select onChange={handleChange} name='mileID' style={{...styles.headingText, width:'380px'}} required>
              <option>Select Milestone</option>
                {data.map((e)=>{
                  return (
                  <option selected={e.parentID===selectedMilestone} value={e.parentID}>{e.TaskName}</option>
                  )
                })}
              </Form.Select>
            </Row>
            <Row>
              <Form.Label required style={{...styles.headingText, marginTop:'20px'}}>Add Task<span style={{color:'red'}}>*</span></Form.Label>
              <Form.Control onChange={handleChange} name='task' placeholder='Enter Task Name' style={{width:'380px', height:'32px'}} type='text' />
            </Row>
          </Form>
          <div style={{display:'flex', flexDirection:'row', marginLeft:'190px', marginTop:'20px'}}>
              <button onClick={setshow} style={{...styles.buttonCSS, color:'var(--Dark-grey, #70757A)', marginRight:'20px'}}>Cancel</button>
              <button onClick={addTask} style={{...styles.buttonCSS, color:'#FBFBFB', background:'var(--mob-primary-colour, #8361FE)'}}>Add Task</button>
          </div>
        </div>:
        <div>
          <Form className="form-main" style={{marginTop:'0px', marginLeft:'12px', marginRight:'0px'}}>
            <Row>
              <Form.Label style={{...styles.headingText, marginTop:'40px', marginBottom:'10px'}}>Add Milestone<span style={{color:'red'}}>*</span></Form.Label>
              <Form.Control onChange={handleChange} required name='milename' placeholder='Enter Milestone Name' style={{width:'380px', height:'32px'}} type='text' />
            </Row>
          </Form>
          <div style={{display:'flex', flexDirection:'row', marginLeft:'160px', marginTop:'20px'}}>
              <button onClick={setshow} style={{...styles.buttonCSS, color:'var(--Dark-grey, #70757A)', marginRight:'20px'}}>Cancel</button>
              <button onClick={addMilestone} style={{...styles.buttonCSS, color:'#FBFBFB', background:'var(--mob-primary-colour, #8361FE)'}}>Add Milestone</button>
          </div>
        </div>
    }
        
    </div>
  )
}

export default NewTaskorMilestone
