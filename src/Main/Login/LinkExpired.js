import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { GET_EMPLOYEE_PRIVILEGES, HOST, LOGIN, PRIMARY_COLOR, REGENERATE_TOKEN, SET_CREDENTIALS, VERIFY_TOKEN } from "../Constants/Constants";
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
import bgLeft from '../../Images/bgLeft.svg'
import bgRight from '../../Images/bgRight.svg'
import wrong from '../../Images/wrong.svg'
import tf from '../../Images/taskforce.svg'

function LinkExpired() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setisLoading(true);
      await axios
        .post(HOST + REGENERATE_TOKEN, { id: location.state.id })
        .then((res) => {
          if(res.data.success) {
            navigate('/regenerated/token')
          }
        })
        .catch((err) => {
          console.log(err);
        });
        setisLoading(false);
    };
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <img src={bgLeft} />
      <img src={tf} className='logo' />
      <div style={{marginTop:'35vh', textAlign:'center'}}>
        <div className="linkExpired"><img style={{marginRight:'8px'}} src={wrong}/>Link Expired!</div>
        <div className="expiredText">We're sorry, but the link you clicked has expired.
This can happen if the link has been used before or if it has reached its expiration date.

Please generate a new link by clicking on Send Link again.

Thank you for your patience!</div>
        <Button onClick={handleSubmit} className="expiredButton" disabled={isLoading}>Send Link Again</Button>
      </div>
      {/* <img src={bgRight} style={{position:'absolute', left:'50vw', top:'22vh'}} /> */}
      {/* <img src={bgRight} className='bgRight' /> */}
    </div>
  )
}

export default LinkExpired
