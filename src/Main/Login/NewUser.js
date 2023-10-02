import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR, SET_CREDENTIALS, VERIFY_TOKEN } from "../Constants/Constants";
import AuthContext from "../../Context/AuthContext";
import {
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
import { Modal } from "react-bootstrap";
import deadline from '../../Images/Vector.png'
import cross from '../../Images/cross1.svg'

function NewUser() {
    const location = useLocation();
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const { privileges, setPrivileges } = useContext(AuthContext);
    function getTokenFromUrl() {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get("token");
    }
    const [employeed, setemployeeid] = useState('')
    const [token, settoken] = useState('')
    console.log(employeed)
    useEffect(() => {
      const token = getTokenFromUrl();
      settoken(token)
          axios
            .get(HOST + VERIFY_TOKEN, {
              headers: {
                token: token,
              },
            })
            .then((res) => {
              console.log(res.data.res)
              if(res.data.success===false) {
                if(res.data.error==='Invalid Token') {
                  navigate('/404')
                } else if(res.data.error==='Expired Token') {
                  navigate('/link/expired', {state:{id: res.data.res[0].Employee_ID}})
                } else {
                  throw res.data.error;
                }
              } 
              else {
                setemployeeid(res.data.res[0].Employee_ID);
              }
            })
            .catch((err) => {
              console.log(err);
            });
      // do something with the token, such as storing it in state or using it to make an API call
    }, [location.search]);

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [ConfPassword, setConfPassword] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        if(password!==ConfPassword) {
            handleShow();
            return;
        }
      e.preventDefault();
      setisLoading(true);
      await axios
        .post(HOST + SET_CREDENTIALS, { username: username, password: password, id: employeed, token:token })
        .then((res) => {
          console.log(res)
          if(res.data.success) {
            navigate('/passwordChanged')
          }
        })
        .catch((err) => {
          console.log(err);
        });
        setisLoading(false);
    };
    
    return (
      <>
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
                          <div className="addHeading">Error!!</div>
                      </div>
                      <div><img onClick={handleClose} style={{marginRight:'35px', marginTop:'1px'}} src={cross} /></div>
                  </div>
                  <div className="invalidText">
                    Passwords don't match.
                  </div>
            </div>
          </Modal>
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
              onChange={(e) => { setConfPassword(e.target.value) }}
            />
          </MDBContainer>
          {/* <div style={styles.button}> */}
            {/* <div onClick={onLogin} style={styles.loginText}>Login</div> */}
            <Button onClick={handleSubmit} className='button' disabled={isLoading}>
              <p className="loginText">Set Credentials</p>
            </Button>
          {/* </div> */}
        </div>
      </>
    );
}

export default NewUser
