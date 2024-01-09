import React, { useEffect, useRef, useState } from "react";
import "./detailed-campaign.css";
import ICONS from "../../constants/Icons";
import APIS from "../../constants/APIS";
import TFIcon from "../../components/ui/TFIcon/TFIcon";
import { cmpPages } from ".";
import axios from "axios";
import Pagination from "./Pagination";

const styles = {
  textStyle(props) {
    return {
      color: props?.color ?? "var(--black-text, #0A0A0A)",
      fontFamily: "Roboto",
      fontSize: props?.fontSize ?? "18px",
      fontStyle: "normal",
      fontWeight: props?.fontWeight ?? 500,
      lineHeight: props?.lineHeight ?? "28px",
    };
  },
  senderContainer: {
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "12px",
    border: "1px solid var(--outline-color, #EBE9F1)",
    padding: "20px 24px",
    marginTop: "12px",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    // justifyContent: "space-between",
    marginTop: "20px",
  },
};

const conversion = {
  Open: "Opened",
  Click: "Clicked",
  Subscription: "Unsubscribed",
  Bounce: "Bounced",
  Complaint: "Spam",
  Delivery: "Delivery",
};

function getTypographyStyles(styles = {}) {
  return {
    color: "#0A0A0A",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px" /* 142.857% */,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...styles,
  };
}

