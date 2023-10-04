import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import { HOST, GET_EMPLOYEENAMES, UPDATE_TASK, PRIMARY_COLOR } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";
import TFButton from "../../components/ui/Button/Button";
const styles = {
  nameHeading: {
    height: "20px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#70757A"
  },
  nameInput: {
    width: "740px",
    height: "32px",
    border: "1px solid #EBE9F1",
    borderRadius: "6px",
    padding:6
  },
  nameInput1: {
    width: "740px",
    border: "1px solid #EBE9F1",
    borderRadius: "6px",
    padding:6
  }
}
function UpdateTask(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [show, setShow] = useState(false);
  const { setgreen, closeModal, api, apiCall, setred, updateTask } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({
    title: updateTask.Title??updateTask.Title,
    reviewedBy: updateTask.Reviewed_By??updateTask.Reviewed_By,
    priority: updateTask.Priority??updateTask.Priority,
    assignedTo: updateTask.Assigned_To??updateTask.Assigned_To,
    description: updateTask.Description??updateTask.Description,
    startDate: updateTask.Start_Date??updateTask.Start_Date,
    dueDate: updateTask.Due_Date??updateTask.Due_Date,
  });
  const [isLoading, setisLoading] = useState(false)
  const [title, settitle] = useState(updateTask.Title)
  const [review, setreview] = useState(updateTask.Reviewed_By)
  const [priority, setpriority] = useState(updateTask.Priority)
  const [assignto, setassignto] = useState(updateTask.Assigned_To)
  const [descrip, setdescrip] = useState(updateTask.Description)
  const [sDate, setsDate] = useState(updateTask.Start_Date)
  const [dDate, setdDate] = useState(updateTask.Due_Date)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='title') {
      settitle(value);
    }
    if(name==='reviewedBy') {
      setreview(value);
    }
    if(name==='priority') {
      setpriority(value);
    }
    if(name==='assignedTo') {
      setassignto(value);
    }
    if(name==='description') {
      setdescrip(value);
    }
    if(name==='startDate') {
      setsDate(value);
    }
    if(name==='dueDate') {
      setdDate(value);
    }

    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  useEffect(() => {
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
    };
    call();
  }, []);
  
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_TASK,
        {
          id: updateTask.Task_ID,
          type: updateTask.Type,
          title: title,
          ID: updateTask.ID,
          description: descrip,
          startDate: sDate,
          dueDate: dDate,
          assignedTo: assignto,
          assignedBy: updateTask.Assigned_By?updateTask.Assigned_By:localStorage.getItem('employeeId'),
          reviewedBy: review,
          priority: priority,
          status: updateTask.Status===0?1:updateTask.Status
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          closeModal()
          setgreen(true);
          apiCall(api+1)
        } else {
          setred(true)
        }
      })
      .catch((err) => {
        setisLoading(false);
        setred(true);
        console.log(err);
      });
  };
  // let value1 = new Date(props.row.Start_Date);
  // let startMonth, startDay;
  // if (value1.getMonth() < 10) {
  //   startMonth = `0${value1.getMonth()}`;
  // } else {
  //   startMonth = value1.getMonth();
  // }
  // if (value1.getDate() < 10) {
  //   startDay = `0${value1.getDate()}`;
  // } else {
  //   startDay = value1.getDate();
  // }
  // let start = `${value1.getFullYear()}-${startMonth}-${startDay}`;

  // let value2 = new Date(props.row.Due_Date);
  // let dueMonth, dueDay;
  // if (value2.getMonth() < 10) {
  //   dueMonth = `0${value2.getMonth()}`;
  // } else {
  //   dueMonth = value2.getMonth();
  // }
  // if (value2.getDate() < 10) {
  //   dueDay = `0${value2.getDate()}`;
  // } else {
  //   dueDay = value2.getDate();
  // }
  // let due = `${value2.getFullYear()}-${dueMonth}-${dueDay}`;
  return (
    isLoading?<LoadingSpinner/>:
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
      <Row>
      <Form.Group as={Col}>
            <Form.Label style={styles.nameHeading}>Project Name</Form.Label>
            <Form.Control
                style={styles.nameInput}
              placeholder="Task Name"
              value={updateTask.Project_Name}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
      </Row>
        {/* <Row className="mb-4">
          {evaluateOptions()}
        </Row> */}
        <Row>
          <Form.Group as={Col}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Enter Task Name</Form.Label>
            <Form.Control
                style={styles.nameInput}
              name="title"
              value={title}
              placeholder="Task Name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Task Description</Form.Label>
            <Form.Control
                style={styles.nameInput1}
              name="description"
              as="textarea"
              value={descrip}
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <hr style={{
          background: '#EBE9F1',
          color: '#EBE9F1',
          borderColor: '#EBE9F1',
          height: '1px',
        }}/>
        <Row>
          <Form.Label style={{...styles.nameHeading}}>Task Information</Form.Label>
        </Row>
        <Row>
          <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'20px'}}>Task Owner</Form.Label>
            <Form.Select
              name="assignedTo"
              onChange={handleChange}
              required
              style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
            >
              <option>Owner</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option selected={option.Employee_ID===assignto} value={option.Employee_ID}>{option.Full_Name}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'20px'}}>Reviewd By</Form.Label>
            <Form.Select
              name="reviewedBy"
              onChange={handleChange}
              required
              style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            >
              <option>Reviewer</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option selected={option.Employee_ID===review} value={option.Employee_ID}>{option.Full_Name}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'20px'}}>Task Priority</Form.Label>
            <Form.Select
              name="priority"
              required
              onChange={handleChange}
              defaultValue={priority}
              style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
            >
              <option>Choose Priority</option>
              <option selected={priority===1} value="1">Critical</option>
              <option selected={priority===2} value="2">High</option>
              <option selected={priority===3} value="3">Medium</option>
              <option selected={priority===4} value="4">Low</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
        <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Start Date</Form.Label>
            <Form.Control
              name="startDate"
              type="date"
              value={sDate?sDate.substring(0, 10):''}
              onChange={handleChange}
              required
              style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            />
          </Form.Group>
          <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Due Date</Form.Label>
            <Form.Control
              name="dueDate"
              type="date"
              value={dDate?dDate.substring(0, 10):''}
              onChange={handleChange}
              required
              style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            />
          </Form.Group>
        </Row>
        
       
        <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            {/* <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Update Task
            </Button> */}
            <TFButton label="Cancel" variant="secondary" handleClick={closeModal} customStyles={{marginRight: '20px'}} size="small"/>
              <TFButton label="Update Task" type="submit" size="small"/>
            </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task Updated Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateTask;
