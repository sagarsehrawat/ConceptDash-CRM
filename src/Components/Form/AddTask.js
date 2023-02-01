import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { HOST, GET_EMPLOYEENAMES, ADD_TASK } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

function AddTask(props) {
  const [isLoading, setisLoading] = useState(false)
  const { setGreen, closeModal, setRed } = props
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setform] = useState({
    title: "",
    priority: "",
    completed: "",
    assignedTo: "",
    description: "",
    startDate: "",
    dueDate: "",
    completedOn: "",
  });
  let date = new Date();
  let month;
  if(date.getMonth()<9) {
    month = `0${date.getMonth()+1}`
  } else {
    month = date.getMonth()+1;
  }
  let entry_date = `${date.getFullYear()}-${month}-${date.getDate()}`
  console.log(month);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [employees, setemployees] = useState([]);
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
    console.log("submitted");
    axios
      .post(
        HOST + ADD_TASK,
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
          title: form.title,
          priority: form.priority,
          completedPercent: form.completed,
          assignedTo: form.assignedTo,
          description: form.description,
          startDate: entry_date,
          dueDate: form.dueDate,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false)
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
  return (
    isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="title"
              placeholder="Title*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select
              name="priority"
              required
              placeholder="Priority"
              onChange={handleChange}
            >
              <option>Select Priority</option>
              <option value='1'>Urgent</option>
              <option value='2'>Moderate</option>
              <option value='3'>Low</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="completed"
              type="number"
              placeholder="% Completed"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              name="assignedTo"
              type="text"
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option value={option.Employee_ID}>{option.Full_Name}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group as={Col}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="startDate"
              type="date"
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          <Form.Group as={Col}>
            <Form.Label>Due Date</Form.Label>
            <Form.Control name="dueDate" type="date" onChange={handleChange} required />
          </Form.Group>
          {/* <Form.Group as={Col}>
            <Form.Label>Completed On</Form.Label>
            <Form.Control
              name="completedOn"
              type="date"
              onChange={handleChange}
            />
          </Form.Group> */}
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="description"
              as="textarea"
              rows={2}
              placeholder="Description"
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group as={Col}>
            <Form.Control
              name="attachments"
              type="file"
              placeholder="Attachments"
              onChange={handleChange}
            />
          </Form.Group> */}
        </Row>
        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
          // onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task Added Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default AddTask;
