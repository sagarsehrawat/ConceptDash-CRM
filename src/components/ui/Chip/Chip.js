import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Chip.css";

const Chip = (props) => {
  const { label, canUpdate, tableRef } = props;

  const [chip, setChip] = useState(label)
  const [chipClass, setChipClass] = useState(getClass());
  const [isVisible, setisVisible] = useState(false)

  const chipModalRef = useRef(null);

  // useEffect for when clicking outside the div should close the modal
  const useOnClickOutside = (ref, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
        };
      },
      [ref, handler]
    );
  }
  useOnClickOutside(chipModalRef, () => setisVisible(false));

  // Get the class of the chip with color and background
  function getClass ()  {
    if(label === 'Completed') return 'completed-chip';
    if(label === 'In Progress') return 'in-progress-chip';
    if(label === 'Not Started') return 'not-started-chip';
  }

  const handleModal = () => {
    if(canUpdate) setisVisible(!isVisible);
  }

  // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
  if(canUpdate && tableRef){
    if(isVisible) tableRef.current.style.overflowY = "hidden";
    else tableRef.current.style.overflowY = "auto";
  }

  return (
    <>
      <div className="chip-container">
        <div className={`chip ${chipClass}`} onClick={handleModal}  ref={chipModalRef}>{chip}</div>
        {canUpdate ? 
          isVisible ? 
          <div className="chip-modal">
            <div className="chip-modal-container">
              <div className="chip-modal-item">
                <div className='chip not-started-chip'>Not Started</div>
              </div>
              <div className="chip-modal-item">
                <div className='chip in-progress-chip'>In Progress</div>
              </div>
              <div className="chip-modal-item">
                <div className='chip completed-chip'>Completed</div>
              </div>
            </div>
            </div>
          : <></>
        : <></>}
      </div>
    </>
  );
};

Chip.propTypes = {
  /**
   * Label for the Chip
   */
  label: PropTypes.oneOf(['Completed', 'Not Started', 'In Progress']).isRequired,
  /**
   * Label for the Chip
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
