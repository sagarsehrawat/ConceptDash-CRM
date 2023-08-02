import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {  GET_PAGE_EMPLOYEES, HOST} from '../Constants/Constants';
// import celebrationActive from "../../Images/Celebrations_Active.svg";
// import celebrationInactive from "../../Images/Celebrations.svg";
import cross from "../../Images/cross.svg";
import './Celebrations.css';
import bdaydefault from '../../Images/Celebrations/bdaydefault.svg'
import anniversarydefault from '../../Images/Celebrations/anniversarydefault.svg'
import cddefault from '../../Images/Celebrations/cdanniversary.svg'
import LoadingSpinner from '../Loader/Loader';
import Events from 'material-ui/utils/events';
import { OilBarrelSharp } from '@mui/icons-material';
export default function Celebrations(props){
     
    const [data,setData] = useState()
    const [sort, setsort] = useState([]);
    const [returnData, setreturnData] = useState({});
    const [isloading,setisloading]=useState(true);

    const [today,settoday] = useState([]);
    const [upcoming, setupcoming] = useState([]);

    function differenceindates(a){
      if(a==null) return null;
      let tday=new Date()
      let bday=a;
      bday.setFullYear(tday.getFullYear());
      if (tday > bday)
      bday.setFullYear(tday.getFullYear() + 1);
     let diff= Math.floor((bday - tday) / (1000*60*60*24)) 
    return diff
    }
  const clearallcele = ()=>{
       settoday([]);
       setupcoming([]);
  }
 
    useEffect(() => {
      const call = async () => {
       await axios
          .get(HOST + GET_PAGE_EMPLOYEES, {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
              filter: JSON.stringify(returnData),
              sort: sort,
            },
          })
          .then((res) => {
                  let empdata={}      
                  empdata=res.data.res.map((each)=>{
                         let ele={}
                        ele.name=each.First_Name;
                        ele.Birthday=each.Birthday ? new Date(each.Birthday) : null
                        ele.JoiningDate=each.Joining_Date ? new Date(each.Joining_Date) : null
                         return ele
                  })
                  setData(empdata)
                  console.log(empdata)
                  let todaysevents=empdata?.map((each)=>{
                      let obj={};
                      obj.name=each.name;
                      if(each.JoiningDate!==null && each.JoiningDate.getMonth()===new Date().getMonth() &&each.JoiningDate.getDate()===new Date().getDate()){
                      obj.msg=" is celebrating work anniversary today.";
                      obj.pic= anniversarydefault
                      }
                     else if(each.Birthday!==null && each.Birthday.getMonth()===new Date().getMonth() &&each.Birthday.getDate()===new Date().getDate()){
                      obj.pic=bdaydefault 
                       obj.msg=" is celebrating birthday today."
                     }
                         else obj.msg=null
                     return obj;
                  })      
                 let obj
                  let upcomingevents=empdata.map((each)=>{
                       obj={}
                      obj.name=each.name;
                      obj.Birthday=each.Birthday;
                      obj.bday=each.Birthday ? differenceindates(each.Birthday) : null;
                      obj.anni=each.JoiningDate? differenceindates(each.JoiningDate) : null;
                       return obj
                   })
                   upcomingevents=upcomingevents.filter((each)=> (each.bday && each.bday<=30) || (each.anni &&each.anni<=30))
                   upcomingevents=upcomingevents?.map((each)=>{
                       obj={}
                       obj.name=each.name
                       if((each.bday>25 && each.bday<=30) && each.anni>25 && each.bday<=30){
                           obj.pic=bdaydefault
                          obj.msg=" is celebrating birthday and work anniversary in a month."
                       }
                       else if(each.bday>25 && each.bday<=30){
                        obj.pic=bdaydefault
                       obj.msg=" is celebrating birthday in a month.";
                       }
                      else if(each.bday<25) {
                        obj.pic=bdaydefault
                       obj.msg=" is celebrating birthday in "+each.bday+" days.";
                      }
                      else  if(each.anni>25 && each.bday<=30) {
                        obj.pic=anniversarydefault
                       obj.msg=" is celebrating work anniversary in a days.";
                      }
                       else if(each.anni<25){
                        obj.pic=anniversarydefault
                       obj.msg=" is celebrating work anniversary in "+each.anni+" days.";
                       }
                       return obj;
                       
                   })
                   if(new Date().getMonth()===1 && new Date().getDate()===1)
                     upcomingevents.push({
                        name: "Concept Dash",
                        msg:" is celebrating anniversary in a  month",
                        pic: cddefault
                     })
                     else if(new Date().getMonth()===1)
                     {
                        upcomingevents.push({
                          name: "Concept Dash",
                          msg :"is celebrating  anniversary in "+(28-new Date().getDate())+" days",
                          pic: cddefault
                        })  
                     }
                   console.log(upcomingevents) 
                   setupcoming(upcomingevents)
                   todaysevents = todaysevents?.filter((each)=> each.msg!==null)
                   if(new Date().getDate()===1 && new Date().getMonth()===2)
                     todaysevents.push({
                        name: "Concept Dash",
                        msg:" is celebrating anniversary today.",
                        pic:cddefault
                     })
                   settoday(todaysevents)
                  setisloading(false)
          }).catch((err) => {
            console.log("error"+err);
          });
        }
        call();
          },[])
          return(
            isloading?
            <div style={{height:'90vh', paddingTop:'-500px', marginLeft:'-300px'}}>
            <LoadingSpinner/>
        </div>
        :
            <div style={{height:'90vh', overflowY:'auto'}}>
            <div className='d-flex flex-row justify-content-between align-items-center header'>
                <div className='heading'>Celebrations</div>
                <div className='clearButton' onClick={clearallcele}>Clear All</div>
            </div>
            { today.length===0 && upcoming.length===0?<div style={{marginLeft:'100px', fontSize:'2rem'}}>No Celebrations</div>:<></>}
            <div className='today'>
              {today && today.length>0 && <div className='heading sub-heading'>Today</div>}
            {today && today.length>0 && today.map((e)=>{
                return (
                    <div className='todays-content' >
                      <img
                            src={e.pic}
                            style={{ width: "56px", height: "56px", marginRight:'10px' }}
                            alt="Employee"
                        />
                        <div className='content' style={{flexDirection:'column'}}>
                            <div className='message'><b>{e.name}</b>{e.msg}</div>
                            {new Date().getHours()!==0 && <div className='time'>{new Date().getHours()} hours ago</div>}
                        </div>
                         <img style={{cursor:'pointer'}} src={cross} onClick={()=>settoday(today.filter((each)=>each!==e))} alt=""/>
                    </div>
                )
            })}
        </div>
        <div className='upcoming'>
        {upcoming && upcoming.length>0 && <div className='heading sub-heading'>Upcoming</div>}
            {upcoming && upcoming.length>0 && upcoming.map((e)=>{
                return (
                    <div className='card-main'>
                     <img
                     src={e.pic}
                     style={{ width: "56px", height: "56px", marginRight:'10px' }}
                     alt="Employee"
                      />
                        <div className='content' style={{flexDirection:'column'}}>
                            <div className='message'><b>{e.name}</b> {e.msg}</div>
                             <div className='time'>{e.msg.slice(e.msg.indexOf("in "))}</div> 
                        </div>
                        <img style={{cursor:'pointer'}} src={cross} alt="" onClick={()=>setupcoming(upcoming.filter((each)=>each!==e))} /> 
                    </div>
                )
            })}
        </div>
            </div>
          )

}