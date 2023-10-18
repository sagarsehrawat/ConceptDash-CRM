import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { CHANGE_PASSWORD, GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR } from "../Constants/Constants";
import AuthContext from "../../Context/AuthContext";
import {
    MDBContainer,
    MDBInput,
} from "mdb-react-ui-kit";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
import { Modal } from "react-bootstrap";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import deadline from '../../Images/Vector.png'
import cross from '../../Images/cross1.svg'

function ResetPassword() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    const location = useLocation();
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
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
  
    
    const [isLoading, setisLoading] = useState(false);
    const handleSubmit = async (e) => {
        if(username!==password) {
            handleShow();
            return;
        }
      e.preventDefault();
      setisLoading(true);
      await axios
        .post(HOST + CHANGE_PASSWORD, { password: password, id: location.state.id })
        .then((res) => {
          if(res.data.success) {
            navigate('/passwordChanged')
          }
        })
        .catch((err) => {
          console.log(err);
          setisLoading(false);
            handleShow1()
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
          <div className="welcomeHeading">Set your new password</div>
          <div className="welcomeText">
          Let's set up a new password for your account.
          </div>
          <MDBContainer style={{textAlign: 'center',marginTop:'47vh', width: '24vw'}} >
            <MDBInput
            style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
              wrapperClass="mb-5"
              // label="Username"
              placeholder="New Password"
              id='typeText'
              type="password"
              onChange={(e) => { setusername(e.target.value) }}
              required
            />
      {/* {showPassword?<FontAwesomeIcon icon={faEyeDropper} style={{ height: "9px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={handleTogglePassword} />:<FontAwesomeIcon icon={faEye} style={{ height: "9px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={handleTogglePassword} />} */}
            <MDBInput
            style={{height:'5vh', fontSize: '14px', fontFamily: 'Roboto', lineHeight: '20px', fontWeight: '400', color: '#0A0A0A', borderRadius:'8px'}}
            wrapperClass="mb-2"
              placeholder="Confirm New Password"
              // label='Password'
              // id="form2"
              type={showPassword ? 'text' : 'password'}
              id='typePassword'
              onChange={(e) => { setpassword(e.target.value) }}
              required
            />
          </MDBContainer>
            <button onClick={handleSubmit} className='button' disabled={isLoading}>
              <p className="loginText">Reset Password</p>
            </button>
          {/* </div> */}
        </div>
      </>
    );
}

export default ResetPassword
