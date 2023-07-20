import React, { useState } from 'react'
import AllCampaign from './AllCampaign'
import Campaign from './Campaign'
import DetailedCampaign from './DetailedCampaign'

export default function CampaignRoot({ isCollapsed }) {
    const [page,setPage] = useState("all_campaign")
    // const [page,setPage] = useState(34)
    if(page === "all_campaign")return <AllCampaign setPage={setPage} isCollapsed={isCollapsed} />
    if(page === "create_campaign")return <Campaign setPage={setPage} isCollapsed={isCollapsed} />
  return <DetailedCampaign setPage={setPage} page={page} />
}
