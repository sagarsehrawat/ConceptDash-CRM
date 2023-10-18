import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./TFDateChip.css";
import moment from 'moment'

const TFDateChip = ({
    value,
    tableRef,
    onChange,
    style,
    name,
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
    if (onChange !== null && tableRef !== null && tableRef.current !== null) {
        if (isVisible) tableRef.current.style.overflowY = "hidden";
        else tableRef.current.style.overflowY = "auto";
    }

    return (
        <>
            <div className='datechip-wrapper'>
                <div
                    style={{ cursor: onChange ? "pointer" : "default", ...style }}
                    className='datechip'
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
                                value={value}
                                name={name}
                                onChange={(e) => {
                                    onChange(e.target.name, e.target.value);
                                }}
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DateCalendar
                                value={moment(value)}
                                onChange={(e) => {
                                    onChange(name, e);
                                    setisVisible(false);
                                }}
                                views={["day"]}
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
};

TFDateChip.propTypes = {
    /**
     * Default Date value
     */
    defaultDate:
        PropTypes.string | PropTypes.number,
};

TFDateChip.defaultProps = {
    defaultDate: '23 Sep, 2023',
    tableRef: null
};
export default TFDateChip