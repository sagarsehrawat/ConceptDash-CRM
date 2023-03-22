import { faChevronDown, faChevronLeft, faChevronRight, faClock, faPeopleGroup, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Agenda, Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule'
import React, { useEffect, useRef, useState } from 'react'
import { primaryColour } from '../Constants/styles'
import GreenAlert from '../Loader/GreenAlert'
import LoadingSpinner from '../Loader/Loader'
import RedAlert from '../Loader/RedAlert'
import { Internationalization, extend } from "@syncfusion/ej2-base";
import { Button, Form, Modal } from 'react-bootstrap'
import moment from 'moment'
import { gapi } from 'gapi-script'
import axios from 'axios'
import { ADD_TIMESHEET, GET_EMPLOYEENAMES, HOST } from '../Constants/Constants'
import Select from 'react-virtualized-select';
import ReactSelect from 'react-select'

const Calendar = () => {
    const [isLoading, setisLoading] = useState(false)
    const [events, setEvents] = useState(null);
    const SCOPES = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    const [red, setred] = useState(false);
    const [green, setgreen] = useState(false);
    const [view, setview] = useState('Day');
    const [modalStyles, setmodalStyles] = useState({left: 0, top: 0});
    const [employees, setemployees] = useState([]);
    const [date, setdate] = useState(moment());
    const [times, settimes] = useState(['12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM', '01:00 AM', '01:15 AM', '01:30 AM', '01:45 AM', '02:00 AM', '02:15 AM', '02:30 AM', '02:45 AM', '03:00 AM', '03:15 AM', '03:30 AM', '03:45 AM', '04:00 AM', '04:15 AM', '04:30 AM', '04:45 AM', '05:00 AM', '05:15 AM', '05:30 AM', '05:45 AM', '06:00 AM', '06:15 AM', '06:30 AM', '06:45 AM', '07:00 AM', '07:15 AM', '07:30 AM', '07:45 AM', '08:00 AM', '08:15 AM', '08:30 AM', '08:45 AM', '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM', '07:15 PM', '07:30 PM', '07:45 PM', '08:00 PM', '08:15 PM', '08:30 PM', '08:45 PM', '09:00 PM', '09:15 PM', '09:30 PM', '09:45 PM', '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM'])
    const [form, setform] = useState({
        title: "",
        project: "",
        employees: "",
        startTime: "",
        endTime: "",
        timeZone: "",
        description: "",
        date: moment()
    })
    const scheduleRef = useRef(null);
    const calendarID = "primary";

    //Add Event Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const styles = {
        headerContainer: {
            width: "100%",
            height: "63px",
            margin: ""
        },
        todayButton: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "62px",
            height: "36px",
            background: "#DBDBF4",
            borderRadius: "6px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "right",
            color: "#6519E1",
            marginRight: "20px",
            border: "none"
        },
        headerDropdown: {
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px",
            width: "72px",
            height: "36px",
            marginTop: "14px",
            marginRight: "16px"
        },
        leftContianer: {
            width: "248px",
            height: "86.666666666667vh",
            background: "linear-gradient(0.5deg, #DDDFFA -21%, rgba(221, 223, 250, 0) 27.69%)",
            borderRight: "1px solid #EBE9F1",
            borderRadius: "0px"
        },
        newEventButton: {
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "158px",
            height: "40px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
            borderRadius: "5px",
            margin: "20px 45px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            color: "#6519E1",
            cursor: "pointer"
        },
        calendarContainer: {
            overflowY: "scroll",
            background: "#FFFFFF",
            height: "86.666666666667vh",
        },
        tableRow: {
            height: "72px",
            width: "100%",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "9px",
            lineHeight: "12px",
            textAlign: "right",
            color: "#70757A"
        },
        addEvent: {
            position: "absolute",
            width: "587px",
            height: "fit-content",
            left: modalStyles.left,
            top: modalStyles.top,
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px",
        },
        titleInput: {
            marginTop: "8px",
            border: "none",
            borderBottom: "1px solid #6519E1",
            width: "100%",
            height: "28px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            ':focus': {
                outline: "none",
                boxShadow: "none",
                borderBottom: "1px solid #6519E1 !important"
            },
            ':placeholder': {
                fontFamily: "'Roboto'",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "18px !important",
                lineHeight: "28px !important",
                color: "#70757A !important"
            }
        },
        timeDropdown: {
            border: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "4px 8px",
            gap: "10px",
            width: "95px",
            height: "28px",
            background: "#F3F3F4",
            borderRadius: "5px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#6519E1"
        },
        peopleSelector: {
            control: (base, state) => ({
                ...base,
                padding: "2px 0px 2px 8px",
                minWidth: "360px",
                minHeight: "24px",
                background: "#F3F3F4",
                borderRadius: "6px",
                boxShadow: "none"
            }),
            container: (provided, state) => ({
                ...provided,
                height: '24px',
                width: "360px",
                padding: "2px 0px 2px 8px",
            }),
            input: (provided, state) => ({
                ...provided,
                margin: '0px',
            }),
            indicatorSeparator: state => ({
                display: 'none',
            }),
            indicatorsContainer: (provided, state) => ({
                ...provided,
                height: '30px',
            }),
            menu: (provided, state) => ({
                ...provided,
                height: "100px",
                overflowY: "hidden"
            }),
            menuList: (provided, state) => ({
                ...provided,
                height: "100px",
            }),
        },
        saveButton: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 20px",
            gap: "10px",
            position: "absolute",
            width: "83px",
            height: "36px",
            left: "488px",
            top: "324px",
            background: "#6519E1",
            borderRadius: "8px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FBFBFB"
        }
    }

    useEffect(() => {
        const call = async () => {
            await axios
                .get(HOST + GET_EMPLOYEENAMES, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    const arr = res.data.res.filter((e) => e.Employee_ID !== parseInt(localStorage.getItem("employeeId")))
                    setemployees(arr.map(e => { return { label: e.Full_Name, value: e.Email_Work } }));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        call();
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://apis.google.com/js/api.js";

        document.body.appendChild(script);

        const handleScriptLoad = () => {
            if (window.gapi) {
                window.gapi.load("client:auth2", initClient);
                script.removeEventListener("load", handleScriptLoad);
            }
        };

        script.addEventListener("load", handleScriptLoad);

        return () => {
            script.removeEventListener("load", handleScriptLoad);
        };
    }, []);

    const openSignInPopup = async () => {
        localStorage.removeItem("access_token");
        await window.gapi.auth2.authorize(
            {
                client_id:
                    "52169325708-ujav1fof3lgebds8reurj0e74ua0tsgo.apps.googleusercontent.com",
                scope: SCOPES,
            },
            (res) => {
                if (res) {
                    if (res.access_token)
                        localStorage.setItem("access_token", res.access_token);

                    // Load calendar events after authentication
                    window.gapi.client.load("calendar", "v3", listUpcomingEvents);
                }
            }
        );
    };

    const initClient = async () => {
        setisLoading(true);
        if (!localStorage.getItem("access_token")) {
            await openSignInPopup();
        } else {
            // Get events if access token is found without sign in popup
            fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyCD_8FIN6MsCjNbFY7GxOWxwDm7kmn-tX4&orderBy=startTime&singleEvents=true`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            )
                .then((res) => {
                    // Check if unauthorized status code is return open sign in popup
                    if (res.status !== 401) {
                        return res.json();
                    } else {
                        openSignInPopup();
                    }
                })
                .then((data) => {
                    if (data?.items) {
                        setEvents(formatEvents(data.items));
                        setisLoading(false);
                    }
                });
        }
    };

    const listUpcomingEvents = () => {
        window.gapi.client.calendar.events
            .list({
                calendarId: "primary",
                showDeleted: true,
                singleEvents: true,
                timeMax: "2024-09-29T10:00:00+05:30",
                timeMin: "2021-10-26T13:00:00+05:30",
                maxResults: 500,
            })
            .then(function (response) {
                let events = response.result.items;
                if (events.length > 0) {
                    setEvents(formatEvents(events));
                }
                setisLoading(false);
            });
    };

    const formatEvents = (list) => {
        return list.map((item) => ({
            Id: item.id,
            Subject: item.summary,
            StartTime: new Date(item.start.dateTime) || new Date(item.start.date),
            EndTime: new Date(item.end.dateTime) || new Date(item.end.date),
            meetingLink: item.hangoutLink,
            isAllDay: false,
        }));
    };

    const appointmentTemplate = (props) => {
        const diff = moment(props.EndTime.toString()).diff(moment(props.StartTime.toString())) / 60000;
        if (diff <= 30) {
            return (
                <div className='custom d-flex flex-row align-items-center' style={{ background: "#DBDBF4", }}>
                    <div style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "12px", color: "#0A0A0A" }}>{props.Subject},</div>&nbsp;&nbsp;
                    <div style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "12px", color: "#0A0A0A" }}>{moment(props.StartTime.toString()).format('h:mm A')} - {moment(props.EndTime.toString()).format('h:mm A')}</div>
                </div>
            );
        } else {
            return (
                <div className='custom d-flex flex-column align-items-start justify-content-around' style={{ background: "#DBDBF4", }}>
                    <div style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "12px", color: "#0A0A0A" }}>{props.Subject}</div>
                    <div style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "12px", color: "#0A0A0A", marginTop: "4px" }}>{moment(props.StartTime.toString()).format('h:mm A')} - {moment(props.EndTime.toString()).format('h:mm A')}</div>
                </div>
            );
        }
    };

    const convertTime = (e) => {
        const d = new Date();
        if (d.toString().includes("+0530")) {
            return moment(e).subtract(570, 'minutes').format('hh:mm A').toString()
        } else {
            return moment(e).add(570, 'minutes').format('hh:mm A').toString()
        }
    }

    const makeid = (length) => {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var d = new Date();
        var offset = d.getTimezoneOffset();
        var hours = Math.floor(Math.abs(offset) / 60);
        var minutes = Math.abs(offset) % 60;
        if (minutes === 0) {
            minutes = "00";
        }
        var sign = offset > 0 ? "-" : "+";
        let offset1 = `${sign}0${hours}:${minutes}`;
        const id = makeid(20)
        console.log(moment(form.startTime).format('YYYY-MM-DD'))
        gapi.load('client', () => {
            gapi.client
                .request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?conferenceDataVersion=1`,
                    method: "POST",
                    body: {
                        conferenceDataVersion: 1,
                        summary: `${form.title}`,
                        description: form.description,
                        start: {
                            dateTime: `${moment(form.date).format('YYYY-MM-DD')}T${moment(form.startTime, 'hh:mm A').format('HH:mm')}:00${offset1}`,
                        },
                        end: {
                            dateTime: `${moment(form.date).format('YYYY-MM-DD')}T${moment(form.endTime, 'hh:mm A').format('HH:mm')}:00${offset1}`,
                        },
                        attendees: form.employees.map((email) => ({
                            email: email.trim(),
                        })),
                        conferenceData: {
                            createRequest: {
                                conferenceSolutionKey: {
                                    type: "hangoutsMeet",
                                },
                                requestId: id,
                            },
                        },
                        reminders: {
                            useDefault: true,
                        },
                    },
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                })
                .then(
                    (response) => {
                        setgreen(true)
                        handleClose()
                        scheduleRef.current.addEvent({
                            Id: response.result.id,
                            Subject: response.result.summary,
                            StartTime: new Date(response.result.start.dateTime) || new Date(response.result.start.date),
                            EndTime: new Date(response.result.end.dateTime) || new Date(response.result.end.date),
                            meetingLink: response.result.hangoutLink,
                            isAllDay: false,
                        })
                        return [true, response];
                    },
                    function (err) {
                        setred(true)
                        console.log(err);
                        return [false, err];
                    }
                );
        })
    }

    const handleChange = (e) => {
        if (Array.isArray(e)) {
            setform(prev => {
                return {
                    ...prev,
                    'employees': e.map(x => x.value)
                }
            })
        } else {
            setform(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    const handleEventClick = (e) => {
        const googleMeetLink = e.event.meetingLink;
        window.open(googleMeetLink, "_blank");
    };

    const handleMouseDown = (e) => {
        const left = Math.min(e.clientX, window.innerWidth - 667);
        const top = Math.min(e.clientY, window.innerHeight - 460);
        setmodalStyles({left: left, top: top})
    }

    return (
        <>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}

            {/* Header */}
            <div style={styles.headerContainer} className='d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row justify-content-start align-items-center'>
                    <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "18px", lineHeight: "28px", color: "#0A0A0A", margin: "0px", marginRight: "28px", marginLeft: "20px" }}>Calendar</p>
                    <button style={styles.todayButton} onClick={(e) => {
                        document.querySelector(".e-schedule-toolbar-container > div > div > div.e-toolbar-right > div.e-today > button").click()
                        setdate(moment())
                    }}>Today</button>
                    <FontAwesomeIcon icon={faChevronLeft} color={primaryColour} style={{ marginRight: "24px", cursor: "pointer" }} onClick={(e) => {
                        document.querySelector(".e-schedule-toolbar-container > div > div > div > div.e-prev > button").click()
                        view==='Day' ? setdate(date.clone().subtract(1, 'day')) : setdate(date.clone().subtract(1, 'week'))
                    }} />
                    <FontAwesomeIcon icon={faChevronRight} color={primaryColour} style={{ marginRight: "12px", cursor: "pointer" }} onClick={(e) => {
                        document.querySelector(".e-schedule-toolbar-container > div > div > div > div.e-next > button").click()
                        view==='Day' ? setdate(date.clone().add(1, 'day')) : setdate(date.clone().add(1, 'week'))
                    }} />
                    <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", margin: "0px" }}>{view==='Day' ? date.format('MMMM D, YYYY') : date.clone().startOf('week').format('MMMM D') + "-" + date.clone().endOf('week').format('D, YYYY')}</p>
                </div>

                {/* Day Dropdown */}
                <Form.Select
                    style={styles.headerDropdown}
                    onChange={(e) => setview(e.target.value)}
                >
                    <option value="Day" style={{ fontFamily: "'Roboto'" }}>Day</option>
                    <option value="Week" style={{ fontFamily: "'Roboto'" }}>Week</option>
                </Form.Select>
            </div>

            {/* Header Line */}
            <div style={{ border: "1px solid #EBE9F1", height: "0px", margin: "0px 20px" }}></div>

            {/* Container */}
            <div className='d-flex flex-row' style={{ height: "86.67vh" }}>

                {/* Left Continaer */}
                <div className='d-flex flex-column gap-5' style={styles.leftContianer}>
                    <button style={styles.newEventButton} onClick={e => {setmodalStyles({left: "800px", top: "300px"}); handleShow()}}>Create New Event</button>
                </div>

                {/* Right Container */}
                {isLoading
                    ? <div style={{ height: "100%", width: "100%" }}><LoadingSpinner /></div>
                    : <>
                        <div style={styles.calendarContainer} className='d-flex flex-row'>
                            <div style={{ width: "5%", marginTop: "68px", marginRight: "8px" }} className='d-flex justify-content-end'>
                                {view === "Day" || view === "Week" ? <table>
                                    <tbody>
                                        <tr style={styles.tableRow}>12 AM</tr>
                                        <tr style={styles.tableRow}>1 AM</tr>
                                        <tr style={styles.tableRow}>2 AM</tr>
                                        <tr style={styles.tableRow}>3 AM</tr>
                                        <tr style={styles.tableRow}>4 AM</tr>
                                        <tr style={styles.tableRow}>5 AM</tr>
                                        <tr style={styles.tableRow}>6 AM</tr>
                                        <tr style={styles.tableRow}>7 AM</tr>
                                        <tr style={styles.tableRow}>8 AM</tr>
                                        <tr style={styles.tableRow}>9 AM</tr>
                                        <tr style={styles.tableRow}>10 AM</tr>
                                        <tr style={styles.tableRow}>11 AM</tr>
                                        <tr style={styles.tableRow}>12 AM</tr>
                                        <tr style={styles.tableRow}>1 PM</tr>
                                        <tr style={styles.tableRow}>2 PM</tr>
                                        <tr style={styles.tableRow}>3 PM</tr>
                                        <tr style={styles.tableRow}>4 PM</tr>
                                        <tr style={styles.tableRow}>5 PM</tr>
                                        <tr style={styles.tableRow}>6 PM</tr>
                                        <tr style={styles.tableRow}>7 PM</tr>
                                        <tr style={styles.tableRow}>8 PM</tr>
                                        <tr style={styles.tableRow}>9 PM</tr>
                                        <tr style={styles.tableRow}>10 PM</tr>
                                        <tr style={styles.tableRow}>11 PM</tr>
                                    </tbody>
                                </table> : <></>}
                            </div>
                            <div style={{ width: "95%" }} onMouseDown={handleMouseDown}>
                                <ScheduleComponent
                                    ref={scheduleRef}
                                    cssClass="no-border"
                                    eventClick={handleEventClick}
                                    allowEditing={false}
                                    allowDeleting={false}
                                    eventSettings={{ dataSource: events, template: appointmentTemplate }}
                                    agendaDaysCount={7}
                                    currentView={view}
                                    selectedDate={date}
                                    onViewChange={(e) => { setview(e.currentView) }}
                                    cellClick={(e) => {
                                        setform({
                                            title: "",
                                            project: "",
                                            employees: "",
                                            date: e.startTime,
                                            startTime: moment(e.startTime).format('hh:mm A').toString(),
                                            endTime: moment(e.endTime).format('hh:mm A').toString(),
                                            timeZone: "",
                                            description: "",
                                        })
                                        handleShow()
                                    }}
                                    showQuickInfo={false}
                                    popupOpen={(e) => { e.cancel = true; }}
                                >
                                    <Inject services={[Day, Week, Month, Agenda]} />
                                </ScheduleComponent>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                style={styles.addEvent}
                dialogClassName="event-dialog"
                backdropClassName="filter-backdrop"
                animation={false}
            >
                <div style={{ width: "100%", minHeight: "376px", padding: "16px", overflowY: "auto" }} className='d-flex flex-column'>
                    <div className='d-flex flex-row justify-content-end'>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "4px", gap: "10px", width: "24px", height: "24px", background: "#E5E5E5", borderRadius: "29px", cursor: "pointer" }} onClick={handleClose}>
                            <FontAwesomeIcon icon={faX} />
                        </div>
                    </div>
                    <input type="text" placeholder='Add Title' style={styles.titleInput} className='add-title-placeholder' name='title' onChange={handleChange} />
                    <div className='d-flex justify-content-start align-items-center' style={{ marginTop: "24px" }}>
                        <FontAwesomeIcon icon={faClock} color="#A3A3A3" />
                        <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", marginLeft: "10px" }}>{moment(form.date).format('dddd, MMMM D')}</p>
                    </div>
                    <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#70757A", marginTop: "4px" }}></p>
                    <div className='d-flex flex-row' style={{ marginLeft: "24px", marginTop: "16px" }}>
                        <div className='d-flex flex-column justify-content-between'>
                            <div className='d-flex flex-row justify-content-between gap-0' style={{ width: "206px", marginBottom: "12px" }}>
                                <Form.Select name='startTime' style={styles.timeDropdown} defaultValue={form.startTime} onChange={handleChange}>
                                    {times.map(e => {
                                        return (
                                            <option label={e}>{e}</option>
                                        )
                                    })}
                                </Form.Select>
                                <p>-</p>
                                <Form.Select name='endTime' style={styles.timeDropdown} defaultValue={form.endTime} onChange={handleChange}>
                                    {times.map(e => {
                                        return (
                                            <option label={e}>{e}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div style={{ ...styles.timeDropdown, width: "205px" }}>
                                Local
                            </div>
                        </div>
                        <div style={{ height: "64px", width: "0px", border: "1px solid #EBE9F1", marginLeft: "16px", marginRight: "16px" }}></div>
                        <div className='d-flex flex-column justify-content-between'>
                            <div className='d-flex flex-row justify-content-between gap-0' style={{ width: "206px", marginBottom: "12px" }}>
                                <div style={styles.timeDropdown}>
                                    {convertTime(moment('2023-03-25 ' + form.startTime))}
                                </div>
                                <p>-</p>
                                <div style={styles.timeDropdown}>
                                    {convertTime(moment('2023-03-25 ' + form.endTime))}
                                </div>
                            </div>
                            <div style={{ ...styles.timeDropdown, width: "205px" }} >
                                {new Date().toString().includes("+0530") ?
                                    "GMT -04:00 (Canada)" :
                                    "GMT +05:30 (India)"}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-start gap-2 align-items-center' style={{ marginTop: "24px" }}>
                        <FontAwesomeIcon icon={faPeopleGroup} color="#A3A3A3" />
                        <ReactSelect
                            isMulti
                            placeholder='Add Guests...'
                            name='employees'
                            options={employees}
                            onChange={handleChange}
                            styles={styles.peopleSelector} />
                    </div>
                    <div className='d-flex justify-content-end' style={{ marginTop: "60px" }}>
                        <button style={styles.saveButton} onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Calendar