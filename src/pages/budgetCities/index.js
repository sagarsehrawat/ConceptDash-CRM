import React from 'react'
import BudgetCities from './tables/BudgetCities'
const index = (props) => {
  return (
    <BudgetCities isCollapsed={props.isCollapsed}/>
  )
}

export default index
