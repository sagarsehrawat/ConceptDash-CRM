import React, { useEffect, useState, useContext } from "react";
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
  GET_PROJECT_CATEGORIES,
  PRIMARY_COLOR,
  GET_MANAGERS
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";
import AddCategory from "./AddCategory";
import AuthContext from '../../Context/AuthContext'
import plus from '../../Images/plus.svg'
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

function ProposalForm(props) {
  const { privileges, setPrivileges } = useContext(AuthContext)
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;

  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [teamMembers, setteamMembers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({
    dept: "",
    projectCat: "",
    status: "",
    result: "",
    managerName: "",
    projectName: "",
    qDeadline: "",
    cDeadline: "",
    city: "",
    team: "",
    dPrice: "",
    provisionalItems: "",
    adminPrice: "",
    consultantPrice: "",
    winningPrice: "",
    winningBidder: "",
    debriefing: "",
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
  const [design, setdesign] = useState(0);
  const [prov, setprov] = useState(0);
  const [cons, setcons] = useState(0);
  const [admin, setadmin] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='dept') {
      getProjectCategories(value)
    }
    if(name==='dPrice') {
      setdesign(value)
    }
    if(name==='provisionalItems') {
      setprov(value)
    }
    if(name==='adminPrice') {
      setadmin(value)
    }
    if(name==='consultantPrice') {
      setcons(value)
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [catShow, setcatShow] = useState(false);
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [rfps, setrfps] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const getProjectCategories = async(e)=>{
    setcatShow(false);
    await axios
        .get(HOST + GET_PROJECT_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), id: e },
        })
        .then((res) => {
          setprojectDepts(res.data.res);
          setcatShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  useEffect(() => {
    setisLoading(true);
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
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setteamMembers(res.data.res);
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
        HOST + ADD_PROPOSAL,
        {
          departmentId: radio ? deptid : form.dept,
          projectCatId: radio ? catId : form.projectCat,
          status: form.status,
          result: form.result,
          debriefing: form.debriefing,
          projectManagerId: radio ? managerId : form.managerName,
          projectName: radio ? pName : form.projectName,
          questionDeadline: form.qDeadline,
          closingDeadline: form.cDeadline,
          team: DisplayValue ? DisplayValue.toString() : "",
          designPrice: form.dPrice,
          provisionalItems: form.provisionalItems,
          contractAdminPrice: form.adminPrice,
          subConsultantPrice: form.consultantPrice,
          winningPrice: form.winningPrice,
          winningBidderId: form.winningBidder,
          cityId: radio ? cityid: form.city,
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
        console.log(err);
        setisLoading(false);
        setRed(true);
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
          auth: "Rose " + localStorage.getItem("auth"),
          id: e.target.value,
        },
      })
      .then(async (res) => {
        console.log(res.data.res)
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
      id: e.ID
    });
  });
  let [DisplayValue1, getValue1] = useState();
  let bidders = [];
  let doChange1 = (e) => {
    getValue1(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  DisplayValue1 && DisplayValue1.map((option) => {
    bidders.push({
      label: option,
      value: option,
    });
  });
  let [DisplayValue2, getValue2] = useState();
  let doChange2 = (e) => {
    getValue2(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const [showCityForm, setShowCityForm] = useState(false);
  const handleCloseCityForm = () => setShowCityForm(false);
  const handleShowCityForm = () => setShowCityForm(true);

  const [showDeptForm, setShowDeptForm] = useState(false);
  const handleCloseDeptForm = () => setShowDeptForm(false);
  const handleShowDeptForm = () => setShowDeptForm(true);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const handleCloseCategoryForm = () => setShowCategoryForm(false);
  const handleShowCategoryForm = () => setShowCategoryForm(true);

  const [isLoading, setisLoading] = useState(false);
  const totalBidCalculator = (a, b, c, d)=>{
    return (a+b+c+d);
}
  return (
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <div style={{marginTop:'40%'}}><LoadingSpinner /></div>
      ) : (
        <>
          <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
            {/* <Row>
              <Form.Group as={Col}>
                <Form.Label style={styles.nameHeading}>Choose Label</Form.Label>
                <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleRadio}>
                  <option value="yes">Create New Proposal</option>
                  <option value="no">Import From RFPs</option>
                </Form.Select>
              </Form.Group>
            </Row> */}
            <Row>
            <Form.Label  style={styles.nameHeading}>Choose Action</Form.Label>
          <Form.Group onChange={handleRadio}>
            <Form.Check
            style={{marginRight:'40px'}}
              value='yes'
              inline
              type="radio"
              defaultChecked
              name="group1"
              id="1"
              label="Create new proposal"
            />
            <Form.Check
              value='no'
              inline
              type="radio"
              name="group1"
              id="2"
              label="Import proposal from RFP"
            />
          </Form.Group>
        </Row>
            {!radio ? (
              <div>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Proposal Name<span style={{color:'red'}}>*</span></Form.Label>
                    <Form.Control
                      style={styles.nameInput}
                      name="projectName"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label style={{...styles.nameHeading,width:'740px', marginTop:'24px'}}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>Choose City</div>
                        {privileges.includes('Add City')? <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowCityForm}><img alt="Add New City" src={plus} /></div> :<></>}
                      </div>
                    </Form.Label>
                    <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="city" required>
                      <option value="">Select City</option>
                      {cities.length > 0
                        ? cities.map((e) => (
                          <option value={e.City_ID}>{e.City}</option>
                        ))
                        : ""}
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
                      name="qDeadline"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                  <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Closing Deadline</Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'234px'}}
                      name="cDeadline"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                </Row>

                <Row>
                <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
                    <Form.Select style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="dept" required>
                      <option value="">Select Department</option>
                      {depts.length > 0
                        ? depts.map((e) => (
                          <option value={e.Department_ID}>
                            {e.Department}
                          </option>
                        ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Manager</Form.Label>
                    <Form.Select
                    style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
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
                  {catShow?<Form.Group style={{width:'253px'}}>
                  <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
                    <Form.Select
                    style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
                      onChange={handleChange}
                      name="projectCat"
                      required
                    >
                      <option value="">Select Project Category</option>
                      {projectDepts.length > 0
                        ? projectDepts.map((e) => (
                          <option value={e.Project_Cat_ID}>
                            {e.Project_Category}
                          </option>
                        ))
                        : ""}
                    </Form.Select>
                  </Form.Group>:<></>}
                </Row>
                {/* <Row className="mb-4">
                  
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowDeptForm}
                      disabled={!privileges.includes("Add Department")}
                    >
                      Add Department
                    </Button>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowCategoryForm}
                      disabled={!privileges.includes("Add Project Category")}
                    >
                      Add Project Category
                    </Button>
                  </Form.Group>
                </Row> */}

                
                

                <Row>
                <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Result</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="result"
                >
                  <option>Choose Result</option>
                  <option value='Won'>Won</option>
                  <option value='Lost'>Lost</option>
                  <option value='Pending'>Pending</option>
                  
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Debriefing</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'253px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="debriefing"
                >
                  <option>Select Debriefing</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                  
                </Form.Select>
              </Form.Group>
            </Row>
                <Row>
                  <Form.Group style={{width:'755px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Team Members</Form.Label>
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
                <p style={styles.footer}>Bidding Details</p>
                <Row>
                  <Form.Group style={{width:'253px'}}>
                  <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Design Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="dPrice"
                      type="number"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group style={{width:'253px'}}>
                  <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Provisional Item Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="provisionalItems"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                 <Row>
                  <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Contract Admin Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="adminPrice"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Sub Consultant Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="consultantPrice"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row>
                <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px', color: '#70757A'}}>Total Bid <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      type="number"
                      disabled
                      value={totalBidCalculator(Number(design), Number(prov), Number(admin), Number(cons))}
                    />
                  </Form.Group>
                </Row>
                {/*<Row className="mb-4">
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
                      onChange={doChange2}
                      options={bidders}
                      name="bidders"
                      placeholder="Bidders"
                    ></Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select onChange={handleChange} name="winningBidder">
                      <option value="">Select Winning Bidder</option>
                      {companies ? (
                        companies.map((option) => (
                          <option value={option.ID}>{option.Name}</option>
                        ))
                      ) : (
                        <option>Firstly select Bidders</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Row>*/}
                <Row>
                  <Form.Group as={Col}>
                  <Form.Label style={{...styles.nameHeading,width:'740px', marginTop:'24px'}}>Winning Bidder</Form.Label>
                    <Form.Control
                      name="winningBidder"
                      style={styles.nameInput}
                      type="text"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  </Row>
                  <Row>
                  <Form.Group as={Col}>
                    <Form.Label style={{...styles.nameHeading,width:'740px', marginTop:'24px'}}>Bidder Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                      name="winningPrice"
                      style={styles.nameInput}
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row> 
              </div>
            ) : (
              <div>
                <Row>
                  <Form.Group as={Col}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Select Project</Form.Label>
                <Form.Select
                  style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange1}
                >
                  <option value="">Select Project</option>
                  {rfps ? (
                    rfps.map((options) => (
                      <option value={options.RFP_ID}>
                        {options.Project_Name}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
                </Form.Select></Form.Group>
                </Row>
                
                {rfpData.length>0 ? (
                  <div>
                    <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Name</Form.Label>
                        <Form.Control
                style={styles.nameInput}
                          value={pName}
                          name="projectName"
                          type="text"
                          placeholder="Project Name"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>City</Form.Label>
                        <Form.Select
                        style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}}
                          // defaultValue={city}
                          onChange={handleChange}
                          name="city"
                        >
                          <option value="">Select City</option>
                          {cities.length > 0
                            ? cities.map((e) => (
                              <option
                                value={e.City_ID}
                                // selected={e.City_ID === cityid}
                              >
                                {e.City}
                              </option>
                            ))
                            : ""}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group style={{width:'253px'}}>
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
                        <Form.Select
                        style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                          defaultValue={dept}
                          onChange={handleChange}
                          name="dept"
                        >
                          <option>Select Department</option>
                          {depts.length > 0
                            ? depts.map((e) => (
                              <option
                                value={e.Department_ID}
                                selected={e.Department_ID === deptid}
                              >
                                {e.Department}
                              </option>
                            ))
                            : ""}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group style={{width:'253px'}}>
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
                        <Form.Select
                        style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                          defaultValue={catid}
                          onChange={handleChange}
                          name="projectCat"
                        >
                          <option>Select Project Category</option>
                          {projectDepts.length > 0
                            ? projectDepts.map((e) => (
                              <option
                                value={e.Project_Cat_ID}
                                selected={e.Project_Cat_ID === catId}
                              >
                                {e.Project_Category}
                              </option>
                            ))
                            : ""}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group style={{width:'253px'}}>
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Manager</Form.Label>
                        <Form.Select
                        style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
                          name="managerName"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Employee</option>
                          {employees.length !== 0 ? (
                            employees.map((option) => (
                              <option
                                value={option.Employee_ID}
                                selected={option.Employee_ID === managerId}
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
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Question Deadline</Form.Label>
                        <Form.Control
                        style={{...styles.nameInput, width:'233px'}}
                          name="qDeadline"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group>
                      <Form.Group style={{width:'253px'}}>
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Closing Deadline</Form.Label>
                        <Form.Control
                        style={{...styles.nameInput, width:'234px'}}
                          name="cDeadline"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group>
                      {/* <Form.Group style={{width:'253px'}}>
                        <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Result Date</Form.Label>
                        <Form.Control
                        
                        style={{...styles.nameInput, width:'233px'}}
                          name="resultDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group> */}
                    
                  <Form.Group style={{width:'755px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Team Members</Form.Label>
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
                <Row>
              <Form.Group style={{width:'380px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Status</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="status"
                >
                  <option>Select Status</option>
                  <option value='Submitted'>Submitted</option>
                  <option value='Not Submitted'>Not Submitted</option>
                  
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'380px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Debriefing</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
                  onChange={handleChange}
                  name="debriefing"
                >
                  <option>Select Debriefing</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                  
                </Form.Select>
              </Form.Group>
            </Row>
            <p style={styles.footer}>Bidding Details</p>
                <Row>
                  <Form.Group style={{width:'253px'}}>
                  <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Design Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="dPrice"
                      type="number"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group style={{width:'253px'}}>
                  <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Provisional Item Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="provisionalItems"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                 <Row>
                  <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Contract Admin Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="adminPrice"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px'}}>Sub Consultant Price <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      name="consultantPrice"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row>
                <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'8px', color: '#70757A'}}>Total Bid <span><b>($)</b></span></Form.Label>
                    <Form.Control
                    style={{...styles.nameInput, width:'233px'}}
                      type="number"
                      disabled
                      value={totalBidCalculator(Number(design), Number(prov), Number(admin), Number(cons))}
                    />
                  </Form.Group>
                </Row>
                    {/* <Row className="mb-4">
                      <Form.Group as={Col}>
                        <Form.Label>Team</Form.Label>
                        <Select
                          isMulti
                          onChange={doChange}
                          options={attendees}
                          name="team"
                          placeholder="Team Members"
                        >
                          Team Members
                        </Select>
                      </Form.Group> */}
                      {/* <Form.Group as={Col}>
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
                        <Form.Label>Plan Takers</Form.Label>
                        <Select
                          isMulti
                          onChange={doChange1}
                          options={company}
                          name="planTakers"
                        ></Select>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Bidders</Form.Label>
                        <Select
                          isMulti
                          onChange={doChange2}
                          options={DisplayValue1 ? DisplayValue1 : ""}
                          name="bidders"
                        ></Select>
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
                        <Form.Label>Winning Bidder</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="winningBidder"
                        >
                          <option value="">Select Winning Bidder</option>
                          {companies ? (
                            companies.map((option) => (
                              <option value={option.ID}>{option.Name}</option>
                            ))
                          ) : (
                            <option>Firstly Select Bidders</option>
                          )}
                        </Form.Select>
                      </Form.Group> */}
                    {/* </Row> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px', position: 'sticky'}}>
            <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Add Proposal
            </Button>
            </div>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Form Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>Proposal Added Successfully</Modal.Body>
          </Modal>
          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showCityForm}
            onHide={handleCloseCityForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddCity
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseCityForm}
                  api={apiCallCity}
                  apiCall={setCallCity}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showDeptForm}
            onHide={handleCloseDeptForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddDepartment
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseDeptForm}
                  api={apiCallCity}
                  apiCall={setCallCity}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showCategoryForm}
            onHide={handleCloseCategoryForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Project Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddCategory
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseCategoryForm}
                  api={apiCallCity}
                  apiCall={setCallCity}
                />
              }
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ProposalForm;
