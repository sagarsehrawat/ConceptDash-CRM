import React from 'react'
import bgFrame from '../../Images/bgFrame.png'
import profile from '../../Images/profile.svg'
import './Profile.css'

function Profile(props) {
    const {isCollapsed} = props;
  return (
    <div>
        <div>
            <img height={160} width='100%' src={bgFrame} />
            <div className={isCollapsed?'profilePhotoC':'profilePhotoUC'}><img src={profile}/></div>
            <div className={isCollapsed?'profileTextC':'profileTextUC'}>My Profile</div>
        </div>
    </div>
  )
}

export default Profile
