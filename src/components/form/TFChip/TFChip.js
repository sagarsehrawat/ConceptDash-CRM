import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Chip.css";

// Array of Available Options
const values = ['Completed', 'In Progress', 'Not Started', 'Critical', 'High', 'Medium', 'Low', 'Done', 'Not Found', 'Draft Budget', 'Won', 'Pending', 'Lost', 'Go', 'No Go', 'Review', 'Recieved', 'Approved', 'Waiting', 'External', '0', '1', '2', '3', '4', '5','Primary','Secondary','Tertiary','Client','Consultant','Partner','Subconsultant','Yes','No','Submitted','Not Submitted']

// Class list for Chips
const classes = {
  'Submitted': 'submitted-chip',
  'Not Submitted': 'not-submitted-chip',
  'Completed': 'completed-chip',
  'In Progress': 'in-progress-chip',
  'Not Started': 'not-started-chip',
  'Critical': 'critical-chip',
  'High': 'high-chip',
  'Medium': 'medium-chip',
  'Low': 'low-chip',
  'Done': 'done-chip',
  'Not Found': 'not-found-chip',
  'Draft Budget': 'draft-budget-chip',
  'Won': 'won-chip',
  'Pending': 'pending-chip',
  'Lost': 'lost-chip',
  'Go': 'go-chip',
  'No Go': 'nogo-chip',
  'Review': 'review-chip', 
  'Recieved': 'recieved-chip', 
  'Approved': 'approved-chip', 
  'Waiting': 'waiting-chip',
  'External': 'external-chip',
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  'Primary' : 'primary',
  'Tertiary' : 'tertiary',
  'Secondary' : 'secondary',
  'Client' : 'client',
  'Consultant' : 'consultant',
  'Partner' : 'partner',
  'Subconsultant':'subconsultant',
  'Yes': 'yes-chip',
  'No': 'no-chip'
}

const TFChip = ({ value, tableRef, options, onChange, name }) => {
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
    if (onChange) setisVisible(!isVisible);
  };

  // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
  useEffect(() => {
    if (onChange && tableRef) {
      if (isVisible) {
        tableRef.current.style.overflowY = 'hidden';
      } 
      // else {
      //   tableRef.current.style.overflowY = 'auto';
      // }
    }
  }, [onChange, isVisible, tableRef]);

  return (
    <>
      <div className="chip-wrapper">
        <div
          className={`chip ${classes[value]}`}
          style={{ "cursor": onChange ? "pointer" : "default" }}
          onClick={handleModal}
        >
          {value}
        </div>
        {onChange ? (
          isVisible ? (
            <div
              className="chip-modal"
              ref={chipRef}>
              <div className="chip-modal-container">
                {options.map((option) => (
                  <div
                    className="chip-modal-item"
                    key={option}
                    onClick={(e) => {
                      setisVisible(false);
                      onChange(name, option);
                    }}
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

TFChip.propTypes = {
  /**
   * Value for the Chip
   */
  value: PropTypes.oneOf(values).isRequired,
  /**
   * Options for the update modal of the chip
   */
  options: PropTypes.array,
  /**
   * useRef variable for the table which can stop the scrolling of the table
   */
  tableRef: PropTypes.any,
  /**
   * Function on what to do when updating with the modal 
   */
  onChange: PropTypes.func,
  /**
   * name of the field
   */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TFChip.defaultProps = {
  tableRef: null,
  onChange: null,
  options: [],
  name:'',
};

export default TFChip;
