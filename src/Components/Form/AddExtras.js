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
  GET_MANAGERS,
  GET_DESIGN_STAGES,
  ADD_PROJECT_SUBMISSION,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from "../../Context/AuthContext";

function AddExtras(props) {
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
    extraDate: "",
    extraAmount: "",
    followUp: "",
    claimReason: "",
    extraApproved: "",
    attachment: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [employees, setemployees] = useState([]);
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
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_PROJECT_SUBMISSION,
        {
          projectId: "",
          designStageId: "",
          extraDate: currentDate,
          extraAmount: "",
          followUp: "",
          claimReason: "",
          extraApproved: "",
          attachment: "",
          notes: "",
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
                  <option value="">Extra Approved By</option>
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
                <Form.Label>Follow Up Date</Form.Label>
                <Form.Control
                  name="followUp"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Claim Reason</Form.Label>
                <Form.Control
                  name="claimReason"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  name="notes"
                  as="textarea"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  name="attachment"
                  type="file"
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

export default AddExtras;
