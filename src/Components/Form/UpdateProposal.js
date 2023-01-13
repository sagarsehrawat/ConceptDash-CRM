import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HOST,
  GET_CITIES,
  GET_DEPARTMENTS,
  GET_EMPLOYEENAMES,
  GET_COMPANY_NAMES,
  UPDATE_PROPOSAL,
  GET_PROJECT_CATEGORIES,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

function UpdateProposal(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const depart = props.row.Department;
  const pro_manager = props.row.Manager_Name;
  const citi = props.row.City;
  const proCat = props.row.Project_Category;

  const [dept, setdept] = useState(props.row.Department_ID);
  const [cat, setcat] = useState(props.row.Project_Cat_ID);
  const [status, setstatus] = useState(props.row.Status);
  const [manager, setmanager] = useState(props.row.Project_Manager_ID);
  const [pName, setpName] = useState(props.row.Project_Name);
  const [qDeadline, setqDeadline] = useState(
    props.row.Question_Deadline
      ? props.row.Question_Deadline.substring(0, 10)
      : ""
  );
  const [cDeadline, setcDeadline] = useState(
    props.row.Closing_Deadline
      ? props.row.Closing_Deadline.substring(0, 10)
      : ""
  );
  const [rDate, setrDate] = useState(
    props.row.Result_Date ? props.row.Result_Date.substring(0, 10) : ""
  );
  const [city, setcity] = useState(props.row.City_ID);
  const [dPrice, setdPrice] = useState(props.row.Design_Price);
  const [provisionalItems, setprovisionalItems] = useState(
    props.row.Provisional_Items
  );
  const [adminPrice, setadminPrice] = useState(props.row.Contract_Admin_Price);
  const [consultantPrice, setconsultantPrice] = useState(
    props.row.Sub_Consultant_Price
  );
  const [totalBid, settotalBid] = useState(props.row.Total_Bid);
  const [planTakers, setplanTakers] = useState(props.row.Plan_Takers);
  const [bidders, setbidders] = useState(props.row.Bidders);
  const [bidderPrice, setbidderPrice] = useState(props.row.Bidder_Price);
  const [winningPrice, setwinningPrice] = useState(props.row.Winning_Price);
  const [winningBidder, setwinningBidder] = useState(
    props.row.Winning_Bidder_ID
  );
  const [team, setteam] = useState(props.row.Team);
  let teamData = team ? team.split(",") : "";
  let members = [];
  teamData &&
    teamData.map((e) => {
      members.push({
        label: e,
        value: e,
      });
    });
  let planTaker = planTakers ? planTakers.split(",") : "";
  let bidder = bidders ? bidders.split(",") : "";
  let planTakersComapnies = [];
  planTaker &&
    planTaker.map((e) => {
      planTakersComapnies.push({
        label: e,
        value: e,
      });
    });
  let bidderComapnies = [];
  bidder &&
    bidder.map((e) => {
      bidderComapnies.push({
        label: e,
        value: e,
      });
    });
  const [form, setform] = useState({
    dept: dept,
    projectCat: dept,
    status: status,
    managerName: manager,
    projectName: pName,
    qDeadline: qDeadline,
    cDeadline: cDeadline,
    resultDate: rDate,
    city: city,
    team: team,
    dPrice: dPrice,
    provisionalItems: provisionalItems,
    adminPrice: adminPrice,
    consultantPrice: consultantPrice,
    totalBid: totalBid,
    planTakers: planTakers,
    bidders: bidders,
    bidderPrice: bidderPrice,
    winningPrice: winningPrice,
    winningBidder: winningBidder,
  });
  //   console.log(props.row);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dept") {
      setdept(value);
    }
    if (name === "projectCat") {
      setcat(value);
    }
    if (name === "status") {
      setstatus(value);
    }
    if (name === "managerName") {
      setmanager(value);
    }
    if (name === "projectName") {
      setpName(value);
    }
    if (name === "qDeadline") {
      setqDeadline(value);
    }      
    if (name === "cDeadline") {
      setcDeadline(value);
    }
    if (name === "resultDate") {
      setrDate(value);
    }
    if (name === "city") {
      setcity(value);
    }
    if (name === "team") {
      setteam(value);
    }
    if (name === "dPrice") {
      setdPrice(value);
    }
    if (name === "provisionalItems") {
      setprovisionalItems(value);
    }
    if (name === "adminPrice") {
      setadminPrice(value);
    }
    if (name === "consultantPrice") {
      setconsultantPrice(value);
    }
    if (name === "totalBid") {
      settotalBid(value);
    }
    if (name === "planTakers") {
      setplanTakers(value);
    }
    if (name === "bidders") {
      setbidders(value);
    }
    if (name === "bidderPrice") {
      setbidderPrice(value);
    }
    if (name === "winningPrice") {
      setwinningPrice(value);
    }
    if (name === "winningBidder") {
      setwinningBidder(value);
    }

    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [employees, setemployees] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
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
        HOST + UPDATE_PROPOSAL,
        {
          departmentId: form.dept,
          projectCatId: form.projectCat,
          status: form.status,
          projectManagerId: form.managerName,
          projectName: form.projectName,
          questionDeadline: form.qDeadline,
          closingDeadline: form.cDeadline,
          resultDate: form.resultDate,
          team: DisplayValue ? DisplayValue.toString() : team,
          designPrice: form.dPrice,
          provisionalItems: form.provisionalItems,
          contractAdminPrice: form.adminPrice,
          subConsultantPrice: form.consultantPrice,
          totalBid: form.totalBid,
          planTakers: DisplayValue1 ? DisplayValue1.toString() : planTakers,
          bidders: DisplayValue1 ? DisplayValue1.toString() : bidders,
          bidderPrice: form.bidderPrice,
          winningPrice: form.winningPrice,
          winningBidderId: form.winningBidder,
          cityId: form.city,
          id: props.row.Proposal_ID,
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
            <Form.Label>Department</Form.Label>
            <Form.Select
              defaultValue={props.row.Department}
              onChange={handleChange}
              name="dept"
            >
              <option value="">Select Department</option>
              {depts.length > 0
                ? depts.map((e) => (
                    <option
                      value={e.Department_ID}
                      selected={e.Department === depart}
                    >
                      {e.Department}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Project Category</Form.Label>
            <Form.Select
              defaultValue={props.row.Project_Category}
              onChange={handleChange}
              name="projectCat"
            >
            <option value="">Select Project Category</option>
              {projectDepts.length > 0
                ? projectDepts.map((e) => (
                    <option
                      value={e.Project_Cat_ID}
                      selected={e.Project_Category === proCat}
                    >
                      {e.Project_Category}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Select
              defaultValue={props.row.Status}
              name="status"
              onChange={handleChange}
            >
            <option value="">Select Status</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Project Manager</Form.Label>
            <Form.Select name="managerName" onChange={handleChange} required>
              <option value="">Select Project Manager</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option
                    value={option.Employee_ID}
                    selected={option.Full_Name === pro_manager}
                  >
                    {option.Full_Name}
                  </option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              value={pName}
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
              value={qDeadline}
              name="qDeadline"
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Closing Deadline</Form.Label>
            <Form.Control
              value={cDeadline}
              name="cDeadline"
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Result Date</Form.Label>
            <Form.Control
              value={rDate}
              name="resultDate"
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Select
              defaultValue={city}
              onChange={handleChange}
              name="city"
            >
            <option value="">Select City</option>
              {cities.length > 0
                ? cities.map((e) => (
                    <option value={e.City_ID} selected={e.City === citi}>
                      {e.City}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Team Members</Form.Label>
            <Select
              isMulti
              defaultValue={members}
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
              value={dPrice}
              name="dPrice"
              type="number"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Provisional Items</Form.Label>
            <Form.Control
              value={provisionalItems}
              name="provisionalItems"
              type="text"
              placeholder="Provisional Items"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Admin Price</Form.Label>
            <Form.Control
              value={adminPrice}
              name="adminPrice"
              type="number"
              placeholder="Contract Admin Price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Consultant Price</Form.Label>
            <Form.Control
              value={consultantPrice}
              name="consultantPrice"
              type="number"
              placeholder="Consultant Price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Total Bid</Form.Label>
            <Form.Control
              value={totalBid}
              name="totalBid"
              type="number"
              placeholder="Total Bid"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Plan Takers</Form.Label>
            <Select
              isMulti
              defaultValue={planTakersComapnies}
              onChange={doChange1}
              options={company}
              name="planTakers"
              placeholder="Plan Takers"
            ></Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Bidders</Form.Label>
            <Select
              isMulti
              defaultValue={bidderComapnies}
              onChange={doChange1}
              options={company}
              name="bidders"
              placeholder="Bidders"
            ></Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Bidder Price</Form.Label>
            <Form.Control
              value={bidderPrice}
              name="bidderPrice"
              type="number"
              placeholder="Bidder Price"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Winning Price</Form.Label>
            <Form.Control
              value={winningPrice}
              name="winningPrice"
              type="number"
              placeholder="Winning Price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Winning Bider</Form.Label>
            <Form.Select
              value={winningBidder}
              onChange={handleChange}
              name="winningBidder"
            >
            <option value="">Select Winning Bidder</option>
              {companies.map((option) => (
                <option value={option.ID}>{option.Name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
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
        <Modal.Body>Proposal Updated Successfully</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateProposal;
