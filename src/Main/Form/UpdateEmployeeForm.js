import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_JOB_TITLES,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEENAMES,
  GET_CITIES,
  GET_DEPARTMENTS,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import JobTitle from "./JobTitle";
import LoadingSpinner from "../Loader/Loader";
import TFButton from "../../components/ui/TFButton/TFButton";

function UpdateEmployeeForm(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const managerName = props.row.Manager_Name;
  const [isSubmit, setIsSubmit] = useState(false);
  const [jobTitles, setjobTitles] = useState([]);
  const [sal, setsal] = useState(props.row.Salutation);
  const [fname, setfname] = useState(props.row.First_Name);
  const [lname, setlname] = useState(props.row.Last_Name);
  const [jTitle, setjTitle] = useState(props.row.Job_Title_ID);
  let jobtitle = props.row.Job_Title_ID;
  const [jDate, setjDate] = useState(
    props.row.Joining_Date ? props.row.Joining_Date.substring(0, 10) : ""
  );
  const [directManager, setdirectManager] = useState(
    props.row.Direct_Manager_ID
  );
  const [deptment, setdeptment] = useState(props.row.Department_ID);
  let displayDept = props.row.Department_ID;
  const [ework, setework] = useState(props.row.Email_Work);
  const [bphone, setbphone] = useState(props.row.Business_Phone);
  const [address, setaddress] = useState(props.row.Address);
  const [city, setcity] = useState(props.row.City);
  const [zip, setzip] = useState(props.row.ZIP);
  const [epersonal, setepersonal] = useState(props.row.Email_Personal);
  const [mobile, setmobile] = useState(props.row.Mobile_Phone);
  const [wpage, setwpage] = useState(props.row.Web_Page);
  const [res, setres] = useState(props.row.Resume);
  const [attachments, setattachments] = useState(props.row.Attachments);
  const [notes, setnotes] = useState(props.row.Notes);

  const [birthday, setbirthday] = useState(
    props.row.Birthday ? props.row.Birthday.substring(0, 10) : ""
  );
  const [anniv, setanniv] = useState(
    props.row.Anniversary ? props.row.Anniversary.substring(0, 10) : ""
  );
  const [sport, setsport] = useState(props.row.Sports);
  const [act, setact] = useState(props.row.Activites);
  const [bev, setbev] = useState(props.row.Beverage);
  const [alco, setalco] = useState(props.row.Alcohol);
  const [tdest, settdest] = useState(props.row.Travel_Destination);
  const [sname, setsname] = useState(props.row.Spouse_Name);
  const [child, setchild] = useState(props.row.Children);
  const [tv, settv] = useState(props.row.TV_Show);
  const [movie, setmovie] = useState(props.row.Movies);
  const [actor, setactor] = useState(props.row.Actor);
  const [dislike, setdislike] = useState(props.row.Dislikes);

  const [prof, setprof] = useState(props.row.Proficiency);
  const [exp, setexp] = useState(props.row.Expertise);
  const [int, setint] = useState(props.row.Interests);
  const [cocurr, setcocurr] = useState(props.row.Cocurricular);
  const [train, settrain] = useState(props.row.Trainings);

  const [str, setstr] = useState(props.row.Strengths);
  const [weak, setweak] = useState(props.row.Weakness);
  const [sai, setsai] = useState(props.row.Social_Active_Index);

  const [uname, setuname] = useState(props.row.Username);
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);

  const [employees, setemployees] = useState([]);
  useEffect(() => {
    setisLoading(true)
    const call = async () => {
      await axios
        .get(HOST + GET_JOB_TITLES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setjobTitles(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
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
        setisLoading(false)
    };
    call();
  }, []);
  const [form, setform] = useState({
    salutation: sal??"",
    firstname: fname??"",
    lastname: lname??"",
    department: deptment??"",
    jobtitle: jTitle??"",
    directManager: directManager??"",
    emailWork: ework??"",
    emailPersonal: epersonal??"",
    joiningDate: jDate??"",
    business: bphone??"",
    mobile: mobile??"",
    address: address??"",
    city: city??"",
    zip: zip??"",
    expertise: exp??"",
    webpage: wpage??"",
    resume: res??"",
    attachments: attachments??"",
    notes: notes??"",
    birthday: birthday??"",
    anniversary: anniv??"",
    sports: sport??"",
    activity: act??"",
    beverage: bev??"",
    alcohol: alco??"",
    travelDest: tdest??"",
    spouseName: sname??"",
    children: child??"",
    tvShow: tv??"",
    movie: movie??"",
    actor: actor??"",
    dislikes: dislike??"",
    proficiency: prof??"",
    interests: int??"",
    cocurricular: cocurr??"",
    trainings: train??"",
    strengths: str??"",
    weakness: weak??"",
    activeIndex: sai??"",
    username: uname??"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "salutation") {
      setsal(value);
    }
    if (name === "firstname") {
      setfname(value);
    }
    if (name === "lastname") {
      setlname(value);
    }
    if (name === "jobtitle") {
      setjTitle(value);
    }
    if (name === "directManager") {
      setdirectManager(value);
    }
    if (name === "department") {
      setdeptment(value);
    }
    if (name === "joiningDate") {
      setjDate(value);
    }
    if (name === "emailWork") {
      setework(value);
    }
    if (name === "emailPersonal") {
      setepersonal(value);
    }
    if (name === "mobile") {
      setmobile(value);
    }
    if (name === "address") {
      setaddress(value);
    }
    if (name === "business") {
      setbphone(value);
    }
    if (name === "city") {
      setcity(value);
    }
    if (name === "zip") {
      setzip(value);
    }
    if (name === "notes") {
      setnotes(value);
    }
    if (name === "attachments") {
      setattachments(value);
    }
    if (name === "resume") {
      setres(value);
    }
    if (name === "webpage") {
      setwpage(value);
    }
    if (name === "expertise") {
      setexp(value);
    }
    if (name === "birthday") {
      setbirthday(value);
      console.log(value)
    }
    if (name === "anniversary") {
      setanniv(value);
    }
    if (name === "sports") {
      setsport(value);
    }
    if (name === "activity") {
      setact(value);
    }
    if (name === "beverage") {
      setbev(value);
    }
    if (name === "alcohol") {
      setalco(value);
    }
    if (name === "travelDest") {
      settdest(value);
    }
    if (name === "spouseName") {
      setsname(value);
    }
    if (name === "children") {
      setchild(value);
    }
    if (name === "tvShow") {
      settv(value);
    }
    if (name === "movie") {
      setmovie(value);
    }
    if (name === "actor") {
      setactor(value);
    }
    if (name === "dislikes") {
      setdislike(value);
    }
    if (name === "proficiency") {
      setprof(value);
    }
    if (name === "interests") {
      setint(value);
    }
    if (name === "cocurricular") {
      setcocurr(value);
    }
    if (name === "trainings") {
      settrain(value);
    }
    if (name === "strengths") {
      setstr(value);
    }
    if (name === "weakness") {
      setweak(value);
    }
    if (name === "activeIndex") {
      setsai(value);
    }
    if (name === "username") {
      setuname(value);
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_EMPLOYEE,
        {
          username: form.username,
          password: form.password,
          department: form.department,
          salutation: form.salutation,
          firstName: form.firstname,
          lastName: form.lastname,
          directManagerId: form.directManager,
          joiningDate: form.joiningDate,
          resignationDate: form.resignationDate,
          emailWork: form.emailWork,
          emailPersonal: form.emailPersonal,
          jobTitleId: form.jobtitle,
          business: form.business,
          mobile: form.mobile,
          address: form.address,
          city: form.city,
          zip: form.zip,
          expertise: form.expertise,
          webpage: form.webpage,
          notes: form.notes,
          resume: form.resume,
          attachments: form.attachments,
          proficiency: form.proficiency,
          interest: form.interests,
          cocurricular: form.cocurricular,
          training: form.trainings,
          birthday: form.birthday,
          anniversary: form.anniversary,
          sports: form.sports,
          activities: form.activity,
          beverage: form.beverage,
          alcohol: form.alcohol,
          travelDestination: form.travelDest,
          spouseName: form.spouseName,
          children: form.children,
          tvShow: form.tvShow,
          movies: form.movie,
          actor: form.actor,
          dislikes: form.dislikes,
          strengths: form.strengths,
          weaknesses: form.weakness,
          socialActiveIndex: form.activeIndex,
          id: props.row.Employee_ID,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res.data);
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showJTForm, setshowJTForm] = useState(false);
  const handleCloseJTForm = () => setshowJTForm(false);
  const handleShowJTForm = () => setshowJTForm(true);
  return (
    isLoading?<LoadingSpinner/>:
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px', width:'731px'}}>
      <div>
        <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select
                defaultValue={sal}
                name="salutation"
                type="text"
                placeholder="Salutation"
                onChange={handleChange}
              >
                <option value="">Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="None">None</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={fname}
                name="firstname"
                type="text"
                placeholder="First Name*"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                value={lname}
                name="lastname"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select name="department" onChange={handleChange} required>
                <option value="">Select Department</option>
                {depts.map((option) => (
                  <option
                    value={option.Department_ID}
                    selected={option.Department_ID === displayDept}
                  >
                    {option.Department}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select name="jobtitle" onChange={handleChange} required>
                <option value="">Job Title</option>
                {jobTitles.map((option) => (
                  <option
                    value={option.Title_ID}
                    selected={option.Title_ID === jobtitle}
                  >
                    {option.Title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "grey",
                  border: "none",
                }}
                onClick={handleShowJTForm}
              >
                Add Job Title
              </Button>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select
                onChange={handleChange}
                name="directManager"
                required
              >
                <option value="">Direct Manager</option>
                {employees.map((option) => (
                  <option
                    value={option.Full_Name}
                    selected={option.Full_Name === managerName}
                  >
                    {option.Full_Name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                value={ework}
                name="emailWork"
                type="email"
                placeholder="Email Work*"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                value={epersonal}
                name="emailPersonal"
                type="email"
                placeholder="Email Personal"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                value={jDate}
                name="joiningDate"
                type="date"
                placeholder="Joining Date*"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={bphone}
                name="business"
                type="tel"
                placeholder="Business Phone*"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={mobile}
                name="mobile"
                type="tel"
                placeholder="Mobile Phone*"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Control
              value={address}
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Select
                defaultValue={city}
                onChange={handleChange}
                name="city"
                required
              >
                <option>Select City</option>
                {cities.length !== 0 ? (
                  cities.map((options) => (
                    <option value={options.City_ID} key={options.City_ID}>
                      {options.City}
                    </option>
                  ))
                ) : (
                  <option value="">None</option>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Control
                value={zip}
                name="zip"
                type="text"
                pattern="[0-9]{6}"
                placeholder="Pin Code"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="expertise"
                value={exp}
                placeholder="Expertise"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="webpage"
                value={wpage}
                placeholder="Web-Page"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Resume</Form.Label>
              <Form.Control
                name="resume"
                type="file"
                placeholder="Resume"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                name="attachments"
                type="file"
                placeholder="Attachments"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={notes}
              name="notes"
              as="textarea"
              rows={1}
              type="text"
              placeholder="Notes"
              onChange={handleChange}
            />
          </Form.Group>

          {/* personal details */}
          <h2
            style={{
              margin: "auto",
              width: "30%",
              marginTop: "5vh",
              marginBottom: "2vh",
              textDecoration: "underline",
            }}
          >
            Personal Details
          </h2>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                value={birthday}
                name="birthday"
                type="date"
                placeholder="Birthday"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Anniversary</Form.Label>
              <Form.Control
                value={anniv}
                name="anniversary"
                type="date"
                placeholder="Anniversary"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              {/* <Form.Label>Birthday</Form.Label> */}
              {/* <Form.Control name='sports' type="date" placeholder="Birthday" onChange={handleChange} /> */}
              <Form.Select
                defaultValue={sport}
                onChange={handleChange}
                name="sports"
              >
                <option value="">Select Sports</option>
                <option value="Soccer">Soccer</option>
                <option value="Hockey">Hockey</option>
                <option value="Basketball">Basketball</option>
                <option value="Baseball">Baseball</option>
                <option value="Boxing">Boxing</option>
                <option value="MMA">MMA</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select
                defaultValue={act}
                onChange={handleChange}
                name="activity"
              >
                <option value="">Select Activity</option>
                <option value="Walking">Walking</option>
                <option value="Running">Running</option>
                <option value="Travelling">Travelling</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select
                defaultValue={bev}
                onChange={handleChange}
                name="beverage"
              >
                <option value="">Select Beverage</option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Ice Cap">Ice Cap</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select
                defaultValue={alco}
                onChange={handleChange}
                name="alcohol"
              >
                <option value="">Select Alcohol</option>
                <option value="Vodka">Vodka</option>
                <option value="Scotch">Scotch</option>
                <option value="Beer">Beer</option>
                <option value="Tequila">Tequila</option>
                <option value="Rum">Rum</option>
                <option value="Cocktail">Cocktail</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={tdest}
                name="travelDest"
                type="text"
                placeholder="Travel Destination"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={sname}
                name="spouseName"
                type="text"
                placeholder="Spouse Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={child}
                name="children"
                type="text"
                placeholder="Children"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={tv}
                name="tvShow"
                type="text"
                placeholder="TV Show"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={movie}
                name="movie"
                type="text"
                placeholder="Movie"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={actor}
                name="actor"
                type="text"
                placeholder="Actor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={dislike}
                name="dislikes"
                type="text"
                placeholder="Dislikes"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <h2
            style={{
              margin: "auto",
              width: "25%",
              marginTop: "5vh",
              marginBottom: "4vh",
              textDecoration: "underline",
            }}
          >
            Employee Skills
          </h2>
          <Row className="mb-4">
            <Form.Group as={Col}>
              {/* <Form.Control name='tvShow' type='text' placeholder='TV Show' onChange={handleChange}/> */}
              <Form.Select
                defaultValue={prof}
                name="proficiency"
                onChange={handleChange}
              >
                <option value="">Proficiency</option>
                <option value="AutoCAD">AutoCAD</option>
                <option value="Civil3D">Civil3D</option>
                <option value="Microstation">Microstation</option>
                <option value="Syncro">Syncro</option>
                <option value="Cidra">Cidra</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={int}
                name="interests"
                type="text"
                onChange={handleChange}
                placeholder="Interests"
              />
            </Form.Group>
          </Row>
          <Row classname="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={cocurr}
                name="cocurricular"
                type="text"
                onChange={handleChange}
                placeholder="Co-Curriculars"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={train}
                name="trainings"
                type="text"
                onChange={handleChange}
                placeholder="Trainings"
              />
            </Form.Group>
          </Row>

          <h2
            style={{
              margin: "auto",
              width: "25%",
              marginTop: "5vh",
              marginBottom: "4vh",
              textDecoration: "underline",
            }}
          >
            Employee Traits
          </h2>
          <Row classname="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={str}
                name="strengths"
                type="text"
                onChange={handleChange}
                placeholder="Strengths"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={weak}
                name="weakness"
                type="text"
                onChange={handleChange}
                placeholder="Weakness"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                value={sai}
                name="activeIndex"
                type="text"
                onChange={handleChange}
                placeholder="Social Active Index"
              />
            </Form.Group>
          </Row>
          <h2
            style={{
              margin: "auto",
              width: "25%",
              marginTop: "5vh",
              marginBottom: "4vh",
              textDecoration: "underline",
            }}
          >
            Authentication
          </h2>

          <Row classname="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                value={uname}
                name="username"
                type="text"
                placeholder="Username*"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          {/* <Button
            className="submit-btn"
            variant="primary"
            type="submit"
            style={{ marginTop: "4vh", width: "10vw" }}
          >
            Submit
          </Button> */}
          <TFButton style={{marginTop: '4vh', width: '10vw'}} label="Submit" type="submit" size="small"/>
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>Employee Updated Successfully</Modal.Body>
        </Modal>
        <Modal show={showJTForm} onHide={handleCloseJTForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add Job Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>{<JobTitle />}</Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default UpdateEmployeeForm;
