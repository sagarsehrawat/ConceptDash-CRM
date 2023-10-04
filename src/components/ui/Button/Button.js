import React from 'react'
import PropTypes from "prop-types";
import './Button.css'

const  TFButton = (props) => {
    const {icon, label, disabled, variant, handleClick, size, customStyles} = props;

    const isObjectEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    }
    if(icon!==""){
      if(!isObjectEmpty(customStyles))customStyles.padding='8px 24px 8px 16px'
      else{
        const buttonClassName = variant==='secondary' ? disabled? 'secondary-btn-disabled' : 'secondary-btn': disabled ? 'primary-btn-disabled': 'primary-btn';
      const buttonElement = document.getElementsByClassName(`${buttonClassName}`); 
      if (buttonElement.length > 0&&size!=="small") {
        for (let i = 0; i < buttonElement.length; i++) {
          buttonElement[i].style.padding = '8px 24px 8px 16px';
        }
      }
      }
    }
    if(size==='small'){
      const buttonClassName = variant==='secondary' ? disabled? 'secondary-btn-disabled' : 'secondary-btn': disabled ? 'primary-btn-disabled': 'primary-btn';
      const buttonClassText = variant==='secondary'?(disabled?`secondary-btn-disabled-text`:`secondary-btn-text`):(disabled?`primary-btn-disabled-text`:`primary-btn-text`);
      const buttonElement = document.getElementsByClassName(`${buttonClassName}`); 
      const buttonText = document.getElementsByClassName(`${buttonClassText}`); 
      if (buttonElement.length > 0) {
        for (let i = 0; i < buttonElement.length; i++) {
          console.log(buttonElement[i]);
          buttonElement[i].style.padding = '6px 20px';
          buttonElement[i].style.height = '36px';
          buttonText[i].style.fontSize = '16px';
        }
      }
    }
    
  return (
    <button style={customStyles} className={variant==='secondary'?(disabled?`secondary-btn-disabled`:`secondary-btn`):(disabled?`primary-btn-disabled`:`primary-btn`)} onClick={handleClick} disabled={disabled}>
        <>
            {icon===''?<></>:(
                <div>
                  <img src={icon} alt="My icon" className='button-icon' />
                </div>
            )}
            <div className={variant==='secondary'?(disabled?`secondary-btn-disabled-text`:`secondary-btn-text`):(disabled?`primary-btn-disabled-text`:`primary-btn-text`)}>{label}</div>
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
