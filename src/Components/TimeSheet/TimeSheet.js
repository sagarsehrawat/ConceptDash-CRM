import {React, useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function TimeSheet() {
    const [timesheet, settimesheet] = useState([])
    const [event2, setevent2] = useState([]) 
    
    useEffect(() => {
        const call = async () => {
            await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/timesheet',{headers:{'auth':'Rose '+ localStorage.getItem('auth'),'id':localStorage.getItem('employeeId')}}).then(async (res) => {
                // settimesheet(res.data.res)
                // console.log(res.data);
                // console.log(res.data.res[0].Date)
                // console.log(`${res.data.res[0].Date.substring(0,11)}${res.data.res[0].Start_Time.substring(0,5)}+05:30`);
                // console.log(res.data.res[0].Date)
                setevent2(formatEvents(res.data.res))
            }).catch((err) => {
              console.log(err)
            })
        }
        call()
      },[]);
      const formatEvents = (list) => {
        let arr = []
        list.map((item) => {

          arr.push({
          title: `${item.Comments}:${item.Project_Name}`,
          start: `${item.Date.substring(0,11)}${item.Start_Time.substring(0,5)}+05:30`,
          end: `${item.Date.substring(0,11)}${item.End_Time.substring(0,5)}+05:30`,
        })
      });
        
        return arr;
      };
    
      console.log(event2)
    const navigate = useNavigate();
    
  return (
    <div>
        <Button onClick={(e) => {navigate("/addtimesheet")}}style={{'marginLeft':'40%', 'marginBottom':'2vh'}}>Add to TimeSheet</Button>
        <FullCalendar
        plugins={[ dayGridPlugin,interactionPlugin ]}
        initialView="dayGridMonth"
        events={event2}
        headerToolbar={{
            left:"prev,next",
            center:"title",
            right:"today, dayGridDay, dayGridWeek, dayGridMonth"
          }}
          eventClick = {((info)=> {
            var eventObj = info.event;
            
            alert(
                'Clicked ' + eventObj.title + '.\n' +
              'Start time ' + eventObj.start + '.\n' +
              'End time ' + eventObj.end + '.\n'
            )
          })}
      />
    </div>
  )
}

export default TimeSheet