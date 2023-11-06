import React, { useState, useEffect } from "react";
import "./all-campaign.css";
import { Button } from "@mui/material";
import createNewCampaign from "../../../Images/create-new-campaign.svg";
import {
  GET_ALL_CAMPAIGNS,
  HOST,
  PRIMARY_COLOR,
} from "../../Constants/Constants";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import uniqBy from "lodash/uniqBy";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const styles = {
  textStyle(props) {
    return {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: props?.fontWeight ?? 500,
      fontSize: props?.fontSize ?? "18px",
      lineHeight: props?.lineHeight ?? "28px",
      color: props?.color ?? "#0A0A0A",
    };
  },
  flex() {
    return {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };
  },
};

export default function AllCampaign({ isCollapsed, setPage }) {
  const [campaign, setCampaign] = useState([]);
  const [campaignCopy, setCampaignCopy] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page1, setPage1] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCampaign(
      campaignCopy.slice((page1 - 1) * ITEMS_PER_PAGE, page1 * ITEMS_PER_PAGE)
    );
  }, [page1, campaignCopy]);

  useEffect(() => {
    if (!lastEvaluatedKey) fetchMore();
    else if (page1 === count) {
      if (!search) fetchMore();
      else fetchSearch(true);
    }
  }, [page1, lastEvaluatedKey]);

  useEffect(() => {
    fetchSearch();
  }, [search]);

  const fetchSearch = async (flag = false) => {
    if (!search) {
      setLastEvaluatedKey(null);
      return;
    }
    let cancel;
    axios({
      method: "GET",
      url:
        HOST +
        GET_ALL_CAMPAIGNS +
        `?text=${search}` +
        (lastEvaluatedKey && flag
          ? `&lastEvaluatedKey=${lastEvaluatedKey?.createdAt}&campaignId=${lastEvaluatedKey?.campaignId}`
          : ""),
      headers: {
        auth: "Rose " + localStorage.getItem("auth"),
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const data = res.data;
        let allCampaigns = flag
          ? uniqBy([...campaignCopy, ...data?.Items], (obj) => obj.campaignId)
          : uniqBy([...data?.Items], (obj) => obj.campaignId);
        allCampaigns.sort((a, b) => b.createdAt - a.createdAt);
        setCount(Math.ceil(allCampaigns.length / ITEMS_PER_PAGE));
        setCampaignCopy(allCampaigns);
        setLastEvaluatedKey(data?.lastEvaluatedKey);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchMore = async () => {
    if (lastEvaluatedKey === -1) return;
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        HOST +
          GET_ALL_CAMPAIGNS +
          (lastEvaluatedKey
            ? `?lastEvaluatedKey=${lastEvaluatedKey?.createdAt}&campaignId=${lastEvaluatedKey?.campaignId}`
            : ""),
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );
      let allCampaigns = uniqBy(
        [...campaignCopy, ...data?.Items],
        (obj) => obj.campaignId
      );
      allCampaigns.sort((a, b) => b.createdAt - a.createdAt);
      setCount(Math.ceil(allCampaigns.length / ITEMS_PER_PAGE));
      // setCampaign(allCampaigns);
      setCampaignCopy(allCampaigns);
      setLastEvaluatedKey(data?.lastEvaluatedKey);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ height: "calc(100vh - 56px)" }}>
      <div style={{ padding: "2rem" }}>
        <div style={styles.flex()}>
          <p style={styles.textStyle()}>Campaigns</p>
          <Button
            variant="contained"
            size="large"
            style={{
              background: PRIMARY_COLOR,
              padding: "8px 16px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "5px",
            }}
            disabled={isLoading}
            onClick={() => setPage("create_campaign")}
          >
            <img
              src={createNewCampaign}
              alt="campaign"
              height="20px"
              width="20px"
            />
            <p
              style={{
                color: "#FBFBFB",
                fontSize: "16px",
                fontFamily: "Roboto",
                lineHeight: "24px",
                textTransform: "capitalize",
              }}
            >
              Create new campaign
            </p>
          </Button>
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 12px 8px 12px",
            gap: "4px",
            borderRadius: "6px",
            border: "1px solid #EBE9F1",
            background: "white",
            flexShrink: 0,
          }}
        >
          <SearchIcon style={{ height: "18px", width: "18px" }} />
          <input
            type="search"
            style={{ outline: "none", border: "none" }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* campaign */}
      <div
        style={{
          marginTop: "24px",
          height: "calc(100% - 128px - 114px - 24px - 20px)",
          overflowY: "scroll",
        }}
      >
        <table style={{ minWidth: "100%", position: "relative" }}>
          <thead style={{ position: "sticky", top: 0 }}>
            <tr
              style={{
                borderTop: "1px solid var(--outline-color, #EBE9F1)",
                borderBottom: "1px solid var(--outline-color, #EBE9F1)",
                background: "#F7F7F9",
              }}
            >
              <th>Campaign Details</th>
              <th>Creation Date</th>
              <th>Sender</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {campaign?.map((camp, index) => (
              <tr
                key={index.toString()}
                className="tr"
                onClick={() => setPage(camp?.campaignId)}
              >
                <td>
                  <p className="campaignName">{camp?.campaignName}</p>
                  <p className="campaignSubject">{camp?.subject}</p>
                </td>
                <td>
                  <p className="campaignName">
                    {new Date(camp?.createdAt).toDateString()}
                  </p>
                  <p className="campaignSubject">
                    {new Date(camp?.createdAt).toLocaleString().split(", ")[1]}
                  </p>
                </td>
                <td>
                  <p className="campaignName">{camp?.senderName}</p>
                  <p className="campaignSubject">{camp?.senderEmail}</p>
                </td>
                <td>
                  <p className="campaignName">{camp?.tag}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          width: `calc(100% - ${isCollapsed ? "68px" : "228px"} - 10px)`,
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
          count={count}
          page={page1}
          onChange={(e, value) => setPage1(value)}
          disabled={!campaign.length}
        />
      </div>
    </div>
  );
}
