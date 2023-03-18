import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Agenda, Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule'
import React, { useEffect, useRef, useState } from 'react'
import { primaryColour } from '../Constants/styles'
import GreenAlert from '../Loader/GreenAlert'
import LoadingSpinner from '../Loader/Loader'
import RedAlert from '../Loader/RedAlert'
import { Internationalization, extend } from "@syncfusion/ej2-base";
import { Form } from 'react-bootstrap'
import moment from 'moment'

const Calendar = () => {
    const [isLoading, setisLoading] = useState(false)
    const [events, setEvents] = useState(null);
    const SCOPES = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    const [red, setred] = useState(false);
    const [green, setgreen] = useState(false);
    const [view, setview] = useState('Day');
    const scheduleRef = useRef(null);
    const calendarID = "primary";

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
            height: "780px",
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
            color: "#6519E1"
        },
        calendarContainer: {
            overflowY: "scroll",
            background: "#FFFFFF",
            height: "780px",
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
        }
    }

    useEffect(() => {
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
        return (
            <div className='custom' style={{ background: "#DBDBF4", }}>
                <div style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "12px", color: "#0A0A0A" }}>{props.Subject}</div>
                <div style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "10px", lineHeight: "12px", color: "#0A0A0A", marginTop: "4px" }}>{moment(props.StartTime.toString()).format('h:mm A')} - {moment(props.EndTime.toString()).format('h:mm A')}</div>
            </div>
        );
    };

    return (
        <>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}
            {/* Header */}
            <div style={styles.headerContainer} className='d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row justify-content-start align-items-center'>
                    <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "18px", lineHeight: "28px", color: "#0A0A0A", margin: "0px", marginRight: "28px", marginLeft: "20px" }}>Calendar</p>
                    <button style={styles.todayButton} onClick={(e) => {
                        document.getElementById('e-tbr-btn_4').click();
                        document.getElementById('e-tbr-btn_11').click();
                    }}>Today</button>
                    <FontAwesomeIcon icon={faChevronLeft} color={primaryColour} style={{ marginRight: "24px", cursor: "pointer" }} onClick={(e) => {
                        document.getElementById('e-tbr-btn_0').click();
                    }} />
                    <FontAwesomeIcon icon={faChevronRight} color={primaryColour} style={{ marginRight: "12px", cursor: "pointer" }} onClick={(e) => {
                        document.getElementById('e-tbr-btn_1').click();
                    }} />
                    <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", margin: "0px" }}>March 7, 2023</p>
                </div>
                {/* Day Dropdown */}
                <Form.Select
                    style={styles.headerDropdown}
                    onChange={(e) => setview(e.target.value)}
                >
                    <option value="Day" style={{ fontFamily: "'Roboto'" }}>Day&nbsp;<FontAwesomeIcon icon={faChevronDown} /></option>
                    <option value="Week" style={{ fontFamily: "'Roboto'" }}>Week&nbsp;<FontAwesomeIcon icon={faChevronDown} /></option>
                    <option value="Month" style={{ fontFamily: "'Roboto'" }}>Month&nbsp;<FontAwesomeIcon icon={faChevronDown} /></option>
                    <option value="Agenda" style={{ fontFamily: "'Roboto'" }}>Agenda&nbsp;<FontAwesomeIcon icon={faChevronDown} /></option>
                </Form.Select>
            </div>

            {/* Header Line */}
            <div style={{ border: "1px solid #EBE9F1", height: "0px", margin: "0px 20px" }}></div>

            {/* Container */}
            <div className='d-flex flex-row' style={{height: "100%"}}>

                {/* Left Continaer */}
                <div className='d-flex flex-column gap-5' style={styles.leftContianer}>
                    <button style={styles.newEventButton}>Create New Event</button>
                </div>

                {/* Right Container */}
                <div className='flex-grow-1'>
                    {false
                        ? <div style={{ height: "100%" }}><LoadingSpinner /></div>
                        : <>
                            <div style={styles.calendarContainer} className='d-flex flex-row'>
                                <div style={{ width: "5%", marginTop: "68px", marginRight: "8px" }} className='d-flex justify-content-end'>
                                    {view==="Day" || view==="Week" ? <table>
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
                                <div style={{ width: "95%" }}>
                                    <ScheduleComponent
                                        ref={scheduleRef}
                                        cssClass="no-border"
                                        allowEditing={false}
                                        allowDeleting={false}
                                        eventSettings={{ dataSource: events, template: appointmentTemplate }}
                                        agendaDaysCount={7}
                                        showHeaderBar={true}
                                        currentView={view}
                                        onViewChange={(e) => { setview(e.cureentView) }}
                                    >
                                        <Inject services={[Day, Week, Month, Agenda]} />
                                    </ScheduleComponent>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Calendar