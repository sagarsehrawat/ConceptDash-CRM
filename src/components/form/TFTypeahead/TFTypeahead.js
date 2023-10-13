import React, { useState } from 'react'
import PropTypes from "prop-types";
import "./TFTypeahead.css";

const TFTypeahead = ({ name, placeholder, value, onChange, options, required, readOnly }) => {
  const [isVisible, setisVisible] = useState(false);
  // TODO : Implement Asynchronous Functionality
  // TODO : Implement MultiSelect Functionality
  console.log(value)
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
          autoComplete='off'
          required={required}
          readOnly={readOnly}
        />
        {
          isVisible ? (
            <div className="typeahead-options-modal">
              {options.map((option) => {
                if (typeof value === 'string' && option.label.toLowerCase().includes(value.toString().toLowerCase())) {
                  return <div
                    className="typeahead-option"
                    onMouseDown={() => { 
                      console.log(name, option.value); 
                      onChange({ target: { name: name, value: option.value } }); 
                    }}
                    key={option.value}
                  >
                    {option.label}
                  </div>;
                } else {
                  return <></>;
                }
              })}
              {options.every((option) => !option.label.toLowerCase().includes(value.toString().toLowerCase())) && (
                <div className="typeahead-no-match-found">No Match Found</div>
              )}
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
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  name: PropTypes.string,
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ),
  /**
   * Variable for making the input field required
   */
  required: PropTypes.bool,
  /**
   * Variable for making the input field readOnly
   */
  readOnly: PropTypes.bool,
};

TFTypeahead.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => { },
  name: '',
  options: [],
  required: false,
  readOnly: false

};

export default TFTypeahead