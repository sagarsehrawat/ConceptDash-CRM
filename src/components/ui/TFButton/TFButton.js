import React, { useState } from 'react'
import PropTypes from "prop-types";
import './TFButton.css'

const  TFButton = ({icon, label, disabled, variant, handleClick, size, style}) => {
  const buttonClassName = variant==='secondary' ? disabled? 'secondary-btn-disabled' : 'secondary-btn': disabled ? 'primary-btn-disabled': 'primary-btn';
    
    if(icon!==""){
        style = {...style,padding: '8px 24px 8px 16px'};
    }
    if(size==='small'){
      style = {...style,padding: '6px 20px'};
      style = {...style,height: '36px'};
      style = {...style,fontSize: '16px'};
    }
    
  return (
    <button style={style} className={buttonClassName} onClick={handleClick} disabled={disabled}>
        <>
            {icon===''?<></>:(
                <div>
                  <img src={icon} alt="Icon" className='button-icon' />
                </div>
            )}
            {label}
        </>
    </button>
  )
}

TFButton.propTypes = {
  /**
   * Icon for the Button
   */
    icon: PropTypes.string,
    /**
   * Label for the Button
   */
    label: PropTypes.string.isRequired,
    /**
   * Disabled for making the button disabled(not clickable)
   */
    disabled: PropTypes.bool,
    /**
   * Whether Button is primary or secondary
   */
    variant: PropTypes.oneOf(['primary','secondary']),
    /**
   *Function called whenever user clicks on Button
   */
    handleClick: PropTypes.func,
    /**
   * Size of the Button
   */
    size: PropTypes.oneOf(['large', 'small']),
    /**
   * Custom style for the Button
   */
    style: PropTypes.object
  };

TFButton.defaultProps = {
    icon: "",
    label: "",
    disabled: false,
    variant: "primary",
    handleClick: () => {},
    size: "large",
    style: {}
  };

  export default TFButton;
