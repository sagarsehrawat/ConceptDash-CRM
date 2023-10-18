import React from 'react'
import Tasks from './tables/Tasks'
const index = (props) => {
  return (
    <Tasks isCollapsed={props.isCollapsed}/>
  )
}

export default index
