import React, { useState, useEffect } from "react";
import Campaign from "./Campaign";
import SendCampaignForm from "./SendCampaignForm";
import ChooseTemplate from "./ChooseTemplate";
import AllCampaign from "./AllCampaign";
import DetailedCampaign from "./DetailedCampaign";

export const cmpPages = {
  all_campaign: "all_campaign",
  create_campaign: "create_campaign",
  detailed_campaign: "detailed_campaign",
  send_campaign_form: "send_campaign_form",
  choose_template: "choose_template",
};

export function catSort(a, b) {
  let fa = a?.cmpt_name?.toLowerCase();
  let fb = b?.cmpt_name?.toLowerCase();
  if (fa < fb) return -1;
  if (fa > fb) return 1;
  return 0;
}

export default function CampaignRoot({ isCollapsed }) {
  const [page, setPage] = useState(cmpPages.all_campaign);

  if (page === cmpPages.all_campaign)
    return <AllCampaign setPage={setPage} isCollapsed={isCollapsed} />;
  if (page === cmpPages.create_campaign) return <Campaign setPage={setPage} />;
  if (page === cmpPages.send_campaign_form)
    return <SendCampaignForm setPage={setPage} isCollapsed={isCollapsed} />;
  if (page === cmpPages.choose_template)
    return <ChooseTemplate setPage={setPage} isCollapsed={isCollapsed} />;
  return (
    <DetailedCampaign
      setPage={setPage}
      cmpid={page ? page.split("detailed-campaign-")?.[1] : -1}
      isCollapsed={isCollapsed}
    />
  );
}
