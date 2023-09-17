import React, { useState } from 'react'
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const  Button = (props) => {
    const {icon, label, disabled, secondary, handleClick } = props
    
  return (
    <Button className={secondary?(disabled?`secondary-btn-disabled`:`secondary-btn`):(disabled?`primary-btn-disabled`:`primary-btn`)} onClick={handleClick} disabled={disabled}>
        <>
            {icon===''?<></>:(
                <div>
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <div className={secondary?(disabled?`secondary-btn-disabled-text`:`secondary-btn-text`):(disabled?`primary-btn-disabled-text`:`primary-btn-text`)}>{label}</div>
        </>
    </Button>
  )
}

Button.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool,
    apiFunc: PropTypes.func
  };

Button.defaultProps = {
    icon: "",
    label: "",
    disabled: false,
    secondary: false,
    handleClick: () => {}
  };

  export default Button;
