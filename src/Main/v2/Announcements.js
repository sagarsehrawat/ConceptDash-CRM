import React, { useState, useEffect } from 'react'
import InputEmoji from 'react-input-emoji'
import './Announcements.css'
import url from '../../Images/url.svg'
import attachment from '../../Images/attachment.svg'
import ellipse from '../../Images/Ellipse.png'
import dots from '../../Images/3dots.svg'
import bg from '../../Images/annImage.png'
import likeicon from '../../Images/like.svg'
import unlike from '../../Images/unlike.svg'
import comment from '../../Images/comment.svg'
import { HOST, ADD_ANNOUNCEMENT, GET_ANNOUNCEMENT, LIKE_ANNOUNCEMENT } from '../Constants/Constants'
import axios from 'axios'
import LoadingSpinner from '../Loader/Loader'


function Announcements(props) {
  const {isCollapsed} = props;
  const [title, settitle] = useState("");
  const [call, setcall] = useState(1);
  const [body, setbody] = useState("");
  const [urlText, seturlText] = useState("");
  const [form, setform] = useState({image:[]});
  const [isLoading, setisLoading] = useState(false)
  function handleOnEnter(title) {
    settitle(title)
  }
  function handleBodyChange(e) {
    setbody(e.target.value)
  }
  function handleURLChange(e) {
    seturlText(e.target.value)
  }
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const [imageData, setImageData] = useState('');
  const [annData, setannData] = useState('')
  useEffect(() => {
    setisLoading(true);
    axios
      .get(HOST + GET_ANNOUNCEMENT, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
        },
      })
      .then((res) => {
        setannData(res.data.res);
        // const string = btoa(String.fromCharCode(...new Uint8Array(res.data.res[0].image.data)))
        console.log(res.data.res[0])
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [call]);
  const handleLike=(e, u)=>{
    setisLoading(true);
    // console.log(e)
    // e.preventDefault();
    axios
      .post(HOST + LIKE_ANNOUNCEMENT,{
        userId: localStorage.getItem('emailWork'),
        id: e,
        timestamp: u
      },
         {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
        },
      })
      .then((res) => {
        console.log(res.data)
        setcall(call+1)
      })
      .catch((err) => {
        console.log(err);
      });
      setisLoading(false);
  }
  const imagePath = '../../Images/annImage.png';
  
  const [show, setshow] = useState(false);
  const handleSubmit = async(e) => {
    setisLoading(true);
    const response =  await fetch(imagePath);
    const blob =  await response.blob();
    e.preventDefault();
    // setIsSubmit(true);
    const formData = new FormData();
    formData.append('addedBy', localStorage.getItem('employeeName'));
    formData.append('title', title);
    formData.append('body', body);
    formData.append('url', urlText);
    formData.append('image', selectedImage?selectedImage:blob);
    axios
      .post(HOST + ADD_ANNOUNCEMENT, formData, {
        maxContentLength: 10 * 1024 * 1024, // 100MB
        maxBodyLength: 10 * 1024 * 1024, // 100MB
        headers: {
          'Content-Type': 'multipart/form-data',
          auth: 'Rose ' + localStorage.getItem('auth'),
          'Accept': 'application/json',
        },
        timeout: 1800000,
      })
      .then((res) => {
        console.log(res.data)
        if(res.data.success===true) {
          setcall(call+1);
        }
        settitle('')
        setbody('')
        seturlText('')
        setisLoading(false);
        
      })
      .catch((err) => {
        console.log(err);
        // setRed(true);
      });
  };
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
  function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }
  return (
    isLoading?<LoadingSpinner/>:
    <div style={{display:'flex', flexDirection:'row'}}>
      {localStorage.getItem('department')==='Admin'?<div className='left-area'>
      
        <div className='formHeading'>Make New Announcement</div>
        <div className='formLabel-1'>Title<span style={{color:'red'}}>*</span></div>
        <div className="input-container">
          <InputEmoji
            borderRadius='6px'
            className="custom-emoji-input"
            placeholder=''
            value={title}
            onChange={handleOnEnter}
          />
        </div>
        <div className='formLabel-2'>Body<span style={{color:'red'}}>*</span></div>
        <div className="input-container">
          <textarea
            rows={10}
            borderRadius='6px'
            className="bodyInput"
            placeholder=''
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        <div className='formHeading-2'>Additional Info</div>
        <div className='formLabel-2'>URL<img style={{marginLeft:'6px', marginBottom:'3px'}} src={url} /></div>
        <div className="input-container">
          <input
            className='urlInput'
            placeholder='Add Link'
            value={urlText}
            type='url'
            onChange={handleURLChange}
          />
        </div>
        {/* <div className='formLabel-2'>Add Attachments<img style={{marginLeft:'6px', marginBottom:'3px'}} src={attachment} /></div>
        <div className='attachmentText'>Upload documents, images or pdf (<b>Max 40mb</b>)</div>
        <div className="input-container">
          <input
          style={{marginTop:'4px'}}
            // className='urlInput'
            // placeholder='Add Link'
            // value={urlText}
            type='file'
            name='image'
            onChange={handleChange}
          />
        </div> */}
        <button className='announceBtn' onClick={handleSubmit} disabled={title.length===0 || body.length===0}><div className='announceText'>Announce</div></button>
      </div>:<></>}
      <div className='right-area'>
          <div className='rightHeading'>Announcements</div>
          {annData?annData.map((e)=>{
            // const base64String = Buffer.from(e.image.data).toString('base64');
            const typedArray = new Uint8Array(e.image.data);
  const blob = new Blob([typedArray], { type: 'image/png' });
  const imageUrl = URL.createObjectURL(blob);
            return(
              <div className='announcementCont'>
              <div className='upperHalf'>
                <div className='details' style={{display:'flex', flexDirection:'row'}}>
                  <img src={ellipse} height={48} width={48}/>
                  <div style={{flexDirection:'column', marginLeft:'8px'}}>
                    <div className='annName'>{e.addedBy}</div>
                    {/* <div className='annDesignation'>{localStorage.getItem('employeeName')==='Sagar Sehrawat'?'Leader':'Slave'}</div> */}
                    <div className='annTime'>{getTimeDifference(e.timestamp)}</div>
                  </div>
                  {/* <div className='annAbout'><img src={dots} /></div> */}
                </div>
                <div className='annHeading'>{e.title}</div>
                <div className='annBody'>{e.body}<br/><a href={e.url?e.url:'#'} target='_blank'>{e.url?e.url:''}</a>
                </div>
              </div>
              <div className='imaging'><img width='100%' src={bg} /></div>
              <div className='lowerHalf'>
                  <div style={{display:'flex', flexDirection:'row'}}>
                    {e.likes.includes(localStorage.getItem('emailWork'))?<img style={{cursor:'pointer'}} src={likeicon} />:<img style={{cursor:'pointer'}} onClick={()=>{handleLike(e.announcementId, e.timestamp)}} src={unlike} />}
                    
                    <div className='likeText'>Like</div>
                  </div>
                  {/* <div style={{display:'flex', flexDirection:'row', marginLeft:'3em'}}>
                    <img src={comment} />
                    <div className='likeText'>Comment</div>
                  </div> */}
              </div>
            </div>
            )
          }):<></>}
          
          
      </div>
      {/* {imageData && (
        <img src={imageData} alt="Image" />
      )} */}
    </div>
  )
}

export default Announcements
