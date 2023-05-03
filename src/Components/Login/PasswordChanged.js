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
import { Button } from "react-bootstrap";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
import { Modal } from "react-bootstrap";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import deadline from '../../Images/Vector.png'
import cross from '../../Images/cross1.svg'
import right from '../../Images/right.svg'
import SmallerLoader from "../Loader/SmallerLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeDropper } from '@fortawesome/free-solid-svg-icons';

function PasswordChanged() {
    
    
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    
    
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
          
          <div className="welcomeHeading"><img style={{marginRight:'8px'}} src={right}/>Password changed!</div>
          <div className="welcomeText">
          Your password has been successfully changed.
          </div>
          
            <button onClick={()=>navigate('/')} className='button' style={{marginTop:'47vh'}}>
              <p className="loginText">Back To Login</p>
            </button>
          {/* </div> */}
        </div>
      </>
    );
}

export default PasswordChanged
