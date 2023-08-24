import React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import leftIcon from "../../../Images/left.svg";
import rightIcon from "../../../Images/right1.svg";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

export default function Pagination({ count, page, onChange, disabled }) {
  const { items } = usePagination({
    count,
    page,
    onChange,
    disabled,
  });
  return (
    <List>
      {items.map(({ page, type, selected, disabled, ...item }, index) => {
        let children = null;
        if (type === "start-ellipsis" || type === "end-ellipsis")
          children = "…";
        else if (type === "page") {
          children = (
            <button
              type="button"
              disabled={disabled}
              {...item}
              style={{
                height: "32px",
                width: "32px",
                padding: "6px 0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                borderRadius: "4px",
                border: selected
                  ? "1px solid var(--primary-color, #6519E1)"
                  : "1px solid var(--outline-color, #EBE9F1)",
                background: "none",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: selected ? "var(--primary-color, #6519E1)" : "var(--dark-grey, #70757A)"
              }}
            >
              {page}
            </button>
          );
        } else {
          children = (
            <button
              type="button"
              disabled={disabled}
              {...item}
              style={{ border: "none", outline: "none", background: "none" }}
            >
              <img src={type === "previous" ? leftIcon : rightIcon} />
            </button>
          );
        }
        return <li key={index}>{children}</li>;
      })}
    </List>
  );
}
