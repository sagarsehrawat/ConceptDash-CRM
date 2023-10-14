import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./DateChip.css";

const DateChip = ({
  date,
  tableRef,
  onUpdate,
  dateStyles,
  dateContainerStyles,
}) => {
  const [value, setValue] = useState(dayjs(date));
  const [inputDate, setInputDate] = useState(
    dayjs(date).format("DD MMM, YYYY")
  );
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
    if (onUpdate) setisVisible(!isVisible);
  };

  // Handle the table scrolling i.e. block it when modal is open and run it when modal is closed
  if (onUpdate !== null && tableRef !== null) {
    if (isVisible) tableRef.current.style.overflowY = "hidden";
    else tableRef.current.style.overflowY = "auto";
  }


  const handleDateChange = (newValue) => {
    if(!newValue)return
    if(newValue.$D - value.$D != 0){
      setValue(newValue);
      setInputDate(dayjs(newValue).format("DD MMM, YYYY"));
      // TODO: Db Update Operation
      setisVisible(false);
    }else{
      setValue(newValue);
      setInputDate(dayjs(newValue).format("DD MMM, YYYY"));
    }
  }

  return (
    <>
      <div style={dateContainerStyles}>
        <p
          style={{ cursor: onUpdate ? "pointer" : "default", ...dateStyles }}
          onClick={handleModal}
        >
          {date}
        </p>
        {onUpdate ? (
          isVisible ? (
            <div className="wrapper" ref={dateChipRef}>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="dd-mm-yyyy"
                  value={inputDate}
                  onChange={(e) => {
                    setInputDate(e.target.value);
                    setValue(dayjs(e.target.value));
                  }}
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateCalendar
                  value={value}
                  onChange={handleDateChange}
                  views={["year", "month", "day"]}
                  dayOfWeekFormatter={(_day, weekday) =>
                    `${weekday.format("dd")}`
                  }
                />
              </LocalizationProvider>
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

DateChip.propTypes = {
  /**
   * Default Date value
   */
  defaultDate:
    PropTypes.string | PropTypes.number | dayjs.Dayjs | Date | null | undefined,
};

DateChip.defaultProps = {
  defaultDate: dayjs(),
};

export default DateChip;
