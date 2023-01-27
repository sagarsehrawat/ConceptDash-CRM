import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import { HOST, GET_EMPLOYEENAMES, UPDATE_TASK } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

function UpdateTask(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [show, setShow] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({
    title: "",
    priority: "",
    status: "",
    completed: "",
    assignedTo: "",
    description: "",
    startDate: "",
    dueDate: "",
    completedOn: "",
  });
  const [isLoading, setisLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "completed") {
      setpercentComplete(value);
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const location = useLocation();
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
  const [percentComplete, setpercentComplete] = useState(
    props.row.Percent_Completed?props.row.Percent_Completed:''
  );
  let taskId = props.row.Task_ID;
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_TASK,
        {
          completedPercent: form.completed,
          id: taskId,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          closeModal()
          setGreen(true);
          apiCall(api+1)
        } else {
          setRed(true)
        }
      })
      .catch((err) => {
        setisLoading(false);
        setRed(true);
        console.log(err);
      });
  };
  let value1 = new Date(props.row.Start_Date);
  let startMonth, startDay;
  if (value1.getMonth() < 10) {
    startMonth = `0${value1.getMonth()}`;
  } else {
    startMonth = value1.getMonth();
  }
  if (value1.getDate() < 10) {
    startDay = `0${value1.getDate()}`;
  } else {
    startDay = value1.getDate();
  }
  let start = `${value1.getFullYear()}-${startMonth}-${startDay}`;

  let value2 = new Date(props.row.Due_Date);
  let dueMonth, dueDay;
  if (value2.getMonth() < 10) {
    dueMonth = `0${value2.getMonth()}`;
  } else {
    dueMonth = value2.getMonth();
  }
  if (value2.getDate() < 10) {
    dueDay = `0${value2.getDate()}`;
  } else {
    dueDay = value2.getDate();
  }
  let due = `${value2.getFullYear()}-${dueMonth}-${dueDay}`;
  return (
    isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              disabled
              value={props.row.Title}
              name="title"
              placeholder="Title*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              disabled
              value={props.row.Priority}
              name="priority"
              placeholder="Priority"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              value={percentComplete}
              name="completed"
              type="number"
              placeholder="% Completed"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              disabled
              value={start}
              name="startDate"
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              disabled
              value={due}
              name="dueDate"
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              disabled
              value={props.row.Description?props.row.Description:''}
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
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
