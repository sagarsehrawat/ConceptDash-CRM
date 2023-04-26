import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR } from "../Constants/Constants";
import AuthContext from "../../Context/AuthContext";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

const styles = {
  leftPart: {
    position: "absolute",
    width: "50vw",
    height: "100vh",
    left: "0px",
    top: "0px",
    background: "#F3F5F9",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
  },
  rightPart: {
    position: "absolute",
    width: "52vw",
    height: "100vh",
    left: "48vw",
    top: "0px",
    background: "#F8FAFB",
  },
  leftUpper: {
    position: "absolute",
    width: "40vw",
    height: "40vw",
    left: "-25vw",
    top: "-34.7vh",
    background: "#E0D8EC",
    transform: "rotate(-45deg)",
  },
  welcomeHeading: {
    position: "absolute",
    width: "20vw",
    height: "3vh",
    left: "15vw",
    top: "37vh",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "36px",
    color: "#0A0A0A",
  },
  welcomeText: {
    position: "absolute",
    width: "22vw",
    height: "5vh",
    left: "15vw",
    top: "42vh",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#A3A3A3",
  },
  button: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 64px",
    gap: "10px",
    position: "absolute",
    width: "22vw",
    height: "5vh",
    left: "15vw",
    top: "65vh",
    background: PRIMARY_COLOR,
    // border: "1px solid #6519E1",
    boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
    borderRadius: "8px"
  },
  loginText: {
    marginTop: '8px',
    width: "35px",
    height: "20px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#FBFBFB",
    flex: "none",
    order: 0,
    flexGrow: 0,
    cursor: 'pointer'
  }
};

const Login = () => {
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
      <div style={styles.leftPart}>
        {/* <div style={styles.leftUpper}></div> */}
        {viewportWidth>1500?<img src={leftSideBig}/>:<img src={leftSide}/>}
      </div>
      <div style={styles.rightPart}>
        <div style={styles.welcomeHeading}>Welcome Back!</div>
        <div style={styles.welcomeText}>
          Welcome back to taskforce! Enter your credentials to login
        </div>
        <MDBContainer style={{textAlign: 'center',marginTop:'49vh', width: '24vw'}} >
          <MDBInput
          style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
            wrapperClass="mb-4"
            // label="Username"
            placeholder="Username"
            id="form1"
            type="text"
            onChange={(e) => { setusername(e.target.value) }}
          />
          <MDBInput
          style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
          wrapperClass="mb-4"
            placeholder="Password"
            // label='Password'
            id="form2"
            type="password"
            onChange={(e) => { setpassword(e.target.value) }}
          />
        </MDBContainer>
        {/* <div style={styles.button}> */}
          {/* <div onClick={onLogin} style={styles.loginText}>Login</div> */}
          <Button onClick={onLogin} style={styles.button}>
            <p style={styles.loginText}>Login</p>
          </Button>
        {/* </div> */}
      </div>
    </>
  );
};

export default Login;
