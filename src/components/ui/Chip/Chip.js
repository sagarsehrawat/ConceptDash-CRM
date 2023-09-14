import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Chip.css";

const values = ['Completed', 'In Progress', 'Not Started']
const classes = {
  'Completed' : 'completed-chip',
  'In Progress' : 'in-progress-chip',
  'Not Started' : 'not-started-chip'
}

const Chip = (props) => {
  const { label, tableRef, options, onUpdate } = props;

  // const [chip, setChip] = useState(value)
  const [value, setValue] = useState(label)
  const [chipClass, setChipClass] = useState(getClass(label));
  const [isVisible, setisVisible] = useState(false);

  const chipRef = useRef(null);

  // useEffect for when clicking outside the div should close the modal
  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target) || event.target.classList.contains('chip')) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, [ref, handler]);
  };
  useOnClickOutside(chipRef, () => setisVisible(false));

  // Get the class of the chip with color and background
  function getClass(val) {
    return classes[val];
  }

  //  Handle Opening and Closing of Modal
  const handleModal = () => {
    if (onUpdate) setisVisible(!isVisible);
  };

  // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
  if (onUpdate && tableRef) {
    if (isVisible) tableRef.current.style.overflowY = "hidden";
    else tableRef.current.style.overflowY = "auto";
  }

  // Handle Click on the update modal
  const handleClick = (e, option) => {
    e.preventDefault();
    setValue(option);
    setChipClass(getClass(option));
    setisVisible(false);
    onUpdate()
  };

  return (
    <>
      <div className="chip-container">
        <div
          className={`chip ${chipClass}`}
          onClick={handleModal}
        >
          {value}
        </div>
        {onUpdate ? (
          isVisible ? (
            <div 
            className="chip-modal" 
            ref={chipRef}>
              <div className="chip-modal-container">
                {options.map((option) => (
                  <div
                    className="chip-modal-item"
                    onClick={(e) => handleClick(e, option)}
                  >
                    <div className={`chip ${getClass(option)}`}>{option}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

Chip.propTypes = {
  /**
   * Label for the Chip
   */
  label: PropTypes.oneOf(values).isRequired,
  /**
   * Options for the update modal of the chip
   */
  options: PropTypes.array.isRequired,
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  tableRef: PropTypes.func,
  /**
   * Function on what to do when updating with the modal 
   */
  onUpdate: PropTypes.func,
};

Chip.defaultProps = {
  tableRef: null,
};

export default Chip;
