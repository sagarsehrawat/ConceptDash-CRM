import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TFTypeahead.css";

const TFTypeahead = ({
  name,
  placeholder,
  defaultValue,
  onChange,
  options,
  required,
  readOnly,
  width,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isVisible, setisVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  // TODO : Implement Asynchronous Functionality
  // TODO : Implement MultiSelect Functionality

  // Handle Blur functionality to choose option when moves away from input
  const handleBlur = () => {
    const exactMatch = options.find((option) => option.label === value);
    if (value === "") {
      setIsValid(true);
      onChange(name, { label: "", value: "" });
    } else if (!exactMatch) {
      setIsValid(false);
      onChange(name, { label: "", value: "" });
    } else {
      setIsValid(true);
      onChange(name, exactMatch);
    }
    setisVisible(false);
  };
  return (
    <>
      <div className="typeahead-wrapper" style={{ width: width }}>
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="typeahead-input"
          onFocus={(e) => {
            setisVisible(true);
          }}
          onBlur={handleBlur}
          style={{ border: isValid ? "" : "1px solid red" }}
          autoComplete="off"
          required={required}
          readOnly={readOnly}
        />
        {isVisible ? (
          <div className="typeahead-options-modal" style={{ width: width }}>
            {options.map((option) => {
              if (option.label.toLowerCase().includes(value.toLowerCase())) {
                return (
                  <div
                    className="typeahead-option"
                    onMouseDown={() => {
                      setValue(option.label);
                      onChange(name, option);
                    }}
                    key={option.value}
                  >
                    {option.label}
                  </div>
                );
              } else {
                return <></>;
              }
            })}
            {options.every(
              (option) =>
                !option.label.toLowerCase().includes(value.toLowerCase())
            ) && (
              <div className="typeahead-no-match-found" key="0">
                No Match Found
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

TFTypeahead.propTypes = {
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
   * Options for Typeahead field
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  /**
   * Width of the input field and the component
   */
  width: PropTypes.string,
};

TFTypeahead.defaultProps = {
  placeholder: "",
  defaultValue: "",
  onChange: () => {},
  name: "",
  options: [],
  required: false,
  readOnly: false,
  width: "224px",
};

export default TFTypeahead;
