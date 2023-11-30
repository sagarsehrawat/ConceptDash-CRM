import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
    const [date, setDate] = useState(moment(value).isValid() ? moment(value).format('DD-MM-YYYY') : '')
    const [isValid, setIsValid] = useState(true)
    const dateChipRef = useRef(null);

    // Handle Blur functionality to choose option when moves away from input
    const handleBlur = () => {
        if (date === moment(value).format('DD-MM-YYYY')) return;
        const isDateValid = moment(date, "DD-MM-YYYY", true);
        if(date === ''){
            onChange(name, '');
            setIsValid(true);
            setisVisible(false);
        }else if (isDateValid.isValid()) {
            onChange(name, moment(date, 'DD-MM-YYYY'));
            setIsValid(true);
            setisVisible(false);
        } else {
            setIsValid(false);
        }
    };

    // useEffect for when clicking outside the div should close the modal
    const useOnClickOutside = (ref, handler) => {
        useEffect(() => {
            const listener = (event) => {
                if (
                    !ref.current ||
                    ref.current.contains(event.target) ||
                    event.target.classList.contains("wrapper") ||
                    (!moment(date, "DD-MM-YYYY", true).isValid() && date!=='')
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
    useOnClickOutside(dateChipRef, () => { handleBlur(); setisVisible(false); });

    //  Handle Opening and Closing of Modal
    const handleModal = () => {
        if (onChange && isValid) setisVisible(!isVisible);
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
                    {moment(value).isValid() ? moment(value).format('D MMM, YYYY').replace('.', '') : 'Choose Date'}
                </div>
                {onChange && isVisible ? (
                    <div className="datechip-modal" ref={dateChipRef}>
                        <div className="input-wrapper" style={{ border: isValid ? "" : "1px solid red" }}>
                            <input
                                type="text"
                                placeholder="dd-mm-yyyy"
                                value={date}
                                name={name}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                                onFocus={() => setIsValid(true)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                            <DateCalendar
                                value={moment(value).isValid() ? moment(value) : moment()}
                                onChange={(e) => {
                                    console.log(e);
                                    setDate(e.format('DD-MM-YYYY'));
                                    onChange(name, e);
                                    setisVisible(false);
                                }}
                                views={["day"]}
                                dayOfWeekFormatter={(_day, weekday) =>
                                    weekday.format("dd")
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
    value: PropTypes.oneOfType([PropTypes.string, moment]),
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
    /**
     * Style for the date container
     */
    style: PropTypes.object,
};

TFDateChip.defaultProps = {
    value: moment().format(),
    tableRef: null,
    style: {}
};
export default TFDateChip