import React from 'react'
import Announcements from './tables/Announcements'
const index = (props) => {
  return (
    <Announcements isCollapsed={props.isCollapsed}/>
  )
}

export default index
