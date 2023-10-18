import React from 'react'
import ProjectsTable from './tables/ProjectsTable'

const index = (props) => {
  return (
    <ProjectsTable isCollapsed={props.isCollapsed}/>
  )
}

export default index
