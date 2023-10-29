import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import SendCampaignSVG from "../../../Images/send-campaign.svg";
import closeBtn from "../../../Images/close-button-campaign-modal.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  CREATE_CAMPAIGN,
  HOST,
  PRIMARY_COLOR,
} from "../../Constants/Constants";
import axios from "axios";

const animatedComponents = makeAnimated();

const styles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    overflowY: "scroll",
    maxHeight: "90vh",
    bgcolor: "#fff",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    outline: "none",
    p: "22px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "24px 0px",
  },
  flex(props) {
    return {
      display: "flex",
      justifyContent: props?.jc ?? "center",
      alignItems: props?.ai ?? "center",
    };
  },
  sendIconContainer: {
    height: "32px",
    width: "32px",
    background: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
    borderRadius: "100px",
  },
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
  closeBtn: {
    cursor: "pointer",
  },
};

const formArray = [
  {
    label: "Sender's Name",
    type: "text",
    placeholder: "Enter Sender's Name",
    name: "senderName",
    required: true,
  },
  {
    label: "Sender's Email",
    type: "email",
    placeholder: "example@conceptdash.ca",
    name: "senderEmail",
    required: true,
  },
  {
    label: "Campaign Name",
    type: "text",
    placeholder: "Enter Campaign Name",
    name: "campaignName",
    required: true,
  },
  {
    label: "Subject",
    type: "text",
    placeholder: "Subject",
    name: "subject",
    required: true,
  },
  {
    label: "Template Id",
    type: "number",
    placeholder: "Template Id",
    name: "templateId",
    required: true,
  },
  {
    label: "Tags",
    type: "text",
    placeholder: "example- #design, #construction",
    name: "tag",
  },
];

export default function CampaignModal({
  open,
  setOpen,
  lists,
  selectedLists,
  setSelectedLists,
  setUnselectedLists,
  data,
  setData,
  params,
  setParams,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (data) => {
    let selectedListsObj = {};
    data?.forEach((d) => (selectedListsObj[d?.listId] = true));
    let unselectedLists = [];
    lists?.forEach(
      (d) => !selectedListsObj[d?.listId] && unselectedLists.push(d)
    );
    setUnselectedLists(unselectedLists);
    setSelectedLists(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedLists.length <= 0) {
      alert("Please select at least one Category");
      return;
    }
    let recipients = { listIds: [] };
    let recipients_count = 0;
    selectedLists.forEach((list) => {
      recipients.listIds.push(list.listId);
      recipients_count += list.COUNT;
    });
    let payload = {
      ...(data?.tags && { tag: data.tags }),
      sender: {
        name: data?.senderName,
        email: data?.senderEmail,
      },
      name: data?.campaignName,
      templateId: parseInt(data?.templateId),
      subject: data?.subject,
      ...(Object.keys(params).length > 0 && { params: params }),
      recipients,
      recipients_count,
    };
    console.log(payload)
    try {
      setIsLoading(true);
      const { data } = await axios.post(HOST + CREATE_CAMPAIGN, payload, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
        },
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.box}>
        {/* Header */}
        <div style={styles.flex({ jc: "space-between" })}>
          <div style={styles.flex({ jc: "start" })}>
            <div
              style={{
                ...styles.sendIconContainer,
                ...styles.flex({ jc: "center" }),
              }}
            >
              <img src={SendCampaignSVG} alt="SendCampaignSVG" />
            </div>
            <p style={{ ...styles.textStyle(), marginLeft: "8px" }}>
              Send Campaign
            </p>
          </div>
          <img
            src={closeBtn}
            alt="closebtn"
            style={styles.closeBtn}
            onClick={() => setOpen(false)}
          />
        </div>
        {/* Receipent  */}
        <div>
          <p
            style={{
              ...styles.textStyle({
                fontSize: "14px",
                lineHeight: "20px",
                color: "#70757A",
              }),
              marginBottom: "2px",
            }}
          >
            Recipients
          </p>
          <Select
            options={lists}
            getOptionLabel={(option) => option.CATEGORY}
            getOptionValue={(option) => option.CATEGORY}
            components={animatedComponents}
            className="react-select-container"
            classNamePrefix="react-select"
            isMulti={true}
            autoFocus
            value={selectedLists}
            onChange={handleSelectChange}
          />
        </div>
        {/* form */}
        <form
          style={{ display: "flex", flexDirection: "column", gap: "24px 0px" }}
          onSubmit={handleFormSubmit}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "24px 20px",
            }}
          >
            {formArray.map((ele, index) => (
              <CampaignModalInput
                key={index.toString()}
                {...ele}
                value={data[ele.name]}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            ))}
            <Parameter params={params} setParams={setParams} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "0px 20px",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              style={{
                border: "1px solid #BEBEC0",
                borderRadius: "5px",
                filter: "drop-shadow(0px 4px 8px rgba(88, 82, 246, 0.25))",
                ...styles.textStyle({
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: PRIMARY_COLOR,
                }),
              }}
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{
                background: PRIMARY_COLOR,
                boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
                borderRadius: "5px",
                ...styles.textStyle({
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#FBFBFB",
                }),
              }}
              type="submit"
              disabled={isLoading}
            >
              Send Campaign
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

const Parameter = ({ params, setParams }) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  return (
    <div>
      <p
        style={{
          ...styles.textStyle({
            fontSize: "14px",
            lineHeight: "20px",
            color: "#70757A",
          }),
          marginBottom: "8px",
        }}
      >
        Parameter
      </p>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "16px 0px" }}
      >
        {Object.keys(params).map((key) => (
          <div
            key={key.toString()}
            style={{ display: "flex", alignItems: "end", gap: "0px 20px" }}
          >
            <CampaignModalInput
              label="Title"
              placeholder="Add Title"
              type="text"
              value={key}
              disabled
            />
            <CampaignModalInput
              label="Value"
              placeholder="Add Value"
              type="text"
              value={params[key]}
              disabled
            />
            <button
              style={{
                outline: "none",
                border: "1px solid #EBE9F1",
                borderRadius: "5px",
                background: "#fff",
                padding: "6px 17.5px",
              }}
              onClick={() =>
                setParams((prev) =>
                  Object.keys(prev)
                    .filter((k) => k !== key)
                    .reduce((acc, k) => {
                      acc[k] = prev[k];
                      return acc;
                    }, {})
                )
              }
              type="button"
            >
              - Remove
            </button>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "end", gap: "0px 20px" }}>
          <CampaignModalInput
            label="Title"
            placeholder="Add Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CampaignModalInput
            label="Value"
            placeholder="Add Value"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            style={{
              outline: "none",
              border: "1px solid #EBE9F1",
              borderRadius: "5px",
              background: "#fff",
              padding: "6px 17.5px",
            }}
            onClick={() => {
              setParams((prev) => ({ ...prev, [title]: value }));
              setTitle("");
              setValue("");
            }}
            type="button"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

const CampaignModalInput = ({ label, ...props }) => {
  return (
    <div>
      <p
        style={{
          ...styles.textStyle({
            fontSize: "14px",
            lineHeight: "20px",
            color: "#70757A",
          }),
          marginBottom: "2px",
        }}
      >
        {label}
      </p>
      <input
        style={{
          width: "100%",
          outline: "none",
          border: "1px solid #EBE9F1",
          borderRadius: "5px",
          padding: "6px 8px",
        }}
        {...props}
      />
    </div>
  );
};
