import React, { useState } from 'react'
import InputEmoji from 'react-input-emoji'
import './Announcements.css'
import url from '../../Images/url.svg'
import attachment from '../../Images/attachment.svg'
import ellipse from '../../Images/Ellipse.png'
import dots from '../../Images/3dots.svg'
import bg from '../../Images/annImage.png'
import like from '../../Images/like.svg'
import comment from '../../Images/comment.svg'


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
    <div style={{display:'flex', flexDirection:'row'}}>
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
        <button className='announceBtn'><div className='announceText'>Announce</div></button>
      </div>
      <div className='right-area'>
          <div className='rightHeading'>Announcements</div>
          <div className='announcementCont'>
            <div className='upperHalf'>
              <div className='details' style={{display:'flex', flexDirection:'row'}}>
                <img src={ellipse} height={48} width={48}/>
                <div style={{flexDirection:'column', marginLeft:'8px'}}>
                  <div className='annName'>Sagar Sehrawat</div>
                  <div className='annDesignation'>Software Engineer</div>
                  <div className='annTime'>10 m ago</div>
                </div>
                <div className='annAbout'><img src={dots} /></div>
              </div>
              <div className='annHeading'>Taskforce Beta Release 🥂</div>
              <div className='annBody'>The wait is over!! The Beta version of Taskforce is scheduled to happen on 25th of May, 2023.
                We are eagerly waiting for the release and waiting for your response! 🤞🏻
              </div>
            </div>
            <div className='imaging'><img width='100%' src={bg} /></div>
            <div className='lowerHalf'>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <img src={like} />
                  <div className='likeText'>Like</div>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginLeft:'3em'}}>
                  <img src={comment} />
                  <div className='likeText'>Comment</div>
                </div>
            </div>
          </div>
          <div className='announcementCont'>
            <div className='upperHalf'>
              <div className='details' style={{display:'flex', flexDirection:'row'}}>
                <img src={ellipse} height={48} width={48}/>
                <div style={{flexDirection:'column', marginLeft:'8px'}}>
                  <div className='annName'>Sagar Sehrawat</div>
                  <div className='annDesignation'>Software Engineer</div>
                  <div className='annTime'>10 m ago</div>
                </div>
                <div className='annAbout'><img src={dots} /></div>
              </div>
              <div className='annHeading'>Taskforce Beta Release 🥂</div>
              <div className='annBody'>The wait is over!! The Beta version of Taskforce is scheduled to happen on 25th of May, 2023.
                We are eagerly waiting for the release and waiting for your response! 🤞🏻
              </div>
            </div>
            <div className='imaging'><img width='100%' src={bg} /></div>
            <div className='lowerHalf'>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <img src={like} />
                  <div className='likeText'>Like</div>
                </div>
                <div style={{display:'flex', flexDirection:'row', marginLeft:'3em'}}>
                  <img src={comment} />
                  <div className='likeText'>Comment</div>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Announcements
