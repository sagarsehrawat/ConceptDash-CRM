import React, { useEffect, useRef, useState } from "react";
import "./all-campaign.css";
import ICONS from "../../constants/Icons";
import APIS from "../../constants/APIS";
import TFIcon from "../../components/ui/TFIcon/TFIcon";
import { cmpPages } from ".";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Pagination from "./Pagination";

const getTableTypographyStyles = (styles = {}) => ({
  color: "var(--Black-text, #3D424F)",
  fontFamily: "Roboto",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px",
  ...styles,
});

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${month} ${year}`;
}

export default function AllCampaign({ setPage, isCollapsed }) {
  const tableRef = useRef(null);
  const [search, setSearch] = useState("");
  const [page1, setPage1] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignData, setCampaignData] = useState([]);

  function fetchCampaign() {
    let cancel;
    setIsLoading(true);
    axios({
      method: "GET",
      url: APIS.CAMPAIGN_BASE_URL + APIS.GET_CAMPAIGN(search, page1),
      headers: {
        auth: "Rose " + localStorage.getItem("auth"),
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const { totalPages, data } = res.data;
        setTotalPages(totalPages);
        setCampaignData(data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchCampaign();
  }, [search, page1]);

  return (
    <>
      <div className="cmp-all-campaign-container">
        <div>
          <div>
            <p>Campaigns</p>
            <button onClick={(e) => setPage(cmpPages.create_campaign)}>
              {" "}
              <TFIcon icon={ICONS.CAMPAIGN_CREATE_NEW_CAMPAIGN} /> Create new
              campaign
            </button>
          </div>
          <div>
            <SearchIcon style={{ height: "18px", width: "18px" }} />
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setPage1(1);
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="table-wrapper" ref={tableRef}>
          <table
            className="w-100"
            style={{ borderCollapse: "separate" }}
            ref={tableRef}
          >
            <thead className="table-header fixed-table-header">
              <tr>
                <th className="table-heading" style={{ width: "180px" }}>
                  Campaign Details
                </th>
                <th className="table-heading" style={{ width: "120px" }}>
                  Creation Date
                </th>
                <th className="table-heading" style={{ width: "90px" }}>
                  Opened
                </th>
                <th className="table-heading" style={{ width: "90px" }}>
                  Clicked
                </th>
                <th className="table-heading" style={{ width: "90px" }}>
                  Bounced
                </th>
                <th className="table-heading" style={{ width: "90px" }}>
                  Unsubscribed
                </th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign) => (
                <>
                  <tr
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      verticalAlign: "top",
                      cursor: "pointer",
                    }}
                    key={`cmp-all-campaign-campaign-id-${campaign.cmpid}`}
                    onClick={(e) =>
                      setPage(`detailed-campaign-${campaign.cmpid}`)
                    }
                  >
                    <td className="table-cell">
                      <p style={getTableTypographyStyles()}>
                        {campaign.cmpname}
                      </p>
                      <p
                        style={getTableTypographyStyles({
                          color: "var(--Dark-grey, #70757A)",
                        })}
                      >
                        {campaign.subject}
                      </p>
                    </td>
                    <td className="table-cell">
                      <p
                        style={getTableTypographyStyles({
                          color: "#0A0A0A",
                          fontSize: "14px",
                          fontWeight: 400,
                        })}
                      >
                        {formatDate(new Date(campaign.createdat))}
                      </p>
                      <p
                        style={getTableTypographyStyles({
                          color: "var(--Dark-grey, #70757A)",
                          fontSize: "14px",
                          fontWeight: 400,
                        })}
                      >
                        {
                          new Date(campaign.createdat)
                            .toLocaleString()
                            .split(", ")[1]
                        }
                      </p>
                    </td>
                    <td className="table-cell">
                      <p
                        style={getTableTypographyStyles({
                          color: "#0A0A0A",
                          fontSize: "14px",
                          fontWeight: 600,
                        })}
                      >
                        {campaign.cmp_count.Open}
                      </p>
                    </td>
                    <td className="table-cell">
                      <p
                        style={getTableTypographyStyles({
                          color: "#0A0A0A",
                          fontSize: "14px",
                          fontWeight: 600,
                        })}
                      >
                        {campaign.cmp_count.Click}
                      </p>
                    </td>
                    <td className="table-cell">
                      <p
                        style={getTableTypographyStyles({
                          color: "#0A0A0A",
                          fontSize: "14px",
                          fontWeight: 600,
                        })}
                      >
                        {campaign.cmp_count.Bounce}
                      </p>
                    </td>
                    <td className="table-cell">
                      <p
                        style={getTableTypographyStyles({
                          color: "#0A0A0A",
                          fontSize: "14px",
                          fontWeight: 600,
                        })}
                      >
                        {campaign.cmp_count.Subscription}
                      </p>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ height: "72px", width: "10px" }}></div>
      </div>
      <div
        style={{
          width: `calc(100% - ${isCollapsed ? "68px" : "228px"})`,
          display: "flex",
          justifyContent: "flex-end",
          position: "fixed",
          background: "#F8FAFB",
          padding: "40px 0px",
          right: 0,
          bottom: 0,
        }}
      >
        <Pagination
          count={totalPages}
          page={page1}
          onChange={(e, value) => setPage1(value)}
          disabled={isLoading}
        />
      </div>
    </>
  );
}
