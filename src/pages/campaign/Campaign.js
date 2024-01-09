import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUnselectedListsCopy,
  setSelectedListsCopy,
  setIsLoading,
  setUnselectedLists,
  setSelectedLists,
  setLists,
  setIsError,
} from "../../redux/slices/campaignListSlice";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { PRIMARY_COLOR } from "../../Main/Constants/Constants";

import SearchIcon from "@mui/icons-material/Search";

import List from "./List";
import { cmpPages, catSort } from ".";
import axios from "axios";
import APIS from "../../constants/APIS";

const BASE_URL = APIS.CAMPAIGN_BASE_URL;
const GET_CATEGORIES = APIS.GET_CATEGORIES;

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

export default function Campaign1({ isCollapsed, setPage }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { unselectedLists, selectedLists, isLoading } = useSelector(
    (state) => state.campaignList
  );

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));
        let { data } = await axios.get(BASE_URL + GET_CATEGORIES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        });
        data.sort(catSort);
        const newData = data?.map((d) => ({
          value: d.cmpt_id,
          label: d.cmpt_name,
        }));
        dispatch(setUnselectedLists(newData));
        dispatch(setLists(data));
        dispatch(setUnselectedListsCopy(newData));
        dispatch(setIsLoading(false));
        dispatch(setSelectedLists([]));
        dispatch(setSelectedListsCopy([]));
      } catch (err) {
        dispatch(setIsLoading(false));
        dispatch(setIsError(true));
      }
    })();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
    const filteredUnselectedLists = unselectedLists?.filter((l) =>
      l?.label?.toLowerCase()?.includes(e.target.value?.toLowerCase())
    );
    const filteredSelectedLists = selectedLists?.filter((l) =>
      l?.label?.toLowerCase()?.includes(e.target.value?.toLowerCase())
    );
    dispatch(setUnselectedListsCopy(filteredUnselectedLists));
    dispatch(setSelectedListsCopy(filteredSelectedLists));
  }

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
        <List />
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
          onClick={() => setPage(cmpPages.all_campaign)}
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
          onClick={() => setPage(cmpPages.send_campaign_form)}
        >
          Create Campaign
        </Button>
      </div>
    </>
  );
}
