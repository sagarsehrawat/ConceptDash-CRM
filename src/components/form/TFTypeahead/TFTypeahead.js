import React, { useState } from 'react'
import PropTypes from "prop-types";
import "./TFTypeahead.css";

const TFTypeahead = ({ name, placeholder, value, onChange, options }) => {
  const [isVisible, setisVisible] = useState(false);
  return (
    <>
      <div className='typeahead-wrapper'>
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='typeahead-input'
          onFocus={(e) => setisVisible(true)}
          onBlur={(e) => setisVisible(false)}
        />
        {
          isVisible ? (
            <div className="typeahead-options-modal">
              <div className="typeahead-modal-container">
                {options.map((option) => (
                  <div
                    className="typeahead-option"
                    onClick={(e) => {onChange(exmy)}}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
      </div>
    </>
  )
}

TFTypeahead.propTypes = {
  /**
   * Placeholder for the typeahead
   */
  placeholder: PropTypes.string,
  /**
   * Value of the Typeahead input field
   */
  value: PropTypes.string,
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  onChange: PropTypes.func,
};

TFTypeahead.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => {},

};

export default TFTypeahead