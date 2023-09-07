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
  GET_CUSTOMERNAMES,
  ADD_PROJECT_INVOICE,
  GET_DESIGN_STAGES,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from "../../Context/AuthContext";

function AddInvoice(props) { 
  const { privileges, setPrivileges } = useContext(AuthContext);
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    projectId: "",
    designStageId: "",
    customerId: "",
    invoiceDate: "",
    dueDate: "",
    tax: "",
    courier: "",
    amountDue: "",
    invoiceSoFar: "",
    balance: "",
    extraClaim: "",
    extraApproved: "",
    status: "",
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
  const [dStage, setdStage] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_DESIGN_STAGES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setdStage(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_MANAGERS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees(res.data.res);
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
          designStageId: form.designStageId,
          customerId: form.customerId,
          invoiceDate: form.invoiceDate,
          dueDate: form.dueDate,
          tax: form.tax,
          courier: form.courier,
          amountDue: form.amountDue,
          invoiceSoFar: form.invoiceSoFar,
          balance: form.balance,
          extraClaim: form.extraClaim,
          extraApproved: form.extraApproved,
          status: form.status,
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
                <Form.Select onChange={handleChange} name="designStageId">
                  <option value="">Select Design Stage</option>
                  {dStage.length > 0
                    ? dStage.map((e) => (
                        <option value={e.Design_Stage_ID}>
                          {e.Design_Stage}
                        </option>
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
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  name="dueDate"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Invoice Date</Form.Label>
                <Form.Control
                  name="invoiceDate"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select name="status" onChange={handleChange}>
                  <option value="">Select Status</option>
                  {/* <option value="Credit Card">Credit Card</option>
                  <option value="Via Cash">Via Cash</option>
                  <option value="Via Transfer">Via Transfer</option>
                  <option value="Bank Transfer">Bank Transfer</option> */}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Tax</Form.Label>
                <Form.Control name="tax" onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Courier</Form.Label>
                <Form.Control name="courier" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Amount Due</Form.Label>
                <Form.Control name="amountDue" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Invoice So Far</Form.Label>
                <Form.Control name="invoiceSoFar" onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Balance Remaining</Form.Label>
                <Form.Control name="balance" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Extra Claims</Form.Label>
                <Form.Control name="extraClaim" onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="approvedBy" required>
                  <option value="">Extra Approved</option>
                  {employees.length > 0
                    ? employees.map((e) => (
                        <option value={e.Employee_ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
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

export default AddInvoice;
