import React from 'react'
import ProjectsTable from './table/ProjectsTable'

const index = (props) => {
  return (
    <ProjectsTable isCollapsed={props.isCollapsed}/>
  )
}

export default index