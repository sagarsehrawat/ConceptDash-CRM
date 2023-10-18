import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import leftSide from '../../Images/Left side.svg'
import leftSideBig from '../../Images/Left sideBig.svg'
import right from '../../Images/right.svg'

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
