import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import { catSort } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  setUnselectedLists,
  setUnselectedListsCopy,
  setSelectedLists,
  setSelectedListsCopy,
} from "../../redux/slices/campaignListSlice";

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
  categoryContainer: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px 32px",
    // maginBottom: "100rem",
  },
  listContainer(props) {
    return {
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
      gap: "12px",
      background: props?.background ?? "#F5F3FE",
      border: props?.border ?? "1px solid #8361FE",
      borderRadius: "8px",
    };
  },
  tickBox(props) {
    return {
      height: props?.height ?? "16px",
      width: props?.width ?? "16px",
      background: props?.background ?? "#fff",
      border: props?.border ?? "0.8px solid #BEBEC0",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  },
};

export default function List1() {
  const dispatch = useDispatch();
  const {
    unselectedLists,
    unselectedListsCopy,
    selectedLists,
    selectedListsCopy,
  } = useSelector((state) => state.campaignList);

  function handleUnselectedClick(list, index) {
    let a = [...unselectedLists];
    a.splice(index, 1);
    let b = [...selectedLists];
    b.push(list);
    b.sort(catSort);
    a.sort(catSort);
    dispatch(setUnselectedLists(a));
    dispatch(setUnselectedListsCopy(a));
    dispatch(setSelectedLists(b));
    dispatch(setSelectedListsCopy(b));
  }

  function handleSelectedClick(list, index) {
    let a = [...selectedLists];
    a.splice(index, 1);
    let b = [...unselectedLists];
    b.push(list);
    b.sort(catSort);
    a.sort(catSort);
    dispatch(setSelectedLists(a));
    dispatch(setSelectedListsCopy(a));
    dispatch(setUnselectedLists(b));
    dispatch(setUnselectedListsCopy(b));
  }

  return (
    <div style={styles.categoryContainer}>
      {selectedListsCopy.map((list, index) => (
        <div style={styles.listContainer()} key={index.toString()}>
          <div
            style={styles.tickBox({
              background: "#8361FE",
              border: "0.8px solid #8361FE",
            })}
            onClick={(e) => handleSelectedClick(list, index)}
          >
            <DoneIcon style={{ fontSize: "12px", color: "white" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`https://ui-avatars.com/api/?name=${list?.label}&color=fff&background=979DA9&rounded=true&length=1`}
              alt="img"
              width={36}
              height={36}
            />
            <p
              style={{
                ...styles.textStyle({
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#0A0A0A",
                }),
                marginLeft: "8px",
                textTransform: "capitalize",
              }}
            >
              {list?.label}
            </p>
          </div>
        </div>
      ))}
      {unselectedListsCopy.map((list, index) => (
        <div
          style={styles.listContainer({
            background: "#fff",
            border: "1px solid #EBE9F1",
          })}
          key={index.toString()}
        >
          <div
            style={styles.tickBox()}
            onClick={(e) => handleUnselectedClick(list, index)}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`https://ui-avatars.com/api/?name=${list?.label}&color=fff&background=979DA9&rounded=true&length=1`}
              alt="img"
              width={36}
              height={36}
            />
            <p
              style={{
                ...styles.textStyle({
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#0A0A0A",
                }),
                marginLeft: "8px",
                textTransform: "capitalize",
              }}
            >
              {list?.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
