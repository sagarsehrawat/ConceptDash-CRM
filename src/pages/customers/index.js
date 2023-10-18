import React from 'react'
import Customers from './tables/Customers'
const index = (props) => {
  return (
    <Customers isCollapsed={props.isCollapsed}/>
  )
}

export default index
