/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import styles from "./Dropdown.module.css";
import searchIcon from "../../../assets/icons/Magnifying_Glass.svg";
import downGray from "../../../assets/icons/DownGray.svg";
import downWhite from "../../../assets/icons/DownWhite.svg";
import { useState } from "react";
import { useRef } from "react";

const Dropdown = ({
  search,
  checkbox,
  options,
  value,
  onChange,
  type,
  name,
  disable,
}) => {
  const [open, setOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);

  const handleClick = (e) => {
    if (
      e.target !== ref1.current &&
      e.target !== ref2.current &&
      e.target !== ref3.current &&
      e.target !== ref4.current &&
      e.target !== ref5.current &&
      e.target !== ref6.current
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setDropdownOptions([...options]);
  }, [options]);

  const handleSearch = (val) => {
    setSearchStr(val);
    setDropdownOptions([...options]);
    if (val != "") {
      setDropdownOptions(
        options.filter((e) => {
          const lowerCaseLabel = e.label.toLowerCase();
          const lowerCaseStr = val.toLowerCase();
          return lowerCaseLabel.includes(lowerCaseStr);
        })
      );
    }
  };

  return (
    <div className={styles[`main-container`]} ref={ref1}>
      <div
        className={styles[`dropdown-container`]}
        style={{
          backgroundColor: value ? "#8361FE" : "#FFFFFF",
          border: !value ? "1px solid #70757A" : "none",
        }}
        onClick={() => {
          if (!disable) setOpen(!open);
        }}
      >
        <span
          ref={ref2}
          className={styles[`value-field`]}
          style={{
            color: disable ? "white" : value ? "white" : "",
          }}
        >
          {value ? options.filter((e) => e?.value == value)[0]?.label : name}
        </span>
        <button
          ref={ref3}
          style={{ cursor: disable ? "not-allowed" : "" }}
          className={styles.icon}
        >
          <img
            ref={ref6}
            className={styles["icon-img"]}
            src={disable ? downWhite : value ? downWhite : downGray}
            alt=""
          />
        </button>
      </div>
      {open && (
        <div ref={ref4} className={styles["options-container"]}>
          {search && (
            <div className={styles["search"]}>
              <input
                ref={ref5}
                type="text"
                className={styles["search-inp"]}
                placeholder={`Search ${name}`}
                value={searchStr}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <img
                ref={ref7}
                className={styles["search-icon"]}
                src={searchIcon}
                alt=""
              />
            </div>
          )}
          {options &&
            dropdownOptions?.map((elem, idx) => {
              return (
                <div
                  onClick={() => {
                    if (type) {
                      onChange(elem?.value, type);
                    } else {
                      onChange(elem?.value);
                    }
                    setOpen(false);
                  }}
                  className={styles["option"]}
                  key={idx}
                  value={elem?.value}
                >
                  {elem?.label}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
