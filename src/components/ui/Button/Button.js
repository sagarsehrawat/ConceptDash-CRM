import React from 'react'
import PropTypes from "prop-types";
import './Button.css'
import { text } from '@fortawesome/fontawesome-svg-core';

const  TFButton = (props) => {
    const {icon, label, disabled, variant, handleClick, size, customStyles} = props;
    const mainStyle={};
    const textStyle = {};
    const buttonClassName = variant==='secondary' ? disabled? 'secondary-btn-disabled' : 'secondary-btn': disabled ? 'primary-btn-disabled': 'primary-btn';
    const buttonClassText = variant==='secondary'?(disabled?`secondary-btn-disabled-text`:`secondary-btn-text`):(disabled?`primary-btn-disabled-text`:`primary-btn-text`);
    const isObjectEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    }
    if(icon!==""){
      if(isObjectEmpty(customStyles)){
        mainStyle.padding = '8px 24px 8px 16px';
      }
      else{
        customStyles.padding = '8px 24px 8px 16px';
      }
    }
    if(size==='small'){
      if(isObjectEmpty(customStyles)){
        mainStyle.padding = '6px 20px';
        mainStyle.height = '36px';
      }
      else{
        customStyles.padding = '6px 20px';
        customStyles.height = '36px';
      }
      textStyle.fontSize = '16px';
    }
    
  return (
    <button style={isObjectEmpty(customStyles)?mainStyle: customStyles} className={buttonClassName} onClick={handleClick} disabled={disabled}>
        <>
            {icon===''?<></>:(
                <div>
                  <img src={icon} alt="My icon" className='button-icon' />
                </div>
            )}
            <div style={textStyle} className={buttonClassText}>{label}</div>
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
   * Custom Styles for the Button
   */
    customStyles: PropTypes.object
  };

TFButton.defaultProps = {
    icon: "",
    label: "",
    disabled: false,
    variant: "primary",
    handleClick: () => {},
    size: "large",
    customStyles: {}
  };

  export default TFButton;
