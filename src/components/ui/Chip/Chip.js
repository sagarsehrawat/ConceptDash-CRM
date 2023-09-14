import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Chip.css";

const Chip = (props) => {
  const { valueFunc, canUpdate, tableRef, options } = props;

  const [value, setValue] = valueFunc;

  // const [chip, setChip] = useState(value)
  const [chipClass, setChipClass] = useState(getClass(value));
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
    if (val === "Completed") return "completed-chip";
    if (val === "In Progress") return "in-progress-chip";
    if (val === "Not Started") return "not-started-chip";
  }

  const handleModal = () => {
    if (canUpdate) setisVisible(!isVisible);
  };

  // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
  if (canUpdate && tableRef) {
    if (isVisible) tableRef.current.style.overflowY = "hidden";
    else tableRef.current.style.overflowY = "auto";
  }

  // Handle Click on the update modal
  const handleClick = (e, option) => {
    e.preventDefault();
    if (setValue !== null) {
      setValue(option);
      setChipClass(getClass(option));
    }
    setisVisible(false);
  };

  return (
    <>
      <div className="chip-container">
        <div
          className={`chip ${chipClass}`}
          onClick={handleModal}
          ref={chipRef}
        >
          {value}
        </div>
        {canUpdate ? (
          isVisible ? (
            <div className="chip-modal">
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
   * Value for the Chip
   */
  valueFunc: PropTypes.array.isRequired,
  /**
   * Options for the update modal of the chip
   */
  options: PropTypes.array.isRequired,
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  tableRef: PropTypes.func,
  /**
   * Boolean for whether to show the modal for updation
   */
  canUpdate: PropTypes.bool,
};

Chip.defaultProps = {
  canUpdate: false,
  tableRef: null,
};

export default Chip;
