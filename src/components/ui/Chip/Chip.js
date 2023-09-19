import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Chip.css";

// Array of Available Options
const values = ['Completed', 'In Progress', 'Not Started', 'Critical', 'High', 'Medium', 'Low', 'Done', 'Not Found', 'Draft Budget', 'Won', 'Pending', 'Lost', 'Go', 'No Go', 'Review']

// Class list for Chips
const classes = {
  'Completed' : 'completed-chip',
  'In Progress' : 'in-progress-chip',
  'Not Started' : 'not-started-chip',
  'Critical' : 'critical-chip',
  'High' : 'high-chip',
  'Medium' : 'medium-chip',
  'Low' : 'low-chip',
  'Done' : 'done-chip',
  'Not Found' : 'not-found-chip',
  'Draft Budget' : 'draft-budget-chip',
  'Won' : 'won-chip',
  'Pending' : 'pending-chip',
  'Lost' : 'lost-chip',
  'Go' : 'go-chip',
  'No Go' : 'nogo-chip',
  'Review' : 'review-chip'
}

const Chip = (props) => {
  const { label, tableRef, options, onUpdate, id } = props;

  // const [chip, setChip] = useState(value)
  const [value, setValue] = useState(label)
  const [chipClass, setChipClass] = useState(classes[label]);
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

  //  Handle Opening and Closing of Modal
  const handleModal = () => {
    if (onUpdate) setisVisible(!isVisible);
  };

  // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
  if (onUpdate!==null && tableRef!==null) {
    if (isVisible) tableRef.current.style.overflowY = "hidden";
    else tableRef.current.style.overflowY = "auto";
  }

  // Handle Click on the update modal
  const handleClick = async (e, option) => {
    e.preventDefault();
    const prev = value;
    setValue(option);
    setChipClass(classes[option]);
    setisVisible(false);

    try{
      const response = await onUpdate(id, option)

      if(response.success === false) throw response.data.error
    } catch(e) {
      setValue(prev);
      setChipClass(classes[prev]);
    }
  };

  return (
    <>
      <div className="chip-container">
        <div
          className={`chip ${chipClass}`}
          style={{"cursor" : onUpdate ? "pointer" : "default"}}
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
                    <div className={`chip ${classes[option]}`}>{option}</div>
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
  options: PropTypes.array,
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  tableRef: PropTypes.func,
  /**
   * Function on what to do when updating with the modal 
   */
  onUpdate: PropTypes.func,
  /**
   * ID of the row to be updated in Table
   */
  id: PropTypes.number,
};

Chip.defaultProps = {
  tableRef: null,
  onUpdate: null,
  options: []
};

export default Chip;
