import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_CITIES,
  GET_DEPARTMENTS,
  GET_EMPLOYEENAMES,
  GET_RFP_NAMES,
  GET_COMPANY_NAMES,
  ADD_PROPOSAL,
  GET_RFP_ID,
  GET_PROJECT_CATEGORIES
} from "../Constants/Constants";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

function ProposalForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({
    'dept': "",
    'projectCat': "",
    'status': "",
    'managerName': "",
    'projectName': "",
    'qDeadline': "",
    'cDeadline': "",
    'resultDate': "",
    'city': "",
    'team': "",
    'dPrice': "",
    'provisionalItems': "",
    'adminPrice': "",
    'consultantPrice': "",
    'totalBid': "",
    'planTakers': "",
    'bidders': "",
    'bidderPrice': "",
    'winningPrice': "",
    'winningBidder': "",
  });
  const [radio, setradio] = useState(false);
  const handleRadio = (e) => {
    if (e.target.value === "yes") {
      setradio(false);
    } else if (e.target.value === "no") {
      setradio(true);
    }
  };
  const [companies, setcompanies] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [rfps, setrfps] = useState([]);
  const [projectDepts, setprojectDepts] = useState([])
  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_CITIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcities(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(HOST + GET_DEPARTMENTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setdepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

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
        .get(HOST + GET_RFP_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setrfps(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(HOST + GET_COMPANY_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcompanies(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_PROJECT_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojectDepts(res.data.res);
          console.log(res.data.res)
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
        HOST + ADD_PROPOSAL,
        {
          'departmentId': radio ? deptid : form.dept,
          'projectCatId': radio ? catId : form.projectCat,
          'status': form.status,
          'projectManagerId': radio ? managerId : form.managerName,
          'projectName': radio ? pName : form.projectName,
          'questionDeadline': form.qDeadline,
          'closingDeadline': form.cDeadline,
          'resultDate': form.resultDate,
          'team': DisplayValue ? DisplayValue.toString() : "",
          'designPrice': form.dPrice,
          'provisionalItems': form.provisionalItems,
          'contractAdminPrice': form.adminPrice,
          'subConsultantPrice': form.consultantPrice,
          'totalBid': form.totalBid,
          'planTakers': DisplayValue1 ? DisplayValue1.toString() : "",
          'bidders': DisplayValue1 ? DisplayValue1.toString() : "",
          'bidderPrice': form.bidderPrice,
          'winningPrice': form.winningPrice,
          'winningBidderId': form.winningBidder,
          'cityId': radio ? cityid : form.city,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        if (res.data.success) {
          handleShow();
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rfpData, setrfpData] = useState([]);
  const [pName, setpName] = useState("");
  const [dept, setdept] = useState("");
  const [deptid, setdeptid] = useState("");
  const [catId, setcatId] = useState("");
  const [catid, setcatid] = useState("");
  const [cityid, setcityid] = useState("");
  const [city, setcity] = useState("");
  const [managerId, setmanagerId] = useState("");
  const [manager, setmanager] = useState("");
  const handleChange1 = async (e) => {
    await axios
      .get(HOST + GET_RFP_ID, {
        headers: {
          'auth': "Rose " + localStorage.getItem("auth"),
          'id': e.target.value,
        },
      })
      .then(async (res) => {
        setrfpData(res.data.res);
        setpName(res.data.res[0].Project_Name);
        setdept(res.data.res[0].Department);
        setcatid(res.data.res[0].Project_Category);
        setcatId(res.data.res[0].Project_Cat_ID);
        setdeptid(res.data.res[0].Department_ID);
        setcity(res.data.res[0].City);
        setcityid(res.data.res[0].City_ID);
        setmanager(res.data.res[0].Manager_Name);
        setmanagerId(res.data.res[0].Project_Manager_ID);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let attendees = [];
  employees.map((e) => {
    attendees.push({
      label: e.Full_Name,
      value: e.Full_Name,
    });
  });
  let [DisplayValue, getValue] = useState();
  let doChange = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  let company = [];
  companies.map((e) => {
    company.push({
      label: e.Name,
      value: e.Name,
    });
  });
  let [DisplayValue1, getValue1] = useState();
  let doChange1 = (e) => {
    getValue1(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  return (
    <div>
      <Form className="form-main">
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select onChange={handleRadio}>
              <option value="yes">Create New Proposal</option>
              <option value="no">Import From RFPs</option>
            </Form.Select>
          </Form.Group>
        </Row>
        {!radio ? (
          <div>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="dept">
                  <option value="">Select Department</option>
                  {depts.length > 0
                    ? depts.map((e) => (
                        <option value={e.Department_ID}>{e.Department}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
        <Form.Select onChange={handleChange} name='projectCat'>
                  <option value="">Select Project Category</option>
                  {projectDepts.length>0?projectDepts.map((e)=>(
                    <option value={e.Project_Cat_ID}>{e.Project_Category}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select name="status" onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option value="Lost">Lost</option>
                  <option value="Won">Won</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Select
                  name="managerName"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project Manager</option>
                  {employees.length !== 0 ? (
                    employees.map((option) => (
                      <option value={option.Employee_ID}>
                        {option.Full_Name}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
              <Form.Label>Project Name</Form.Label>
                <Form.Control
                  name="projectName"
                  type="text"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Question Deadline</Form.Label>
                <Form.Control
                  name="qDeadline"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Closing Deadline</Form.Label>
                <Form.Control
                  name="cDeadline"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Result Date</Form.Label>
                <Form.Control
                  name="resultDate"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Select onChange={handleChange} name="city">
                  <option value="">Select City</option>
                  {cities.length > 0
                    ? cities.map((e) => (
                        <option value={e.City_ID}>{e.City}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Select
                  isMulti
                  onChange={doChange}
                  options={attendees}
                  name="team"
                  placeholder="Team Members"
                >
                  Team Members
                </Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              
              <Form.Group as={Col}>
                <Form.Label>Design Price</Form.Label>
                <Form.Control
                  name="dPrice"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Provisional Items</Form.Label>
                <Form.Control
                  name="provisionalItems"
                  type="text"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Contract Admin Price</Form.Label>
                <Form.Control
                  name="adminPrice"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Consultant Price</Form.Label>
                <Form.Control
                  name="consultantPrice"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Total Bid</Form.Label>
                <Form.Control
                  name="totalBid"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Select
                  isMulti
                  onChange={doChange1}
                  options={company}
                  name="planTakers"
                  placeholder="Plan Takers"
                ></Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Select
                  isMulti
                  onChange={doChange1}
                  options={company}
                  name="bidders"
                  placeholder="Bidders"
                ></Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="winningBidder">
                  <option value="">Select Winning Bidder</option>
                  {companies.map((option) => (
                    <option value={option.ID}>{option.Name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              
            </Row>
            <Row className="mb-4">
              
              <Form.Group as={Col}>
                <Form.Label>Winning Price</Form.Label>
                <Form.Control
                  name="winningPrice"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Bidder Price</Form.Label>
                <Form.Control
                  name="bidderPrice"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
          </div>
        ) : (
          <div>
            <Form.Select
              style={{ marginBottom: "4vh" }}
              onChange={handleChange1}
            >
              <option value="">Select Project</option>
              {rfps.length !== 0 ? (
                rfps.map((options) => (
                  <option value={options.RFP_ID}>{options.Project_Name}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
            {rfpData.length > 0 ? (
              <div>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select
                      defaultValue={dept}
                      onChange={handleChange}
                      name="dept"
                    >
                      {depts.length > 0
                        ? depts.map((e) => (
                            <option value={e.Department_ID}>
                              {e.Department}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select
                      defaultValue={catid}
                      onChange={handleChange}
                      name="projectCat"
                    >
                      {projectDepts.length > 0
                        ? projectDepts.map((e) => (
                            <option value={e.Project_Cat_ID}>
                              {e.Project_Category}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select name="status" onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="Go">Go</option>
                      <option value="NoGo">NoGo</option>
                      <option value="Review">Review</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select
                      defaultValue={manager}
                      name="managerName"
                      onChange={handleChange}
                      required
                    >
                      {employees.length !== 0 ? (
                        employees.map((option) => (
                          <option value={option.Employee_ID}>
                            {option.Full_Name}
                          </option>
                        ))
                      ) : (
                        <option value="">None</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      value={pName}
                      name="projectName"
                      type="text"
                      placeholder="Project Name"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Label>Question Deadline</Form.Label>
                    <Form.Control
                      name="qDeadline"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Closing Deadline</Form.Label>
                    <Form.Control
                      name="cDeadline"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Result Date</Form.Label>
                    <Form.Control
                      name="resultDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Select
                      defaultValue={city}
                      onChange={handleChange}
                      name="city"
                    >
                      {cities.length > 0
                        ? cities.map((e) => (
                            <option value={e.City_ID}>{e.City}</option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Select
                      isMulti
                      onChange={doChange}
                      options={attendees}
                      name="team"
                      placeholder="Team Members"
                    >
                      Team Members
                    </Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="dPrice"
                      type="number"
                      placeholder="Design Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="provisionalItems"
                      type="text"
                      placeholder="Provisional Items"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Control
                      name="adminPrice"
                      type="number"
                      placeholder="Contract Admin Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="consultantPrice"
                      type="number"
                      placeholder="Consultant Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="totalBid"
                      type="number"
                      placeholder="Total Bid"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Select
                      isMulti
                      onChange={doChange1}
                      options={company}
                      name="planTakers"
                      placeholder="Plan Takers"
                    ></Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Select
                      isMulti
                      onChange={doChange1}
                      options={company}
                      name="bidders"
                      placeholder="Bidders"
                    ></Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="bidderPrice"
                      type="number"
                      placeholder="Bidder Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  
                  <Form.Group as={Col}>
                    <Form.Control
                      name="winningPrice"
                      type="number"
                      placeholder="Winning Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select onChange={handleChange} name="winningBidder">
                      <option value="">Select Winning Bidder</option>
                      {companies.map((option) => (
                        <option value={option.ID}>{option.Name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
          style={{}}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Proposal Added Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default ProposalForm;
