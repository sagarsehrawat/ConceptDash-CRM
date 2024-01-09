import React, { useEffect, useState } from "react";
import "./choose-template.css";
import {
  CampaignFooter,
  ComponentHeader,
  SendCampaignTopButton,
} from "./SendCampaignForm";
import { cmpPages } from ".";
import TFIcon from "../../components/ui/TFIcon/TFIcon";
import ICONS from "../../constants/Icons";
import APIS from "../../constants/APIS";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/campaignListSlice";

const chooseTemplateTabs = {
  all_templates: "all_templates",
  recently_sent_templates: "recently_sent_templates",
};

export default function ChooseTemplate({ setPage, isCollapsed }) {
  const [activeTab, setActiveTab] = useState(chooseTemplateTabs.all_templates);
  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.campaignList);

  useEffect(() => {
    const getTemplates = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          APIS.CAMPAIGN_BASE_URL + APIS.GET_TEMPLATES(search === "" ? "*" : search),
          {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
            },
          }
        );
        setTemplates(data);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
    return () => clearTimeout(getTemplates);
  }, [search]);

  return (
    <div style={{ background: "white" }}>
      <div className="cmp-ct-container">
        <div className="cmp-ct-inner-container">
          <SendCampaignTopButton
            setPage={setPage}
            page={cmpPages.send_campaign_form}
          />
          <div>
            <ComponentHeader
              first="Choose Template"
              second="Choose a template for sending the campaign"
            />
            <div className="cmp-ct-recent-templates-container">
              <div
                style={{
                  ...(activeTab ===
                    chooseTemplateTabs.recently_sent_templates && {
                    borderBottom: "1px solid var(--Primary-color, #8361FE)",
                  }),
                }}
                onClick={(e) =>
                  setActiveTab(chooseTemplateTabs.recently_sent_templates)
                }
              >
                <p>Recently Sent Templates</p>
              </div>
              <div
                style={{
                  ...(activeTab === chooseTemplateTabs.all_templates && {
                    borderBottom: "1px solid var(--Primary-color, #8361FE)",
                  }),
                }}
                onClick={(e) => setActiveTab(chooseTemplateTabs.all_templates)}
              >
                <p>All Templates</p>
              </div>
            </div>
            <div className="cmp-ct-searchbox-container">
              <TFIcon
                icon={ICONS.CAMPAIGN_CHOOSE_TEMPLATE_SEARCH}
                alt="Campaign_Choose_Template_Search"
              />
              <input
                type="search"
                placeholder="Search name, Label"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="cmp-ct-templates-container">
              {templates.map((template) => (
                <div
                  key={`template-${template.tmpid}`}
                  onClick={(e) =>
                    dispatch(
                      setData({
                        ...data,
                        template,
                        ...((template.params || template.contactparams) && {
                          params: {
                            ...(template.params &&
                              template.params?.reduce(
                                (prev, curr) => ({ ...prev, [curr]: "" }),
                                {}
                              )),
                            ...(template.contactparams &&
                              template.contactparams?.reduce(
                                (prev, curr) => ({
                                  ...prev,
                                  ["contact." + curr]: "",
                                }),
                                {}
                              )),
                          },
                        }),
                      })
                    )
                  }
                  style={{
                    ...(data &&
                      data.template &&
                      data.template.tmpid &&
                      data.template.tmpid === template.tmpid && {
                        border: "1px solid var(--Primary-color, #8361fe)",
                        background: "#faf9ff",
                      }),
                  }}
                >
                  <img
                    src={`https://s3file-upload.s3.ca-central-1.amazonaws.com/template/${template.tmpid}.png`}
                    alt="template"
                    height={232}
                  />
                  <div
                    style={{
                      ...(data &&
                        data.template &&
                        data.template.tmpid &&
                        data.template.tmpid === template.tmpid && {
                          border: "1px solid var(--Primary-color, #8361fe)",
                        }),
                    }}
                  >
                    <p>{template.tmpname}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "70px", width: "10px" }}></div>
      <CampaignFooter
        isCollapsed={isCollapsed}
        isLoading={isLoading}
        firstOnChange={(e) => setPage(cmpPages.send_campaign_form)}
        secondOnChange={(e) => setPage(cmpPages.send_campaign_form)}
        first="Cancel"
        second="Continue"
      />
    </div>
  );
}
