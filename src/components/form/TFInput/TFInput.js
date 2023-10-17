import React, { useState } from "react";
import PropTypes from "prop-types";
import './TFInput.css'

const TFInput = ({
  name,
  placeholder,
  defaultValue,
  onChange,
  required,
  readOnly,
  width,
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <>
      <div className="tfinput-wrapper" style={{ width }}>
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.name, e.target.value);
          }}
          className="tfinput"
          autoComplete="off"
          required={required}
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

TFInput.propTypes = {
  /**
   * Placeholder for the typeahead
   */
  placeholder: PropTypes.string,
  /**
   * Default Value of the Typeahead input field
   */
  defaultValue: PropTypes.string,
  /**
   * onChange callback function
   */
  onChange: PropTypes.func,
  /**
   * Name of the typeahead input field
   */
  name: PropTypes.string,
  /**
   * Variable for making the input field required
   */
  required: PropTypes.bool,
  /**
   * Variable for making the input field readOnly
   */
  readOnly: PropTypes.bool,
  /**
   * Width of the input field and the component
   */
  width: PropTypes.string,
};

TFInput.defaultProps = {
  placeholder: "",
  defaultValue: "",
  onChange: () => {},
  name: "",
  required: false,
  readOnly: false,
  width: "224px",
};

export default TFInput;
