import React from 'react'
import PropTypes from "prop-types";
import Icons from '../../../constants/Icons';

const TFIcon = ({ icon, alt, classname }) => {
  return (
    <img src={icon} alt={alt} classname={classname} />
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
  classname: PropTypes.string,
};

export default TFIcon