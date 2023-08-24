import React, { useContext, useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { FORGOT_PASSWORD, GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR, VERIFY_OTP } from "../Constants/Constants";
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
import {useLocation} from 'react-router-dom';
import LoadingSpinner from "../Loader/Loader";

function EnterOtp() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation();
    const id = location.state.id
    const email = location.state.email
    console.log(location.state.id)
    const[call, setcall] = useState(1);
    const [ minutes, setMinutes ] = useState(10);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    }, [call]);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const { privileges, setPrivileges } = useContext(AuthContext);
    
    const [isLoading, setisLoading] = useState(false);
    const [isLoading1, setisLoading1] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        await axios
          .get(HOST + FORGOT_PASSWORD, {
            headers: { auth: "Rose " + localStorage.getItem("auth"), email: email },
          })
          .then((res) => {
            if(!res.data.res) {
              handleShow();
            }
          })
          .catch((err) => {
            console.log(err);
          });
          setisLoading(false);
          setcall(call+1)
        //   startTimer(10, 0);
      };
    const [otp, setOtp] = useState('');

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setisLoading1(true);
    await axios
      .get(HOST + VERIFY_OTP, {
        headers: { auth: "Rose " + localStorage.getItem("auth"), otp: otp, id: location.state.id },
      })
      .then((res) => {
        console.log(res.data.res)
        if(!res.data.success) {
            handleShow()
        } else {
            navigate('/resetPassword', {state:{id: location.state.id}})
        }
      })
      .catch((err) => {
        console.log(err);
        handleShow()
      });
      setisLoading1(false);
    //   startTimer(10, 0);
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
                          <div className="addHeading">Wrong OTP</div>
                      </div>
                      <div><img onClick={handleClose} style={{marginRight:'35px', marginTop:'1px'}} src={cross} /></div>
                  </div>
                  <div className="invalidText">
                    OTP expired or wrong.
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
          {isLoading?<LoadingSpinner/>:<><div className="welcomeHeading">Verification required</div>
          <div className="welcomeText">
          Please enter the OTP sent to <span><b>{email}</b></span> for verification
          <div style={{marginTop: '20px', marginBottom: '12px', marginLeft:'10vw'}}>Time out in: { minutes === 0 && seconds === 0
            ? null
            : <span> {minutes}m {seconds < 10 ?  `0${seconds}` : seconds}s</span> 
        }</div>
          </div>
          
          <MDBContainer style={{textAlign: 'center',marginTop:'50vh', width: '24vw'}} >
          <OTPInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                inputStyle='inputstyle'
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
                containerStyle={{width:'300px'}}
            />
          </MDBContainer>
          <div className="resend">Didn’t receive a code?<span style={{color: '#8361FE', cursor:'pointer'}} onClick={handleSubmit}> Click to resend</span></div>
          {/* <div style={styles.button}> */}
            {/* <div onClick={onLogin} style={styles.loginText}>Login</div> */}
            <button onClick={verifyOtp} className='button' disabled={isLoading1}>
              <p className="loginText">Verify and continue</p>
            </button>
          {/* </div> */}</>}
        </div>
      </>
    );
}

export default EnterOtp
