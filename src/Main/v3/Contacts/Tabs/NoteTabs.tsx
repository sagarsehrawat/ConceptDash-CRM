import React from 'react'
import TFTabGroup from '../../../../components/ui/TFTabGroup/TFTabGroup'
type Props = {
    selectedTab: string | number;
    setselectedTab: Function;
}

const NoteTabs = ({selectedTab, setselectedTab} : Props) => {
    const tabs = [
        {
            label: "Project",
            value: "Project",
        },
        {
            label: "General",
            value: "General",
        }
    ]
    
  return (
    <>
    <div style={{margin: "26px 32px 32px 18px", fontSize:"15px"}}>
        <TFTabGroup
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={(value) => setselectedTab(value)}
            />
        </div>
    </>
  )
}

export default NoteTabs