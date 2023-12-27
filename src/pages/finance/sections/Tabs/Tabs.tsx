import React from 'react'
import TFTabGroup from '../../../../components/ui/TFTabGroup/TFTabGroup'
import ICONS from '../../../../constants/Icons';

type Props = {
    variant: "AP" | "AR";
    selectedTab: string | number;
    setselectedTab: Function;
}

const Tabs = ({variant, selectedTab, setselectedTab} : Props) => {
    const tabs = [
        {
            label: "Projects",
            value: "Projects",
            focusedIcon: ICONS.CLIPBOARD_PRIMARY
        },
        {
            label: "All Invoices",
            value: "All Invoices",
            focusedIcon: ICONS.FINANCE_PRIMARY
        },
        {
            label: variant === "AR" ? "Recieved" : "Paid",
            value: variant === "AR" ? "Recieved Invoices" : "Paid Invoices",
            focusedIcon: ICONS.DONE_PRIMARY
        },
        {
            label: "Pending",
            value: "Pedning Invoices",
            focusedIcon: ICONS.CLOCK_PRIMARY
        },
        {
            label: "Overdue",
            value: "Overdue Invoices",
            focusedIcon: ICONS.WARNING_PRIMARY
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