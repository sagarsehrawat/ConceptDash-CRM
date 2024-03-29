import React, { useEffect, useState } from "react";
import "../../../Main/Form/Form.css";
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
  PRIMARY_COLOR,
  GET_PROJECT_CATEGORIES,
  GET_MANAGERS,
} from "../../../Main/Constants/Constants";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import LoadingSpinner from "../../../Main/Loader/Loader";
import TFButton from "../../../components/ui/TFButton/TFButton";
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
  },
  footer: {
    height: "20px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#70757A",
    marginTop:'24px',
    marginLeft: '-7px'
  }
}
function UpdateProposal(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
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
  const [result, setresult] = useState(props.row.Result ?? "");
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
  const [city, setcity] = useState(props.row.City_ID);
  const [dPrice, setdPrice] = useState(props.row.Design_Price);
  const [provisionalItems, setprovisionalItems] = useState(
    props.row.Provisional_Items
  );
  const [adminPrice, setadminPrice] = useState(props.row.Contract_Admin_Price);
  const [consultantPrice, setconsultantPrice] = useState(
    props.row.Sub_Consultant_Price
  );
  const [winningPrice, setwinningPrice] = useState(props.row.Winning_Price);
  const [winningBidder, setwinningBidder] = useState(
    props.row.Winning_Bidder
  );
  const [team, setteam] = useState(props.row.Team);
  const [status, setstatus] = useState(props.row.Status);
  const [debriefing, setdebriefing] = useState(props.row.Debriefing);
  let teamData = team ? team.split(",") : "";
  let members = [];
  teamData &&
    teamData.map((e) => {
      members.push({
        label: e,
        value: e,
      });
    });
  
  const [form, setform] = useState({
    dept: dept ?? "",
    projectCat: cat ?? "",
    result: result ?? "",
    managerName: manager ?? "",
    projectName: pName ?? "",
    qDeadline: qDeadline ?? "",
    cDeadline: cDeadline ?? "",
    city: city ?? "",
    team: team ?? "",
    dPrice: dPrice ?? "",
    provisionalItems: provisionalItems ?? "",
    adminPrice: adminPrice ?? "",
    consultantPrice: consultantPrice ?? "",
    winningPrice: winningPrice ?? "",
    winningBidder: winningBidder ?? "",
    status: status ?? "",
    debriefing: debriefing ?? "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dept") {
      setdept(value);
      getProjectCategories(value)
    }
    if (name === "projectCat") {
      setcat(value);
    }
    if (name === "result") {
      setresult(value);
    }
    if (name === "status") {
      setstatus(value);
    }
    if (name === "debriefing") {
      setdebriefing(value);
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
  const [teamMembers, setteamMembers] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const getProjectCategories = async(e)=>{
    await axios
        .get(HOST + GET_PROJECT_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), id: e },
        })
        .then((res) => {
          setprojectDepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  useEffect(() => {
    setisLoading(true)
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
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setteamMembers(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

     
      setisLoading(false)
    };
    call();
  }, []);
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_PROPOSAL,
        {
          departmentId: form.dept,
          projectCatId: form.projectCat,
          result: form.result,
          status: form.status,
          debriefing: form.debriefing,
          projectManagerId: form.managerName,
          projectName: form.projectName,
          questionDeadline: form.qDeadline,
          closingDeadline: form.cDeadline,
          team: DisplayValue ? DisplayValue.toString() : team,
          designPrice: form.dPrice,
          provisionalItems: form.provisionalItems,
          contractAdminPrice: form.adminPrice,
          subConsultantPrice: form.consultantPrice,
          winningPrice: form.winningPrice,
          winningBidderId: form.winningBidder,
          cityId: form.city,
          id: props.row.Proposal_ID,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
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
        setisLoading(false);
        setRed(true);
        console.log(err);
      });
  };
  const [isLoading, setisLoading] = useState(false);

  let attendees = [];
  teamMembers.map((e) => {
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
  const totalBidCalculator = (a, b, c, d)=>{
    return (a+b+c+d);
}
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
          <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
            <Row>
            <Form.Group as={Col}>
            <Form.Label style={styles.nameHeading}>Project Name</Form.Label>
                <Form.Control
              style={styles.nameInput}
                  value={pName}
                  name="projectName"
                  type="text"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridCity">
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>City</Form.Label>
                <Form.Select
                style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}}
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
            <Row>
              <Form.Group style={{width:'380px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="dept"
                >
                  <option>Select Department</option>
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
              <Form.Group style={{width:'380px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="projectCat"
                >
                  <option>Select Project Category</option>
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

            <Row>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Result</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                  defaultValue={props.row.Result}
                  name="result"
                  onChange={handleChange}
                >
                  <option value="">Select Result</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Debriefing</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="debriefing"
                  defaultValue={props.row.Debriefing}
                >
                  <option>Select Debriefing</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                  
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Manager</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                  name="managerName"
                  onChange={handleChange}
                >
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
             
            </Row>
            <Row>
            <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Status</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="status"
                  defaultValue={props.row.Status}
                >
                  <option>Select Status</option>
                  <option value='Submitted'>Submitted</option>
                  <option value='Not Submitted'>Not Submitted</option>
                  
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Question Deadline</Form.Label>
                <Form.Control
                        style={{...styles.nameInput, width:'233px'}}
                  value={qDeadline}
                  name="qDeadline"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Closing Deadline</Form.Label>
                <Form.Control
                        style={{...styles.nameInput, width:'234px'}}
                  value={cDeadline}
                  name="cDeadline"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
            </Row>

            
            <Row>
              <Form.Group style={{width:'755px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Team Members</Form.Label>
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
            <p style={styles.footer}>Bidding Details</p>
                <Row>
                  <Form.Group style={{width:'380px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Design Price</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'360px'}}
                      value={dPrice}
                      name="dPrice"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group style={{width:'380px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Provisional Items</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'360px'}}
                      value={provisionalItems}
                      name="provisionalItems"
                      type="text"
                      placeholder="Provisional Items"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group style={{width:'380px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Admin Price</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'360px'}}
                      value={adminPrice}
                      name="adminPrice"
                      type="number"
                      placeholder="Contract Admin Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group style={{width:'380px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Consultant Price</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'360px'}}
                      value={consultantPrice}
                      name="consultantPrice"
                      type="number"
                      placeholder="Consultant Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Total Bid</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      value={totalBid}
                      name="totalBid"
                      type="number"
                      placeholder="Total Bid"
                      onChange={handleChange}
                    />
                  </Form.Group> */}
                </Row>
                <Row>
                <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px', color: '#70757A'}}>Total Bid <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      type="number"
                      disabled
                      value={totalBidCalculator(Number(dPrice), Number(provisionalItems), Number(adminPrice), Number(consultantPrice))}
                    />
                  </Form.Group>
                </Row>
                {/* <Row>
                  <Form.Group style={{width:'250px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Plan Takers</Form.Label>
                    <Select
                      isMulti
                      defaultValue={planTakersComapnies}
                      onChange={doChange1}
                      options={company}
                      name="planTakers"
                      placeholder="Plan Takers"
                    ></Select>
                  </Form.Group>
                  <Form.Group style={{width:'250px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Bidders</Form.Label>
                    <Select
                      isMulti
                      defaultValue={bidderComapnies}
                      onChange={doChange1}
                      options={company}
                      name="bidders"
                      placeholder="Bidders"
                    ></Select>
                  </Form.Group>
                  <Form.Group style={{width:'250px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Bidder Price</Form.Label>
                    <Form.Control
                      value={bidderPrice}
                      name="bidderPrice"
                      type="number"
                      placeholder="Bidder Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row> */}
                <Row>
                  
                  <Form.Group style={{width:'380px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Winning Bidder</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'360px'}}
                      value={winningBidder}
                      name="winningBidder"
                      placeholder="Winning Bidder"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group style={{width:'380px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Bidder Price</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'360px'}}
                      value={winningPrice}
                      name="winningPrice"
                      type="number"
                      placeholder="Winning Price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
            <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            {/* <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Update Proposal
            </Button> */}
            
            <TFButton label="Cancel" variant="secondary" handleClick={closeModal} style={{marginRight: '20px'}} size="small"/>
              <TFButton label="Update Proposal" type="submit" size="small"/>
            </div>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Form Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>Proposal Updated Successfully</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default UpdateProposal;
