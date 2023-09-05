import React, { useEffect, useState, useContext } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_MANAGERS,
  GET_ALL_PROJECT_NAMES,
  ADD_PROJECT_PAYMENT,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import Select from "react-select";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";
import AddCategory from "./AddCategory";
import AuthContext from "../../Context/AuthContext";

function ProjectPaymentForm(props) {
  const { privileges, setPrivileges } = useContext(AuthContext);
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    projectId: "",
    approvedBy: "",
    paymentMethod: "",
    paymentDate: "",
    paymentAmount: "",
    totalAmount: "",
    balance: "",
  });
  const [balance, setbalance] = useState(0);
  const [payment, setpayment] = useState(0);
  const [total, settotal] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    if(name==='paymentAmount') {
      setpayment(value);
      setbalance(total-value)
    }
    if(name=='totalAmount') {
      settotal(value)
      setbalance(value-payment)
    }
    newForm[name] = value;
    setform(newForm);
  };
  const [employees, setemployees] = useState([]);
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_MANAGERS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees(res.data.res);
          console.log(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(HOST + GET_ALL_PROJECT_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojects(res.data.res);
          console.log(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_PROJECT_PAYMENT,
        {
          projectId: form.projectId,
          approvedBy: form.approvedBy,
          paymentMethod: form.paymentMethod,
          paymentDate: form.paymentDate,
          paymentAmount: form.paymentAmount,
          totalAmount: form.totalAmount,
          balance: form.balance,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
        setisLoading(false);
        if (res.data.success) {
          closeModal();
          setGreen(true);
          apiCall(api + 1);
        } else {
          setRed(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        setRed(true);
      });
  };
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="projectId">
                  <option value="">Select Project</option>
                  {projects.length > 0
                    ? projects.map((e) => (
                        <option value={e.Project_ID}>{e.Project_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            {/* <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Project Due Date</Form.Label>
                <Form.Control
                  name="dueDate"
                  type="date"
                  placeholder="Project Due Date*"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row> */}
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select
                  onChange={handleChange}
                  name="approvedBy"
                  required
                >
                  <option value="">Approved By</option>
                  {employees.length > 0
                    ? employees.map((e) => (
                        <option value={e.Employee_ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  name="paymentDate"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select name="projectMethod" onChange={handleChange}>
                  <option value="">Payment Method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Via Cash">Via Cash</option>
                  <option value="Via Transfer">Via Transfer</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Invoice Amount</Form.Label>
                <Form.Control
                  name="totalAmount"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control
                  name="paymentAmount"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  name="balance"
                  value={balance}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            
            <Button className="submit-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          
        </>
      )}
    </>
  );
}

export default ProjectPaymentForm;
