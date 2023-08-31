import React,{useEffect} from 'react'
import './Wishes.css'
import bdaypicture from '../../../Images/Celebrations/Groupbdaypicture.svg'
import cdanniversary from '../../../Images/Celebrations/Company celebrationcdanniversary1.svg'
import Confetti from './Confetti'
import './Wishes.css'
const Wishes = (props) => {
    let name=localStorage.getItem('employeeName')
    let val="Happy "+props.val+" "+name.split(' ')[0]
    let content=""
    let pic=bdaypicture
    let piccss="bday-img"
    let c=0;
     if(props.val==="Birthday")
     content="On behalf of the entire Concept Dash family, Taskforce wanted to take a moment to extend our warmest birthday wishes to you on this special day! 🎉🎂"
     else if(props.val==="Work Anniversary")
     content="Today marks a remarkable milestone in your professional journey, as we come together to celebrate your YEAR work anniversary! Congratulations on your work anniversary! We want to thank you for your valuable contributions to Concept Dash. Happy celebrating! 🎉🎂"
     else if(new Date().getMonth()===2 && new Date().getDate()===1){
       content="Join us in celebrating a remarkable milestone! It's our work anniversary, and we're excited to reflect on the journey and accomplishments we've achieved together. Thank you for being an integral part of our success. Your dedication and hard work have helped shape our company's growth and impact. Cheers to another year of collaboration, innovation, and continued achievements. Happy work anniversary to our incredible team! 🎉🎂"
       val="Concept Dash Anniversary"
       c=1
       pic=cdanniversary
       piccss="cd-img"
}

  return (
      <div>
          {/* <Confetti /> */}
         <div className='main'>
         <Confetti /> 
          <div className='wishes-content'>
          <div className='heading-main'>{val} !</div>
         <div className='para'>{content}</div>
          <img src={pic} className={piccss} alt=""/>
        { c===0 && <div className='foot'>Here’s your virtual {props.val} cake 😁</div>}
     </div>
     </div>
    </div>

  )
}

export default Wishes