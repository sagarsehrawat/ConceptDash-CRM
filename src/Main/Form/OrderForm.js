import React, { useEffect, useState, useContext } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_ALL_PROJECT_NAMES,
  GET_CUSTOMERNAMES,
  ADD_PROJECT_INVOICE,
  GET_MANAGERS,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from "../../Context/AuthContext";

function OrderForm(props) {
  const { privileges, setPrivileges } = useContext(AuthContext);
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    projectId: "",
    employeeId: "",
    customerId: "",
    orderDate: "",
    orderItems: "",
    amount: "",
    tax: "",
    paymentType: "",
    paidDate: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [employees, setemployees] = useState([]);
  const [customers, setcustomers] = useState([]);
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
        .get(HOST + GET_CUSTOMERNAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcustomers(res.data.res);
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
        HOST + ADD_PROJECT_INVOICE,
        {
          projectId: form.projectId,
          employeeId: form.employeeId,
          customerId: form.customerId,
          orderDate: form.orderDate,
          orderItems: form.orderItems,
          amount: form.amount,
          tax: form.tax,
          paymentType: form.paymentType,
          paidDate: form.paidDate,
          notes: form.notes,
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
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="employeeId">
                  <option value="">Select Employee</option>
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
                <Form.Select onChange={handleChange} name="customerId">
                  <option value="">Select Customer</option>
                  {customers.length > 0
                    ? customers.map((e) => (
                        <option value={e.ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Order Date</Form.Label>
                <Form.Control
                  name="orderDate"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            {/* <Row className="mb-4">
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
            </Row> */}
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Order Items</Form.Label>
                <Form.Control
                  name="orderItems"
                  type="text"
                  as='textarea'
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            
            
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Taxes</Form.Label>
                <Form.Control
                  name="tax"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Payment Type</Form.Label>
                <Form.Control
                  name="paymentType"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Paid Date</Form.Label>
                <Form.Control
                  name="paidDate"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  name="notes"
                  as='textarea'
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
              <Form.Label>Attachment</Form.Label>
                <Form.Control
                  name="uploadPO"
                  type='file'
                  onChange={handleChange}
                  required
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

export default OrderForm;
