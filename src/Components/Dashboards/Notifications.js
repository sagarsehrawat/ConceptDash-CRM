import React, { useState } from 'react'
import { useEffect } from 'react';
import { DELETE_NOTIFICATIONS, GET_NOTIFICATIONS, HOST } from '../Constants/Constants';
import './Notifications.css'
import axios from 'axios';
import ellipse from "../../Images/Ellipse.png";
import LoadingSpinner from '../Loader/Loader';
import cross from "../../Images/cross.svg";

function Notifications(props) {
    const {setnav} = props;
    const [today, settoday] = useState([]);
    const [yesterday, setyesterday] = useState([]);
    const [older, setolder] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [call, setcall] = useState(1);
    let all = []
    useEffect(() => {
        setisLoading(true);
        axios
          .get(HOST + GET_NOTIFICATIONS, {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
              id: localStorage.getItem("employeeId"),
            },
          })
          .then((res) => {
            let arr = res.data.res.Items;
            let aaj = [];
            let kal = [];
            let purane = [];
            for(let i=0;i<arr.length;i++) {
                if((new Date(arr[i].timestamp)).getDate()===(new Date()).getDate()) {
                    aaj.push(arr[i]);
                } else if((new Date(arr[i].timestamp)).getDate()===(new Date()).getDate()-1) {
                    kal.push(arr[i]);
                } else {
                    purane.push(arr[i]);
                }
            }
            settoday(aaj);
            setyesterday(kal);
            setolder(purane)
            setisLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [call]);
      {today.length>0 && today.map((e)=>{
        all.push(e.notification_id)
      })}
      {yesterday.length>0 && yesterday.map((e)=>{
        all.push(e.notification_id)
      })}
      {older.length>0 && older.map((e)=>{
        all.push(e.notification_id)
      })}
      function getTimeDifference(pastDateTime) {
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - (new Date(pastDateTime)).getTime();
      
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      
        if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hr${hours > 1 ? 's' : ''} ago`;
        } else {
          return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        }
      }
      const handleNotifClick = (e) =>{
        console.log(e)
        if(e==='Task') {
            setnav(2);
        }
        if(e==='Project Manager Project') {
            setnav(6);
        }
        if(e==='Project Manager RFP' || e==='Add RFP') {
            setnav(4);
        }

      }
      console.log(all)
      const deleteAllNotifications = async (e) =>{
        setisLoading(true);
        await axios
            .post(
                HOST + DELETE_NOTIFICATIONS,
                {
                    notifications: all,
                    id: localStorage.getItem('employeeId')
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                console.log(res)
                setcall(call+1);
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
      }
      const deleteOneNotification = async (e, time) =>{
        setisLoading(true);
        console.log(e, time)
        let arr = [];
        arr.push(e)
        await axios
            .post(
                HOST + DELETE_NOTIFICATIONS,
                {
                    notifications: arr,
                    id: localStorage.getItem('employeeId')
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                console.log(res)
                setcall(call+1);
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
      }
  return (
    isLoading?
    <div style={{height:'90vh', paddingTop:'-500px', marginLeft:'-300px'}}>
        <LoadingSpinner/>
    </div>
    :
    <div style={{height:'90vh', overflowY:'auto'}}>
        <div className='d-flex flex-row justify-content-between align-items-center header'>
            <div className='heading'>Notifications</div>
            <div onClick={deleteAllNotifications} className='clearButton'>Clear All</div>
        </div>
        {today.length==0 && yesterday.length===0 && older.length==0?<div style={{marginLeft:'100px', fontSize:'2rem'}}>No Notifcations</div>:<></>}
        <div className='today'>
        {today.length>0 && <div className='heading sub-heading'>Today</div>}
            {today.length>0 && today.map((e)=>{
                return (
                    <div className='card-main' >
                        <img
                            src={ellipse}
                            style={{ width: "56px", height: "56px", marginRight:'19px' }}
                            alt="Employee"
                        />
                        <div onClick={(eve) => handleNotifClick(e.type)} className='content' style={{flexDirection:'column'}}>
                            <div className='message'>{e.message}</div>
                            <div className='time'>{getTimeDifference(e.timestamp)}</div>
                        </div>
                        <img style={{marginBottom:'25px', marginLeft:'5px', cursor:'pointer'}} src={cross} onClick={()=>deleteOneNotification(e.notification_id, 'today')} />
                    </div>
                )
            })}
        </div>
        <div className='yesterday'>
        {yesterday.length>0 && <div className='heading sub-heading'>Yesterday</div>}
            {yesterday.length>0 && yesterday.map((e)=>{
                return (
                    <div className='card-main'>
                        <img
                            src={ellipse}
                            style={{ width: "56px", height: "56px", marginRight:'19px' }}
                            alt="Employee"
                        />
                        <div className='content' style={{flexDirection:'column'}}>
                            <div className='message'>{e.message}</div>
                            <div className='time'>{getTimeDifference(e.timestamp)}</div>
                        </div>
                        <img style={{marginBottom:'25px', marginLeft:'5px', cursor:'pointer'}} src={cross} onClick={()=>deleteOneNotification(e.notification_id, 'yesterday')} />
                    </div>
                )
            })}
        </div>
        <div className='older'>
        {older.length>0 && <div className='heading sub-heading'>Older Notifications</div>}
            {older.length>0 && older.map((e)=>{
                return (
                    <div className='card-main'>
                        <img
                            src={ellipse}
                            style={{ width: "56px", height: "56px", marginRight:'19px' }}
                            alt="Employee"
                        />
                        <div className='content' style={{flexDirection:'column'}}>
                            <div className='message'>{e.message}</div>
                            <div className='time'>{getTimeDifference(e.timestamp)}</div>
                        </div>
                        <img style={{marginBottom:'25px', marginLeft:'5px', cursor:'pointer'}} src={cross} onClick={()=>deleteOneNotification(e.notification_id, 'older')} />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Notifications
