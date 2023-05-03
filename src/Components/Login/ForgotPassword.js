import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { FORGOT_PASSWORD, GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR } from "../Constants/Constants";
import AuthContext from "../../Context/AuthContext";
import {
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
import { Modal } from "react-bootstrap";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import deadline from '../../Images/Vector.png'
import cross from '../../Images/cross1.svg'
import SmallerLoader from "../Loader/SmallerLoader";

function ForgotPassword() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const { privileges, setPrivileges } = useContext(AuthContext);
  
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
  
    const onLogin = async (e) => {
      e.preventDefault();
      handleSubmit(e);
    };
    const [isLoading, setisLoading] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setisLoading(true);
      await axios
        .get(HOST + FORGOT_PASSWORD, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), email: username },
        })
        .then((res) => {
          if(!res.data.res) {
            handleShow();
          } else {
            navigate('/otp',{state:{id: res.data.res, email: username}} )
          }
        })
        .catch((err) => {
          console.log(err);
        });
        setisLoading(false);
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
          <Modal
            show={show}
            onHide={handleClose}
            // backdrop="static"
            className="incorrectModal"
            dialogClassName="filter-dialog"
            backdropClassName="filter-backdrop"
            animation={false}
          >
            <div style={{backgroundColor:'#E84C3D'}}>
                  <div className='d-flex flex-row justify-content-between align-items-center' style={{width: '260px',marginTop: '17px', marginLeft: '17px', display: 'flex', flexDirection:'row'}}>
                      <div className='d-flex flex-row'>
                          <img src={deadline} />
                          <div className="addHeading">Wrong Credentials</div>
                      </div>
                      <div><img onClick={handleClose} style={{marginRight:'35px', marginTop:'1px'}} src={cross} /></div>
                  </div>
                  <div className="invalidText">
                    User does not exist.
                  </div>
            </div>
          </Modal>
          <Modal
            show={show1}
            onHide={handleClose1}
            // backdrop="static"
            className="incorrectModal"
            dialogClassName="filter-dialog"
            backdropClassName="filter-backdrop"
            animation={false}
          >
            <div style={{backgroundColor:'#E84C3D'}}>
                  <div className='d-flex flex-row justify-content-between align-items-center' style={{width: '260px',marginTop: '17px', marginLeft: '17px', display: 'flex', flexDirection:'row'}}>
                      <div className='d-flex flex-row'>
                          <img src={deadline} />
                          <div className="addHeading">Network Error</div>
                      </div>
                      <div><img onClick={handleClose1} style={{marginRight:'35px', marginTop:'1px'}} src={cross} /></div>
                  </div>
                  <div className="invalidText">
                    Something went wrong.
                  </div>
            </div>
          </Modal>
          <div className="welcomeHeading">Trouble with logging in?</div>
          <div className="welcomeText">
          Don’t worry, we’ll help you get your account.  Enter your email address to get OTP for verification
          </div>
          <MDBContainer style={{textAlign: 'center',marginTop:'47vh', width: '24vw'}} >
            <MDBInput
            style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
            //   wrapperClass="mb-5"
              // label="Username"
              placeholder="Enter Your Email"
              id='typeText'
              type="email"
              onChange={(e) => { setusername(e.target.value) }}
            />
          </MDBContainer>
          {/* <div style={styles.button}> */}
            {/* <div onClick={onLogin} style={styles.loginText}>Login</div> */}
            <button onClick={onLogin} className='button' disabled={isLoading}>
              <p className="loginText">Get OTP</p>
            </button>
          {/* </div> */}
        </div>
      </>
    );
}

export default ForgotPassword
