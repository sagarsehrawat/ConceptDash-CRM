import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import { HOST, GET_EMPLOYEENAMES, ADD_TASK } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";

function AddMyTask() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [form, setform] = useState({
    title: "",
    priority: "",
    completed: "",
    description: "",
    startDate: "",
    dueDate: "",
    completedOn: "",
    attachments: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
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
    e.preventDefault();
    setIsSubmit(true);
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
          assignedTo: localStorage.getItem("employeeId"),
          description: form.description,
          startDate: form.startDate,
          dueDate: form.dueDate,
          completedOn: form.completedOn,
          attachments: form.attachments,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const callFunc = () => {
    handleClose();
    navigate("/engineers");
  };
  return (
    <div>
      <Form className="form-main">
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Title*</Form.Label>
            <Form.Control
              name="title"
              type="text"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Priority</Form.Label>
            <Form.Control name="priority" type="text" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>% Completed</Form.Label>
            <Form.Control
              name="completed"
              type="number"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="startDate"
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Due Date</Form.Label>
            <Form.Control name="dueDate" type="date" onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Completed On</Form.Label>
            <Form.Control
              name="completedOn"
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="attachments"
              type="file"
              placeholder="Attachments"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task Added Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddMyTask;
