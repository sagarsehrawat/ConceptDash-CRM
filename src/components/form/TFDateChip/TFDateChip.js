import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./TFDateChip.css";

const TFDateChip = ({
    value,
    tableRef,
    onChange,
    style,
    name
  }) => {
    const [isVisible, setisVisible] = useState(false);
    const dateChipRef = useRef(null);
  
    // useEffect for when clicking outside the div should close the modal
    const useOnClickOutside = (ref, handler) => {
      useEffect(() => {
        const listener = (event) => {
          if (
            !ref.current ||
            ref.current.contains(event.target) ||
            event.target.classList.contains("wrapper")
          ) {
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
    useOnClickOutside(dateChipRef, () => setisVisible(false));
  
    //  Handle Opening and Closing of Modal
    const handleModal = () => {
      if (onChange) setisVisible(!isVisible);
    };
  
    // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
    if (onChange !== null && tableRef !== null && tableRef.curent !== null) {
      if (isVisible) tableRef.current.style.overflowY = "hidden";
      else tableRef.current.style.overflowY = "auto";
    }
  
    return (
      <>
        <div className='datechip-wrapper'>
          <div
            className='datechip'
            style={{ cursor: onChange ? "pointer" : "default", ...style }}
            onClick={handleModal}
          >
            {value}
          </div>
          {onChange && isVisible ? (
              <div className="datechip-modal" ref={dateChipRef}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="dd-mm-yyyy"
                    name={name}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.name, e.target.value);
                      setisVisible(false);
                    }}
                  />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DateCalendar
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.name, e);
                        setisVisible(false);
                    }}
                    views={["year", "month", "day"]}
                    dayOfWeekFormatter={(_day, weekday) =>
                      `${weekday.format("dd")}`
                    }
                  />
                </LocalizationProvider>
              </div>
            ) : (
              <></>
            )}
        </div>
      </>
    );
}

export default TFDateChip