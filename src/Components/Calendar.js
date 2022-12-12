import FullCalendar, { preventDefault } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { gapi } from 'gapi-script'
import {
    useState,
    useEffect
  } from 'react';
  import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { HOST, GET_EMPLOYEENAMES, GET_PROJECT_NAMES, ADD_TIMESHEET } from "./Constants/Constants";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  const TestDemo = () => {
    const timezones = [
      {
        value: ':00-04:30',
        label: 'America/Caracas'
      },
      {
        value: ':00-02:30',
        label: 'America/St_Johns'
      },
      {
        value: ':00+05:30',
        label: 'Asia/Calcutta'
      },
      {
        value: ':00+05:30',
        label: 'Asia/Colombo'
      },
      {
        value: ':00+04:30',
        label: 'Asia/Kabul'
      },
      {
        value: ':00+05:45',
        label: 'Asia/Kathmandu'
      },
      {
        value: ':00+05:45',
        label: 'Asia/Katmandu'
      },
      {
        value: ':00+05:30',
        label: 'Asia/Kolkata'
      },
      {
        value: ':00+06:30',
        label: 'Asia/Rangoon'
      },
      {
        value: ':00+04:30',
        label: 'Asia/Tehran'
      },
      {
        value: ':00+09:30',
        label: 'Australia/Adelaide'
      },
      {
        value: ':00+08:40',
        label: 'Australia/Eucla'
      },
      {
        value:':00-02:30',
        label :'Canada/Newfoundland'
      }
      
    ]
    const [employees, setemployees] = useState([])
    const [start, setstart] = useState('')
    const [end, setend] = useState('')
    const [projects, setprojects] = useState([])
    useEffect(() => {
      const call = async () => {
        await axios.get(HOST + GET_EMPLOYEENAMES,{headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
          setemployees(res.data.res)
        }).catch((err) => {
          console.log(err)
        })
        await axios.get(HOST + GET_PROJECT_NAMES, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
            setprojects(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      let attendees = [];
      employees.map((e)=>{
        attendees.push({
          label: e.Full_Name,
          value: e.Email_Work
        })
      })
      let [DisplayValue, getValue] = useState()
      let doChange=(e)=>{
        getValue(Array.isArray(e)?e.map(x=>x.value):[])
      }
      const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
const handleClientLoad = () => {
  window.gapi.load("client:auth2", initClient);
};
const [events, setEvents] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);
const openSignInPopup = () => {
  localStorage.removeItem("access_token")
  window.gapi.auth2.authorize(
             { client_id: "52169325708-ujav1fof3lgebds8reurj0e74ua0tsgo.apps.googleusercontent.com", scope: SCOPES },
             (res) => {
               if (res) {
                 if (res.access_token)
                   localStorage.setItem("access_token", res.access_token);

                 // Load calendar events after authentication
                 window.gapi.client.load("calendar", "v3", listUpcomingEvents);
               }
             }
           );
}  


const initClient = () => {
  
  if(!localStorage.getItem("access_token")) {
    openSignInPopup();
  }
   else if (localStorage.getItem("access_token")) {
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
           localStorage.removeItem("access_token");

           openSignInPopup();
         }
       })
       .then((data) => {
         if (data?.items) {
           setEvents(formatEvents(data.items));
         }
       });
   }
 }
 const [form, setform] = useState({
  'summary':"",
  'project':"",
  'employee':"",
  'timeZone':"",
  'description':""
})
const handleChange = (e) => {
  const { name, value } = e.target;
  const newForm = form;
  newForm[name] = value;
  setform(newForm);
};
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const calendarID = 'primary'
const handleSubmit = (e)=>{
  e.preventDefault();
        // setIsSubmit(true);
        console.log(e);
        axios.post(HOST + ADD_TIMESHEET, {
          'projectId':form.project,
          'employeeId': localStorage.getItem('employeeId'),
          'date':(new Date(start)).toISOString(),
          'startTime':`${(new Date(start)).getHours()}:${(new Date(start)).getMinutes()}:00`,
          'endTime':`${(new Date(end)).getHours()}:${(new Date(end)).getMinutes()}:00`,
          'comments':form.description,
        }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          console.log(res);
          }).catch((err) => {
              console.log(err)
          })
}
let requestID = (new Date(start)).getTime()-(new Date()).getUTCMilliseconds()
const addEvent = () => {
  function initiate() {
    gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?conferenceDataVersion=1`,
        method: "POST",
        body: {
          'conferenceDataVersion': 1,
          'summary': `${form.summary}:${form.project}`,
          'description': form.description,
          'start': {
            'dateTime': start,
          },
          'end': {
            'dateTime': end,
          },
          'attendees': DisplayValue.map((email) => ({
            'email': email.trim(),
          })),
          "conferenceData": {
            "createRequest": {
                "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                },
                "requestId": makeid(20)
            }
        },
          'reminders': {
            'useDefault': true
          },
        },
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          
        },
      })
      .then(
        (response) => {
          return [true, response];
          console.log(response);
        },
        function (err) {
          console.log(err);
          return [false, err];
        }
      );
  }
  gapi.load("client", initiate);
};
const listUpcomingEvents = () => {
  window.gapi.client.calendar.events
    .list({
      // Fetch events from user's primary calendar
      calendarId: "primary",
      showDeleted: true,
      singleEvents: true,
      timeMax: "2024-09-29T10:00:00+05:30",
      timeMin:"2021-09-26T13:00:00+05:30"
    })
    .then(function (response) {
      let events = response.result.items;
      if (events.length > 0) {
        setEvents(formatEvents(events));
      }
    });
};
const callFunc=(e)=>{
  addEvent();
  handleSubmit(e);
}
const formatEvents = (list) => {
  console.log(list);
  return list.map((item) => ({
    title: item.summary,
    start: item.start.dateTime || item.start.date,
    end: item.end.dateTime || item.end.date,
    url: item.hangoutLink?item.hangoutLink:item.iCalUID,
  }));
  
};
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange1=(e)=>{
    if(form.timeZone) {
      let newValue = e.target.value+form.timeZone;
      setstart(newValue)
    }
  }
  const handleChange2=(e)=>{
    if(form.timeZone) {
      let newValue = e.target.value+form.timeZone;
      setend(newValue)
    }
  }
  // console.log(events);
return (
  <>
  <Button onClick={handleShow} style={{'marginTop':'1vh','textAlign':'center', 'backgroundColor':'lightgreen','marginBottom':'3vh'}} variant="contained" >Create Event</Button>
  <div style={{ 'width':'49vw',/*'height':'9vh','float':'right', */'backgroundColor':'lightblue'}}>
      <FullCalendar
      
        plugins={[dayGridPlugin,interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
                    left:"prev,next",
                    center:"title",
                    right:"today, dayGridDay, dayGridWeek, dayGridMonth"
                  }}
        eventClick = {((info)=> {
          var eventObj = info.event;
          
          if (eventObj.url) {
             alert(
              'Clicked ' + eventObj.title + '.\n' +
              'Start time ' + eventObj.start + '.\n' +
              'End time ' + eventObj.end + '.\n' +
              'Will open the meet in a new tab'
            );
    
            window.open(eventObj.url);
    
            info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
          }
          else {
           alert('Clicked ' + eventObj.title);
         }
        
           
        })}/></div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Control onChange={handleChange} name='summary' type="text" placeholder="Add Title*" />
      </Form.Group>

      <Form.Group className="mb-3">
        {/* <Form.Control name='project' type="text" placeholder="Summary" /> */}
        <Form.Select onChange={handleChange} name='project'>
          <option value="">Select Project</option>
        {projects.length!==0?projects.map((option) => (
          <option value={option.Project_ID}>
            {option.Project_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
      <Select isMulti onChange={doChange} options={attendees} name="employee" placeholder='Select Attendees'>Select Employees</Select>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Select onChange={handleChange} name='timeZone'>
        <option value="">Select TimeZone</option>
        {timezones.length!==0?timezones.map((option) => (
          <option value={option.value}>
            {option.label}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control name='start' type="datetime-local" onChange={handleChange1} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control name='end' type="datetime-local" onChange={handleChange2} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control name='description' type="test" placeholder="Description" onChange={handleChange} />
      </Form.Group>
      <Button onClick={callFunc} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
        
      </>
  );
  }
  export default TestDemo
// import React from 'react'
// import FullCalendar from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// import timeGridPlugin from "@fullcalendar/timegrid"

// export default class TestDemo extends React.Component {
//   render() {
//     return (
//       <FullCalendar
//         plugins={[ dayGridPlugin ]}
//         initialView="dayGridMonth"
//         // customButtons={{
//         //   myTimeDaybtn:{
//         //     text:"timeDay",
//         //     click(){
//         //       alert("Clicked")
//         //     }
//         //   }
//         // }}
//         headerToolbar={{
//           left:"prev,next",
//           center:"title",
//           right:"today, dayGridDay, dayGridWeek, dayGridMonth"
//         }}
//       />
//     )
//   }
// }