export default function DetailedCampaign({ setPage, cmpid, isCollapsed }) {
  const tableRef = useRef(null);
  const [campaign, setCampaign] = useState(null);
  const [selected, setSelected] = useState("Open");
  const [page1, setPage1] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contact, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchCampaignReportContact() {
    setIsLoading(true);
    axios({
      method: "GET",
      url:
        APIS.CAMPAIGN_BASE_URL +
        APIS.GET_CAMPAIGN_CONTACT_REPORT(cmpid, page1, selected),
      headers: {
        auth: "Rose " + localStorage.getItem("auth"),
      },
    })
      .then(({ data }) => {
        setTotalPages(data.totalPages);
        setContact(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          APIS.CAMPAIGN_BASE_URL + APIS.GET_CAMPAIGN_BY_ID(cmpid),
          {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
            },
          }
        );
        setCampaign(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [cmpid]);

  useEffect(() => {
    fetchCampaignReportContact();
  }, [cmpid, page1, selected]);

  return (
    <div>
      <div style={{ padding: "32px 36px" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: "12px" }}>
          <TFIcon
            icon={ICONS.CAMPAIGN_BACK_ARROW}
            alt="back_arrow"
            style={{ cursor: "pointer" }}
            onClick={() => setPage(cmpPages.all_campaign)}
          />
          <div>
            <p style={styles.textStyle()}>Campaign Name: {campaign?.cmpname}</p>
            <p
              style={styles.textStyle({
                fontSize: "13px",
                lineHeight: "20px",
                color: "var(--dark-grey, #70757A)",
              })}
            >
              Subject : {campaign?.subject}
            </p>
          </div>
        </div>
        {/* Sender Details */}
        <div style={styles.senderContainer}>
          <SenderCard
            icon={ICONS.CAMPAIGN_ACCOUNT}
            title="Sender Name"
            text={campaign?.sendername}
          />
          <SenderCard
            icon={ICONS.CAMPAIGN_ACCOUNT}
            title="Sender Email"
            text={campaign?.senderemail}
          />
          <SenderCard
            icon={ICONS.CAMPAIGN_CLOCK}
            title="Creation Date"
            text1={new Date(campaign?.createdat).toDateString()}
            text2={
              new Date(campaign?.createdat).toLocaleString().split(", ")[1]
            }
          />
        </div>
        {/* Stats */}
        <div style={styles.statsContainer}>
          <StatsCard
            title="Total Sent Mails"
            text={campaign?.recipientcount ?? 0}
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
          <StatsCard
            title="Opened"
            text={campaign?.cmp_count.Open ?? 0}
            name="Open"
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
          <StatsCard
            title="Clicked"
            text={campaign?.cmp_count.Click ?? 0}
            name="Click"
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
          <StatsCard
            title="Others"
            text={Math.max(
              0,
              campaign?.recipientcount -
                Object.keys(campaign ? campaign.cmp_count : {}).reduce(
                  (prev, curr) =>
                    prev + (campaign ? campaign.cmp_count[curr] : 0),
                  0
                )
            )}
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
        </div>
        <div style={styles.statsContainer}>
          <StatsCard
            title="Unsubscribed"
            text={campaign?.cmp_count.Subscription ?? 0}
            name="Subscription"
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
          <StatsCard
            title="Bounce"
            text={campaign?.cmp_count.Bounce ?? 0}
            name="Bounce"
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
          <StatsCard
            title="Marked as spam"
            text={campaign?.cmp_count.Complaint ?? 0}
            name="Complaint"
            setSelected={setSelected}
            selected={selected}
            setPage1={setPage1}
          />
        </div>
        {/* Divider */}
        <div
          style={{ background: "#EBE9F1", height: "1px", margin: "20px 0px" }}
        />
        {/* Contacts */}
        <p className="contatcts-heading">
          {conversion[selected]} ({campaign?.cmp_count[selected]})
        </p>
      </div>
      <div className="table-wrapper" ref={tableRef}>
        <table
          className="w-100"
          style={{ borderCollapse: "separate", whiteSpace: "nowrap" }}
          ref={tableRef}
        >
          <thead className="table-header fixed-table-header">
            <tr>
              <th className="table-heading" style={{ width: "220px" }}>
                Recipient Email
              </th>
              <th className="table-heading" style={{ width: "140px" }}>
                Recipient Name
              </th>
              <th className="table-heading" style={{ width: "150px" }}>
                City
              </th>
              <th className="table-heading" style={{ width: "200px" }}>
                Website
              </th>
              <th className="table-heading" style={{ width: "110px" }}>
                Phone Number
              </th>
              <th className="table-heading" style={{ width: "110px" }}>
                Fax Number
              </th>
            </tr>
          </thead>
          <tbody>
            {contact.map((ele, index) => (
              <>
                <tr
                  key={`detailed-campaign-contact-data-${index}`}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    verticalAlign: "top",
                    cursor: "pointer",
                  }}
                >
                  <td className="table-cell" style={getTypographyStyles()}>
                    {ele.email}
                  </td>
                  <td
                    className="table-cell"
                    style={getTypographyStyles({ fontWeight: 400 })}
                  >
                    {ele.name}
                  </td>
                  <td
                    className="table-cell"
                    style={getTypographyStyles({ fontWeight: 400 })}
                  >
                    {ele.city}
                  </td>
                  <td
                    className="table-cell"
                    style={getTypographyStyles({ fontWeight: 400 })}
                  >
                    {ele.website}
                  </td>
                  <td
                    className="table-cell"
                    style={getTypographyStyles({ fontWeight: 400 })}
                  >
                    {ele.phone}
                  </td>
                  <td
                    className="table-cell"
                    style={getTypographyStyles({ fontWeight: 400 })}
                  >
                    {ele.fax}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}

const SenderCard = ({ icon, title, text, text1, text2 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <img src={icon} alt={icon} />
      <div>
        <p className="sndCard-text1">{title}</p>
        {text && <p className="sndCard-text2">{text}</p>}
        {text1 && text2 && (
          <p>
            <span className="sndCard-text2">{text1}, &nbsp;</span>
            <span className="sndCard-text1">{text2}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const StatsCard = ({ title, text, name, setSelected, selected, setPage1 }) => {
  return (
    <div
      className={`statsCard-container ${
        name === selected && "statsCard-container-active"
      }`}
      onClick={async () => {
        if (!name) return;
        if (selected === name) return;
        setPage1(1);
        setSelected((prev) => name);
      }}
    >
      <p className="statsCard-text1">{title}</p>
      <p className="statsCard-text2">{text}</p>
    </div>
  );
};
