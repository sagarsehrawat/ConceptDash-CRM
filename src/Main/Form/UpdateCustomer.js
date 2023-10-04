import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {
  HOST,
  GET_COMPANY_NAMES,
  UPDATE_CLIENT,
  GET_CITIES,
  GET_CUSTOMER_JOBTITLES,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import { Typeahead } from "react-bootstrap-typeahead";
import TFButton from "../../components/ui/Button/Button";

function UpdateCustomer(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props
  const companyName = props.row.Company_Name;
  const [isSubmit, setIsSubmit] = useState(false);
  const [company, setcompany] = useState(props.row.Company_ID);
  const [sal, setsal] = useState(props.row.Salutation);
  const [fname, setfname] = useState(props.row.First_Name);
  const [lname, setlname] = useState(props.row.Last_Name);
  const [ework, setework] = useState(props.row.Email_Work);
  const [bphone, setbphone] = useState(props.row.Business_Phone);
  const [address, setaddress] = useState(props.row.Address);
  const [city, setcity] = useState(props.row.City_ID);
  const [epersonal, setepersonal] = useState(props.row.Email_Personal);
  const [mobile, setmobile] = useState(props.row.Mobile_Phone);
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
  const [jtitle, setjtitle] = useState(props.row.Job_Title);
  const [jobTitles, setjobTitles] = useState([])

  const [form, setform] = useState({
    company: company??"",
    salutation: sal??"",
    firstname: fname??"",
    lastname: lname??"",
    emailWork: ework??"",
    emailPersonal: epersonal??"",
    jobTitle: jtitle??"",
    business: bphone??"",
    mobile: mobile??"",
    address: address??"",
    city: city??"",
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
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "salutation") {
      setsal(value);
    }
    if (name === "company") {
      setcompany(value);
    }
    if (name === "firstname") {
      setfname(value);
    }
    if (name === "lastname") {
      setlname(value);
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
    if (name === "jobTitle") {
      setjtitle(value);
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
    if (name === "notes") {
      setnotes(value);
    }
    if (name === "attachments") {
      setattachments(value);
    }
    if (name === "birthday") {
      setbirthday(value);
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
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const handleChange1 = (e) => {
    setjtitle(e[0])
    const newForm = form;
    newForm["jobtitle"] = e[0];
    setform(newForm);
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_CLIENT,
        {
          clientId: props.row.ID,
          salutation: form.salutation,
          companyId: form.company,
          firstName: form.firstname,
          lastName: form.lastname,
          emailWork: form.emailWork,
          jobTitle: form.jobTitle,
          emailPersonal: form.emailPersonal,
          businessPhone: form.business,
          mobilePhone: form.mobile,
          address: form.address,
          cityId: form.city,
          province: form.state,
          country: form.country,
          notes: form.notes,
          attachment: form.attachments,
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
          tvShow: form.tvShow,
          dislikes: form.dislikes,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res.data)
        setisLoading(false);
        if (res.data.success) {
          closeModal()
          setGreen(true);
          apiCall(api+1)
        } else {
          setRed(true)
        }
      })
      .catch((err) => {
        setisLoading(false);
        setRed(true);
        console.log(err);
      });
  };
  const [isLoading, setisLoading] = useState(false)
  const [cities, setcities] = useState([]);
  const [companies, setcompanies] = useState([]);
  useEffect(() => {
    setisLoading(true)
    const call = async () => {
      await axios
        .get(HOST + GET_CUSTOMER_JOBTITLES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          let arr = []
          res.data.res.forEach(e => {
            arr.push(e.Job_Title)
          })
          setjobTitles(arr);
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
        .get(HOST + GET_CITIES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setcities(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
        setisLoading(false)
    };
    call();
  }, []);
  return (
    isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Select Company</Form.Label>
            <Form.Select onChange={handleChange} name="company">
              <option>Select Company</option>
              {companies.map((option) => (
                <option
                  value={option.ID}
                  selected={option.Name === companyName}
                >
                  {option.Name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select
              defaultValue={sal}
              name="salutation"
              type="text"
              onChange={handleChange}
              required
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="">None</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              value={fname}
              onChange={handleChange}
              name="firstname"
              type="text"
              placeholder="First Name*"
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              value={lname}
              onChange={handleChange}
              name="lastname"
              type="text"
              placeholder="Last Name"
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control
              value={epersonal}
              onChange={handleChange}
              name="emailPersonal"
              type="email"
              placeholder="Email Personal"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control
              value={ework}
              onChange={handleChange}
              name="emailWork"
              type="email"
              placeholder="Email Work"
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-4" as={Col}>
          
        <Typeahead
               id="jobTitle"
               labelKey="jobTitle"
                options={jobTitles}
                onChange={handleChange1}
                placeholder="Job Title"
                defaultInputValue={jtitle}
              />
        </Form.Group>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              value={bphone}
              onChange={handleChange}
              name="business"
              type="tel"
              placeholder="Business Phone"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              value={mobile}
              onChange={handleChange}
              name="mobile"
              type="tel"
              placeholder="Mobile Phone"
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-4" controlId="formGridAddress1">
          <Form.Control
            value={address}
            onChange={handleChange}
            name="address"
            placeholder="Address"
          />
        </Form.Group>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Select
              defaultValue={city}
              onChange={handleChange}
              name="city"
            >
              <option>Select City</option>
              {cities.length !== 0 ? (
                cities.map((options) => (
                  <option selected={options.City_ID === city} value={options.City_ID} key={options.City_ID}>
                    {options.City}
                  </option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>

          
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={notes}
              onChange={handleChange}
              name="notes"
              as="textarea"
              rows={1}
              type="text"
              placeholder="Notes"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              onChange={handleChange}
              name="attachments"
              type="file"
              placeholder="Attachments"
            />
          </Form.Group>
        </Row>
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
            {/* <Form.Label>Anniversary</Form.Label> */}
            {/* <Form.Control name='anniversary' type="date" placeholder="Anniversary" onChange={handleChange} /> */}
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
        {/* <Button
          className="submit-btn"
          variant="primary"
          type="submit"
        >
          Submit
        </Button> */}
        <TFButton label="Submit" type="submit" size="small"/>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Custmer Updated Successfully</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateCustomer;
