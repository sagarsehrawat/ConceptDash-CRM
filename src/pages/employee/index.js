import React from 'react'
import Employee from './tables/Employee'
const index = (props) => {
  return (
    <Employee isCollapsed={props.isCollapsed}/>
  )
}

export default index
