import React from 'react'
import TFTabGroup from '../../../../components/ui/TFTabGroup/TFTabGroup'
import Peopleicon from '../icons/people_black_24dp (2) 1.svg'
type Props = {
    variant: string
    selectedTab: string | number;
    setselectedTab: Function;
}

const Tabs = ({variant,selectedTab, setselectedTab} : Props) => {
    const tabs = [
        {
            label: variant=='org' ? "Organizations": "People",
            value: variant=='org' ? "Organizations" : "People",
            focusedIcon: Peopleicon
        },
        {
            label: "Clients",
            value: "Clients",
            focusedIcon: Peopleicon
        },
        {
            label: "Consultants",
            value: "Consultants",
            focusedIcon: Peopleicon
        },
        {
            label: "Partners",
            value: "Partners",
            focusedIcon: Peopleicon
        },
        {
            label: "SubConsultants",
            value: "SubConsultants",
            focusedIcon: Peopleicon
        },
    ]
    
  return (
    <>
    <div style={{margin: "26px 32px 32px 18px"}}>
        <TFTabGroup
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={(value) => setselectedTab(value)}
            />
        </div>
    </>
  )
}

export default Tabs