import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { HOST, GET_EMPLOYEENAMES, ADD_TASK, GET_PROJECT_NAMES, GET_RFP_NAMES, GET_PROPOSALS_NAMES, PRIMARY_COLOR } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";


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
  }
}
function AddTask(props) {
  const [isLoading, setisLoading] = useState(false);
  const { setGreen, closeModal, setRed } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [due, setdue] = useState("");
  const [form, setform] = useState({
    type: "",
    title: "",
    id: "",
    reviewedBy: "",
    priority: "",
    assignedTo: "",
    assignedToName: "",
    description: "",
    startDate: "",
    dueDate: "",
  });
  let date = new Date();
  let month;
  if (date.getMonth() < 9) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth() + 1;
  }
  let entry_date = `${date.getFullYear()}-${month}-${date.getDate()}`;
  let due_date = due ? due.substring(0, 10) : "";
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    const newForm = {...form};
    if(name==='assignedTo'){
      newForm['assignedTo'] = value[0]
      newForm['assignedToName'] = value.slice(2)
    }else{
      newForm[name] = value;
    }
    setform(newForm);
  };

  const [employees, setemployees] = useState([]);
  const [projects, setprojects] = useState([]);
  const [proposals, setproposals] = useState([]);
  const [rfp, setrfp] = useState([]);
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
        await axios
        .get(HOST + GET_PROJECT_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojects(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
        await axios
        .get(HOST + GET_PROPOSALS_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setproposals(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
        await axios
        .get(HOST + GET_RFP_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setrfp(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, []);
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_TASK,
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
          type: type,
          id: id,
          title: form.title,
          priority: form.priority,
          assignedTo: form.assignedTo,
          assignedToName: form.assignedToName,
          description: form.description,
          startDate: form.startDate,
          dueDate: form.dueDate,
          assignedBy: localStorage.getItem("employeeId"),
          reviewedBy: form.reviewedBy,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
        setisLoading(false);
        if (res.data.success) {
          closeModal();
          setGreen(true);
        } else {
          setRed(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setRed(true);
      });
  };
  var d = new Date();
  var offset = d.getTimezoneOffset();
  var hours = Math.floor(Math.abs(offset) / 60);
  var minutes = Math.abs(offset) % 60;
  if (minutes === 0) {
    minutes = "00";
  }
  var sign = offset > 0 ? "-" : "+";
  let offset1 = `${sign}0${hours}:${minutes}`;
  const handleChange2 = (e) => {
    let newValue = e.target.value + ":00" + offset1;
    setdue(newValue);
  };
  const [radio, setradio] = useState("1");
  const [type, settype] = useState("General");
  const radioChange = (e) => {
    setradio(e.target.id.toString());
    settype(e.target.value)
  };
  const [id, setid] = useState('');
  const handleID = (e) =>{
    setid(e.target.value);
  }
  const evaluateOptions = () => {
    if (radio === "2") {
      return (
        <Form.Group as={Col}>
          <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Choose Project</Form.Label>
          <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleID}>
            <option>Select Project</option>
            {projects?projects.map((e)=>(
              <option value={e.Project_ID}>{e.Project_Name}</option>
            )):<></>}
          </Form.Select>
        </Form.Group>
      );
    } else if (radio === "3") {
      return (
        <Form.Group as={Col}>
          <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Choose Proposal</Form.Label>
          <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleID}>
            <option>Select Proposal</option>
            {proposals?proposals.map((e)=>(
              <option value={e.Proposal_ID}>{e.Project_Name}</option>
            )):<></>}
          </Form.Select>
        </Form.Group>
      );
    } else if (radio === "4") {
      return (
        <Form.Group as={Col}>
          <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Choose RFP</Form.Label>
          <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleID}>
            <option>Select RFP</option>
            {rfp?rfp.map((e)=>(
              <option value={e.RFP_ID}>{e.Project_Name}</option>
            )):<></>}
          </Form.Select>
        </Form.Group>
      );
    }  else {
      return <></>;
    }
  };
  return(
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
   {isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
   
      <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
        <Row>
            <Form.Label  style={styles.nameHeading}>Choose Task Type</Form.Label>
          <Form.Group onChange={radioChange}>
            <Form.Check
              value='General'
              inline
              type="radio"
              defaultChecked
              name="group1"
              id="1"
              label="General"
            />
            <Form.Check
              value='Projects'
              inline
              type="radio"
              name="group1"
              id="2"
              label="Projects"
            />
            <Form.Check
              value='Proposals'
              inline
              type="radio"
              name="group1"
              id="3"
              label="Proposals"
            />
            <Form.Check value='RFP' inline type="radio" name="group1" id="4" label="RFPs" />
            <Form.Check value='HR' inline type="radio" name="group1" id="5" label="HR" />
            <Form.Check
              value='Finance'
              inline
              type="radio"
              name="group1"
              id="6"
              label="Finance"
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          {evaluateOptions()}
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label style={styles.nameHeading}>Enter Task Name</Form.Label>
            <Form.Control
                style={styles.nameInput}
              name="title"
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
                style={styles.nameInput}
              name="description"
              as="textarea"
              rows={2}
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
                  <option value={[option.Employee_ID, option.Full_Name]}>{option.Full_Name}</option>
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
                  <option value={option.Employee_ID}>{option.Full_Name}</option>
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
              style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
            >
              <option>Choose Priority</option>
              <option value="1">Super urgent</option>
              <option value="2">Urgent</option>
              <option value="3">Moderate</option>
              <option value="4">Low</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
        <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Start Date</Form.Label>
            <Form.Control
              name="startDate"
              type="date"
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
              onChange={handleChange}
              required
                  style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            />
          </Form.Group>
        </Row>
        
       
        
        <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Add New Task
            </Button>
            </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task Added Successfully</Modal.Body>
      </Modal>
    
  </>)}</div>
  )
}

export default AddTask;
