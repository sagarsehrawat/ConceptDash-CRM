import React from 'react'
import PropTypes from "prop-types";
import Icons from '../../../constants/Icons';

const TFIcon = ({ icon, alt, className, onClick, style }) => {
  return (
    <img src={icon} alt={alt} className={className} onClick={onClick} style={style}/>
  )
}

TFIcon.propTypes = {
  /**
  * Placeholder for the SearchBar
  */
  icon: PropTypes.oneOf(Object.keys(Icons)),
  /**
  * Alt Text for Icon
  */
  alt: PropTypes.string,
  /**
  * Classname for icon
  */
  className: PropTypes.string,
  /**
  * Custom Style for icon
  */
  style: PropTypes.object,
  /**
  * onClick callback for icon
  */
  onClick: PropTypes.func,
};

export default TFIcon