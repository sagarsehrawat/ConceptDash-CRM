import React from 'react'
import './TFTabGroup.css'
import TFTab from '../TFTab/TFTab'

type Props = {
  tabs?: { label: string, value: string | number, icon?: string, focusedIcon?: string }[],
  selectedTab: string | number,
  onTabChange: Function
}

const TFTabGroup = ({ tabs, selectedTab, onTabChange }: Props) => {
  return (
    <>
      <div className='tf-tab-group'>
        {
          tabs && tabs.map((tab) => (
            <TFTab
              label={tab.label}
              icon={tab.icon}
              focusedIcon={tab.focusedIcon}
              isSelected={tab.value === selectedTab}
              onClick={onTabChange}
              value={tab.value}
            />
          ))
      }
      </div>
    </>
  )
}

export default TFTabGroup