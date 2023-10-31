import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { GET_ALL_LISTS, HOST, PRIMARY_COLOR } from "../../Constants/Constants";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import List from "./List";
import CampaignModal from "./CampaignModal";

export function catSort(a, b) {
  let fa = a?.CATEGORY?.toLowerCase();
  let fb = b?.CATEGORY?.toLowerCase();
  if (fa < fb) return -1;
  if (fa > fb) return 1;
  return 0;
}

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
  searchCategoryInput: {
    border: "1px solid #EBE9F1",
    background: "#fff",
    borderRadius: "6px 0px 0px 6px",
    padding: "8px 12px",
    borderRight: "none",
    outline: "none",
  },
  searchCategoryIcon: {
    background: "white",
    padding: "8px 12px",
    border: "1px solid #EBE9F1",
    borderRadius: "0px 6px 6px 0px",
    borderLeft: "none",
  },
};

export const ColorButton = styled(Button)({
  boxShadow: "none",
  backgroundColor: PRIMARY_COLOR,
  color: "white",
  padding: "0.5rem 1rem",
  ...styles.textStyle({
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#FBFBFB",
  }),
  "&:hover": {
    boxShadow: "none",
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.8,
  },
});

export default function Campaign({ isCollapsed, setPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [unselectedLists, setUnselectedLists] = useState([]);
  const [unselectedListsCopy, setUnselectedListsCopy] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectedListsCopy, setSelectedListsCopy] = useState([]);
  const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    senderName: "",
    senderEmail: "",
    campaignName: "",
    subject: "",
    templateId: null,
    tags: "",
  });
  const [params, setParams] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let { data } = await axios.get(HOST + GET_ALL_LISTS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        });
        data.sort(catSort);
        setUnselectedLists(data);
        setLists(data);
        setUnselectedListsCopy(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredUnselectedLists = unselectedLists?.filter((l) =>
      l?.CATEGORY?.toLowerCase()?.includes(e.target.value?.toLowerCase())
    );
    const filteredSelectedLists = selectedLists?.filter((l) =>
      l?.CATEGORY?.toLowerCase()?.includes(e.target.value?.toLowerCase())
    );
    setUnselectedListsCopy(filteredUnselectedLists);
    setSelectedListsCopy(filteredSelectedLists);
  };

  return (
    <>
      <div style={{ padding: "2rem 2rem 10rem 2rem" }}>
        <div style={styles.flex()}>
          <p style={styles.textStyle()}>Mass Mailing</p>
        </div>
        <div
          style={{ marginTop: "28px", display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            style={styles.searchCategoryInput}
            placeholder="Search Category"
            value={search}
            onChange={handleSearch}
          />
          <div style={styles.searchCategoryIcon}>
            <SearchIcon style={{ fontSize: "20px" }} />
          </div>
        </div>
        <List
          selectedLists={selectedLists}
          selectedListsCopy={selectedListsCopy}
          unselectedLists={unselectedLists}
          unselectedListsCopy={unselectedListsCopy}
          setSelectedLists={setSelectedLists}
          setSelectedListsCopy={setSelectedListsCopy}
          setUnselectedLists={setUnselectedLists}
          setUnselectedListsCopy={setUnselectedListsCopy}
        />
      </div>
      {/* footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: `calc(100% - ${isCollapsed ? "68px" : "228px"} - 10px)`,
          padding: "2rem",
          background: "#F8FAFB",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Button
          variant="outlined"
          style={{
            padding: "8px 16px",
            borderRadius: "5px",
            border: "1px solid var(--checkbox-colour, #BEBEC0)",
            boxShadow: "0px 4px 8px 0px rgba(88, 82, 246, 0.25)",
            ...styles.textStyle({
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              color: "var(--dark-grey, #70757A)",
            }),
          }}
          onClick={() => setPage("all_campaign")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            padding: "8px 16px",
            borderRadius: "5px",
            boxShadow: "0px 4px 8px 0px rgba(88, 82, 246, 0.25)",
            background: "var(--mob-primary-colour, #8361FE)",
            ...styles.textStyle({
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              color: "#FBFBFB",
            }),
          }}
          disabled={isLoading || selectedLists.length === 0}
          onClick={() => setOpen(true)}
        >
          Create Campaign
        </Button>
      </div>
      
      <CampaignModal
        open={open}
        setOpen={setOpen}
        lists={lists}
        selectedLists={selectedLists}
        setSelectedLists={setSelectedLists}
        unselectedLists={unselectedLists}
        setUnselectedLists={setUnselectedLists}
        data={data}
        setData={setData}
        params={params}
        setParams={setParams}
      />
    </>
  );
}
