import axios from 'axios';
import React, { useEffect, useState } from 'react'
import bgFrame from '../../../Images/bgFrame.png'
import profile from '../../../Images/profile.svg'
import dp from '../../../Images/noprofile.jpeg'
import edit from '../../../Images/edit.svg'
import { EMPLOYEE_DETAILS, HOST, UPDATE_EMPLOYEE_PROFILE } from '../../../Main/Constants/Constants';
import LoadingSpinner from '../../../Main/Loader/Loader';
import './Profile.css'
import moment from 'moment';
import { Button } from 'react-bootstrap';

function Profile(props) {
    const {isCollapsed} = props;
    const [isLoading, setisLoading] = useState(false);
    const [details, setdetails] = useState([]);
    const [editProfile, seteditProfile] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bday, setbday] = useState('');
    const [pEmail, setpEmail] = useState('');
    const [mobile, setmobile] = useState('');
    const [address, setaddress] = useState('');
    const [country, setcountry] = useState('');
    const [call, setcall] = useState(1);
    useEffect(() => {
        setisLoading(true);
        seteditProfile(false)
        axios
          .get(HOST + EMPLOYEE_DETAILS, {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
              id: localStorage.getItem("employeeId"),
            },
          })
          .then((res) => {
            let arr = res.data.res
            setdetails(arr);
            console.log(arr)
            setFirstName(res.data.res[0].First_Name?res.data.res[0].First_Name:'')
            setLastName(res.data.res[0].Last_Name?res.data.res[0].Last_Name:'')
            setbday(res.data.res[0].Birthday?res.data.res[0].Birthday.substring(0, 10):'')
            setpEmail(res.data.res[0].Email_Personal?res.data.res[0].Email_Personal:'')
            setmobile(res.data.res[0].Mobile_Phone?res.data.res[0].Mobile_Phone:'')
            setaddress(res.data.res[0].Address?res.data.res[0].Address:'')
            setcountry(res.data.res[0].Country?res.data.res[0].Country:'')
            setisLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [call]);
      const formatDate = (date) => {
        // console.log(date)
        if (date === "" || date === null || date === undefined) return "";
        const formattedDate = moment(date)
        return formattedDate.format('D MMM, YYYY')
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        if(name==='fName') {
            setFirstName(value);
        }
        if(name==='lName') {
            setLastName(value);
        }
        if(name==='bDay') {
            setbday(value);
            console.log(value)
        }
        if(name==='pEmail') {
            setpEmail(value);
        }
        if(name==='phone') {
            setmobile(value);
        }
        if(name==='address') {
            setaddress(value);
        }
        if(name==='country') {
            setcountry(value);
        }
    }
    const [submitLoading, setsubmitLoading] = useState(false);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setsubmitLoading(true);
        await axios
            .post(
                HOST + UPDATE_EMPLOYEE_PROFILE,
                {
                    id: localStorage.getItem('employeeId'),
                    firstName: firstName,
                    lastName: lastName,
                    emailPersonal: pEmail,
                    mobile: mobile,
                    address: address,
                    country: country,
                    birthday: bday,
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                console.log(res)
                if(res.data.success) {
                    setsubmitLoading(false)
                    setcall(call+1);
                }
                seteditProfile(false);
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });

    }
  return (
    isLoading?<LoadingSpinner />:
    <div>
        <div>
            <img height={160} width='100%' src={bgFrame} />
            <div className={isCollapsed?'profilePhotoC':'profilePhotoUC'}><img style={{border: '4px solid white', borderRadius:'100%'}} width={180} src={dp}/></div>
            {editProfile?<div>
                <div className={isCollapsed?'profileTextCedit':'profileTextUCedit'}>My Profile</div>
                <div className={isCollapsed?'editTextC':'editTextUC'}>Update your photo and personal details here</div>
            </div>:
            <div className={isCollapsed?'profileTextC':'profileTextUC'}>My Profile</div>
            }
            {!editProfile?<><button className='btn-1'>Change Password</button>
            <button className='btn-2' onClick={()=>seteditProfile(true)}><img src={edit}/>Edit Profile</button>
            <div className='headerDetails'>
                <div className='name'>{details.length>0?details[0].First_Name:''} {details.length>0?details[0].Last_Name:''}</div>
                <div className='job'>{details.length>0?details[0].Title:''}</div>
                <div className='email'>{details.length>0?details[0].Email_Work:''}</div>
            </div>
            <div className='main-area'>
                <div className='area-header'>Personal Information</div>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{width:'27%', flexDirection:'column'}}>
                        <div className='detailHeading'>Birthday</div>
                        <div className='result'>{details.length>0?formatDate(details[0].Birthday):''}</div>
                        <div className='area-header'>Address</div>
                        <div className='detailHeading'>Country</div>
                        <div className='result'>{details.length>0?details[0].Country:''}</div>
                    </div>
                    <div style={{width:'27%', flexDirection:'column'}}>
                        <div className='detailHeading'>Personal E-mail</div>
                        <div className='result'>{details.length>0?details[0].Email_Personal:''}</div>
                        <div className='additional'>Address</div>
                        <div className='result'>{details.length>0?details[0].Address:''}</div>
                    </div>
                    <div style={{width:'27%', flexDirection:'column'}}>
                        <div className='detailHeading'>Phone Number</div>
                        <div className='result'>{details.length>0?details[0].Mobile_Phone:''}</div>
                    </div>
                </div>
            </div></>:
            <div className='form-area'>
                <div>
                    <div className='label'>First Name</div>
                    <input className='input' value={firstName} name='fName' onChange={handleChange} />
                </div>
                <div style={{marginTop:'12px'}}>
                    <div className='label'>Last Name</div>
                    <input className='input' value={lastName} name='lName' onChange={handleChange} />
                </div>
                <div style={{border:'1px solid #EBE9F1', marginTop:'20px', marginBottom:'20px', width:'36em'}}></div>
                <div className='form-heading'>Personal Information</div>
                <div>
                    <div className='label'>Birthday</div>
                    <input className='inputP' type='date' value={bday} name='bDay' onChange={handleChange} />
                </div>
                <div style={{marginTop:'12px'}}>
                    <div className='label'>Personal Email</div>
                    <input className='inputPE' value={pEmail} name='pEmail' onChange={handleChange} />
                </div>
                <div style={{marginTop:'12px'}}>
                    <div className='label'>Phone Number</div>
                    <input className='inputPE' value={mobile} name='phone' onChange={handleChange} />
                </div>
                <div style={{border:'1px solid #EBE9F1', marginTop:'20px', marginBottom:'20px', width:'36em'}}></div>
                <div className='form-heading'>Address</div>
                <div>
                    <div className='label'>Address</div>
                    <input className='inputP' value={address} name='address' onChange={handleChange} />
                </div>
                <div style={{marginTop:'12px'}}>
                    <div className='label'>Country</div>
                    <input className='inputP' value={country} name='country' onChange={handleChange} />
                </div>
                <button className='btn-3' onClick={()=>seteditProfile(false)}>Cancel</button>
                <button className='btn-4' disabled={submitLoading} onClick={handleSubmit}>Save</button>
            </div>
            }
        </div>
    </div>
  )
}

export default Profile
