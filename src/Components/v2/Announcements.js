import React, { useState } from 'react'
import InputEmoji from 'react-input-emoji'
import './Announcements.css'
import url from '../../Images/url.svg'
import attachment from '../../Images/attachment.svg'


function Announcements(props) {
  const {isCollapsed} = props;
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [urlText, seturlText] = useState("");

  function handleOnEnter(title) {
    settitle(title)
  }
  function handleBodyChange(e) {
    setbody(e.target.value)
  }
  function handleURLChange(e) {
    seturlText(e.target.value)
  }
  return (
    <div>
      <div className='left-area'>
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
        <div className='formLabel-2'>Add Attachments<img style={{marginLeft:'6px', marginBottom:'3px'}} src={attachment} /></div>
        <div className='attachmentText'>Upload documents, images or pdf (<b>Max 40mb</b>)</div>
        <div className="input-container">
          <input
          style={{marginTop:'4px'}}
            // className='urlInput'
            placeholder='Add Link'
            value={urlText}
            type='file'
            onChange={handleURLChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Announcements
