import React, { useEffect, useState } from "react";
import backArrow from "../../../Images/back-arrow.svg";
import account from "../../../Images/account.svg";
import clock from "../../../Images/clock.svg";
import tag from "../../../Images/tag.svg";
import axios from "axios";
import {
  GET_CAMPAIGN_CONTACT,
  GET_CAMPAIGN_NUMBER,
  HOST,
} from "../../Constants/Constants";
import "./detailed-campaign.css";
import uniqBy from "lodash/uniqBy";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

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
  opened: { text: "Opened", key: "opened_count" },
  click: { text: "Clicked", key: "click_count" },
  unsubscribe: { text: "Unsubscribed", key: "unsubscribe_count" },
  soft_bounce: { text: "Soft Bounced", key: "soft_bounce_count" },
  hard_bounce: { text: "Hard Bounced", key: "hard_bounce_count" },
  spam: { text: "Spam", key: "spam_count" },
};

export default function DetailedCampaign({ page, setPage }) {
  const [campaign, setCampaign] = useState(null);
  const [selected, setSelected] = useState("opened");
  const [page1, setPage1] = useState(1);
  const [count, setCount] = useState(1);
  const [showContact, setShowContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState({
    opened: { data: [], lastEvaluatedKey: null },
    click: { data: [], lastEvaluatedKey: null },
    unsubscribe: { data: [], lastEvaluatedKey: null },
    soft_bounce: { data: [], lastEvaluatedKey: null },
    hard_bounce: { data: [], lastEvaluatedKey: null },
    spam: { data: [], lastEvaluatedKey: null },
  });

  const fetchMore = async (name, cb) => {
    // setPage1(1);
    // setCount(Math.ceil(contacts[selected]?.data?.length / ITEMS_PER_PAGE))
    let sel = name ?? selected;
    console.log(sel);
    if (contacts[sel]?.lastEvaluatedKey === -1) return;
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        HOST +
          GET_CAMPAIGN_CONTACT(page, sel) +
          (contacts[sel]?.lastEvaluatedKey
            ? `?lastEvaluatedKey=${contacts[sel]?.lastEvaluatedKey}`
            : ""),
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );
      let newContacts = uniqBy(
        [...contacts[sel]?.data, ...data?.Items],
        (obj) => obj.EMAIL
      );
      setCount(Math.ceil(newContacts.length / ITEMS_PER_PAGE));
      setContacts((prev) => ({
        ...prev,
        [sel]: {
          data: newContacts,
          lastEvaluatedKey: data?.lastEvaluatedKey,
        },
      }));
      cb
        ? cb()
        : setShowContact(
            newContacts?.slice(
              (page1 - 1) * ITEMS_PER_PAGE,
              page1 * ITEMS_PER_PAGE
            )
          );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!page) return;
    (async () => {
      try {
        const { data } = await axios.get(HOST + GET_CAMPAIGN_NUMBER(page), {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        });
        setCampaign(data);
      } catch (err) {}
    })();
  }, [page]);

  useEffect(() => {
    setShowContact(
      contacts[selected]?.data?.slice(
        (page1 - 1) * ITEMS_PER_PAGE,
        page1 * ITEMS_PER_PAGE
      )
    );
  }, [page1]);

  useEffect(() => {
    page1 === count && fetchMore();
  }, [page1, count]);

  return (
    <div>
      <div style={{ padding: "32px 36px" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: "12px" }}>
          <img
            src={backArrow}
            alt="back_arrow"
            style={{ cursor: "pointer" }}
            onClick={() => setPage("all_campaign")}
          />
          <div>
            <p style={styles.textStyle()}>Campaign Name: {campaign?.campaignName}</p>
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
            icon={account}
            title="Sender Name"
            text={campaign?.senderName}
          />
          <SenderCard
            icon={account}
            title="Sender Email"
            text={campaign?.senderEmail}
          />
          <SenderCard
            icon={clock}
            title="Creation Date"
            text={campaign?.senderName}
          />
          <SenderCard
            icon={tag}
            title="Tags"
            text1={new Date(campaign?.createdAt).toDateString()}
            text2={
              new Date(campaign?.createdAt).toLocaleString().split(", ")[1]
            }
          />
        </div>
        {/* Stats */}
        <div style={styles.statsContainer}>
          <StatsCard
            title="Total Sent Mails"
            text={campaign?.recipients_count ?? 0}
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
          <StatsCard
            title="Opened"
            text={campaign?.opened_count ?? 0}
            name="opened"
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
          <StatsCard
            title="Clicked"
            text={campaign?.click_count ?? 0}
            name="click"
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
          <StatsCard
            title="Delivered, not read"
            text={
              campaign?.recipients_count -
              (campaign?.opened_count ?? 0) -
              (campaign?.hard_bounce_count ?? 0) -
              (campaign?.soft_bounce_count ?? 0)
            }
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
        </div>
        <div style={styles.statsContainer}>
          <StatsCard
            title="Unsubscribed"
            text={campaign?.unsubscribe_count ?? 0}
            name="unsubscribe"
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
          <StatsCard
            title="Soft Bounced"
            text={campaign?.soft_bounce_count ?? 0}
            name="soft_bounce"
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
          <StatsCard
            title="Hard Bounce"
            text={campaign?.hard_bounce_count ?? 0}
            name="hard_bounce"
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
          <StatsCard
            title="Marked as spam"
            text={campaign?.spam_count ?? 0}
            name="spam"
            setSelected={setSelected}
            selected={selected}
            setShowContact={setShowContact}
            contacts={contacts}
            page1={page1}
            setPage1={setPage1}
            setCount={setCount}
            fetchMore={fetchMore}
          />
        </div>
        {/* Divider */}
        <div
          style={{ background: "#EBE9F1", height: "1px", margin: "20px 0px" }}
        />
        {/* Contacts */}
        <p className="contatcts-heading">
          {conversion[selected]?.text} ({campaign?.[conversion[selected]?.key]})
        </p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ marginTop: "8px", whiteSpace: "nowrap" }}>
          <thead style={{ width: "100%" }}>
            <tr
              style={{
                border: "1px solid var(--outline-color, #EBE9F1)",
                background: "#F7F7F9",
              }}
            >
              <th>Recipient Email</th>
              <th>Recipient Name</th>
              <th>Contact Category</th>
              <th>City</th>
              <th>Website</th>
              <th>Business Phone</th>
              <th>Fax Number</th>
            </tr>
          </thead>
          <tbody>
            {showContact?.map((contact, index) => (
              <ContactCard key={index.toString()} contact={contact} />
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <Pagination
          count={count}
          page={page1}
          onChange={(e, value) => setPage1(value)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

const ContactCard = ({ contact }) => {
  return (
    <tr className="tr">
      <td>{contact?.EMAIL}</td>
      <td>{contact?.CONTACT_NAME}</td>
      <td>{contact?.CATEGORY}</td>
      <td>{contact?.CITY}</td>
      <td>{contact?.WEB_PAGE}</td>
      <td>{contact?.BUSINESS_PHONE}</td>
      <td>{contact?.FAX_NUMBER}</td>
    </tr>
  );
};

const StatsCard = ({
  title,
  text,
  name,
  setSelected,
  selected,
  setShowContact,
  contacts,
  page1,
  setPage1,
  setCount,
  fetchMore,
}) => {
  return (
    <div
      className={`statsCard-container ${
        name === selected && "statsCard-container-active"
      }`}
      onClick={async () => {
        if (!name) return;
        if (selected === name) return;
        // console.log(name,"name")
        setSelected((prev) => name);
        if (contacts[name]?.data?.length > 0) {
          setShowContact(contacts[name]?.data?.slice(0, ITEMS_PER_PAGE));
          setPage1((prev) => 1);
          setCount(Math.ceil(contacts[name]?.data?.length / ITEMS_PER_PAGE));
        } else {
          setPage1((prev) => 1);
          console.log(page1);
          await fetchMore(name);
        }
      }}
    >
      <p className="statsCard-text1">{title}</p>
      <p className="statsCard-text2">{text}</p>
    </div>
  );
};

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
