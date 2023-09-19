import React from 'react'
import PropTypes from "prop-types";
import './Button.css'

const  Button1 = (props) => {
    const {icon, label, disabled, secondary, handleClick, smallBtn} = props;

    if(smallBtn){
      const buttonClassName = secondary ? disabled? 'secondary-btn-disabled' : 'secondary-btn': disabled ? 'primary-btn-disabled': 'primary-btn';
      const buttonElement = document.getElementsByClassName(`${buttonClassName}`); 
      if(buttonElement.length>0){
        console.log(buttonElement);
        buttonElement[0].style.padding ='6px 20px';
      }
    }
    
  return (
    <button className={secondary?(disabled?`secondary-btn-disabled`:`secondary-btn`):(disabled?`primary-btn-disabled`:`primary-btn`)} onClick={handleClick} disabled={disabled}>
        <>
            {icon===''?<></>:(
                <div>
                  <img src={icon} alt="My icon" className='button-icon' />
                </div>
            )}
            <div className={secondary?(disabled?`secondary-btn-disabled-text`:`secondary-btn-text`):(disabled?`primary-btn-disabled-text`:`primary-btn-text`)}>{label}</div>
        </>
    </button>
  )
}

Button1.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool,
    apiFunc: PropTypes.func,
    smallBtn: PropTypes.bool
  };

Button1.defaultProps = {
    icon: "",
    label: "",
    disabled: false,
    secondary: false,
    handleClick: () => {},
    smallBtn: false
  };

  export default Button1;
