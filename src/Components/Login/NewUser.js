import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR } from "../Constants/Constants";
import AuthContext from "../../Context/AuthContext";
import {
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

function NewUser() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const { privileges, setPrivileges } = useContext(AuthContext);
    useEffect(() => {
      const department = localStorage.getItem("department");
      if (department) {
        switch (department) {
          case "Admin":
            navigate("/admin");
            break;
          case "Engineer":
            navigate("/engineers");
            break;
          case "Manager":
            navigate("/manager");
            break;
          default:
            break;
        }
      }
    }, []);
  
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
  
    const onLogin = async (e) => {
      e.preventDefault();
      handleSubmit(e);
    };
    console.log(viewportWidth)
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios
        .post(HOST + LOGIN, { username: username, password: password })
        .then((res) => {
          if (res.data.error === "Email or Password is Incorrect") {
            alert("Incorrect Username or Password");
          } else {
            if (!res.data.success) alert("Something Went Wrong...");
          }
          window.localStorage.setItem("auth", res.data.auth);
          localStorage.setItem("department", res.data.user.department);
          localStorage.setItem("emailWork", res.data.user.emailWork);
          localStorage.setItem("employeeId", res.data.user.employeeId);
          localStorage.setItem("employeeName", res.data.user.employeeName);
  
          axios
            .get(HOST + GET_EMPLOYEE_PRIVILEGES, {
              headers: {
                auth: "Rose " + localStorage.getItem("auth"),
                employeeid: localStorage.getItem("employeeId"),
              },
            })
            .then((res) => {
              let arr = [];
              res.data.res.map((e) => {
                arr.push(e.Privilege);
              });
              localStorage.setItem("privileges", JSON.stringify(arr));
              setPrivileges(arr);
  
              switch (localStorage.getItem("department")) {
                case "Admin":
                  navigate("/admin");
                  break;
                case "Engineer":
                  navigate("/engineers");
                  break;
                default:
                  break;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <>
        {/* <div className='home container d-flex justify-content-center align-items-center'>
          <div className='main-body '>
            <div className='heading d-flex flex-row mb-5'>
              <h2 align="center" style={{ color: "white" }}>Login using Your Credentials</h2>
            </div>
            <form>
              <div className=" mb-4">
                <input type="text" className="form-control shadow-none input-home" id="inputEmail3" placeholder='Username' onChange={(e) => { setusername(e.target.value) }} />
              </div>
              <div className=" mb-3">
                <input type="password" className="form-control shadow-none input-home" id="password" placeholder='Password' style={{ marginBottom: "4rem" }} onChange={(e) => { setpassword(e.target.value) }} />
              </div>
              <div className='d-flex flex-row justify-content-center my-1'>
                <button type="submit" className="btn btn-home" onClick={onLogin}>Login</button>
              </div>
  
            </form>
          </div>
        </div> */}
        {viewportWidth>1500?
      <div className='leftPartBig'>
        <img src={leftSideBig}/>
      </div>:
      <div className='leftPart'>
        <img src={leftSide}/>
      </div>
    }
      <div className={viewportWidth<1500?"rightPart":"rightPartBig"}>
          <div className="welcomeHeading">Welcome To TaskForce!</div>
          <div className="welcomeText">
          We're excited to have you onboard. Create your credentials to login.
          </div>
          <MDBContainer style={{textAlign: 'center',marginTop:'47vh', width: '24vw'}} >
            <MDBInput
            style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
              wrapperClass="mb-4"
              // label="Username"
              placeholder="Enter Username"
              id='typeText'
              type="text"
              onChange={(e) => { setusername(e.target.value) }}
            />
            <MDBInput
            style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
            wrapperClass="mb-4"
              placeholder="Enter Password"
              // label='Password'
              // id="form2"
              type="password"
              id='typePassword'
              onChange={(e) => { setpassword(e.target.value) }}
            />
            <MDBInput
            style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
            wrapperClass="mb-4"
              placeholder="Confirm Password"
              // label='Password'
              // id="form2"
              type="password"
              id='typePassword'
              onChange={(e) => { setpassword(e.target.value) }}
            />
          </MDBContainer>
          {/* <div style={styles.button}> */}
            {/* <div onClick={onLogin} style={styles.loginText}>Login</div> */}
            <Button onClick={onLogin} className='button'>
              <p className="loginText">Login</p>
            </Button>
          {/* </div> */}
        </div>
      </>
    );
}

export default NewUser
