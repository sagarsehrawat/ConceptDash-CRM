import React, { useState } from "react";
import styles from "./ProjectTable.module.css";
import TFIcon from "../../../../components/ui/TFIcon/TFIcon";
import ICONS from "../../../../constants/Icons";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFViewChip from "../../../../components/ui/TFViewChip/TFViewChip";

type Props = {
  setpage: Function;
};

const TableRow = ({setpage}: Props) => {
  const [isVisible, setisVisible] = useState<boolean>(false);
  return (
    <>
      <tr
        style={{
          width: "100%",
          backgroundColor: "white",
          verticalAlign: "top",
        }}
      >
        <td className={styles["table-cell"]}>
          <TFIcon
            icon={
              isVisible
                ? ICONS.ARROW_DROPDOWN_CLOSE_BLACK
                : ICONS.ARROW_DROPDOWN_OPEN_BLACK
            }
            onClick={() => setisVisible((prev) => !prev)}
          />
        </td>
        <td className={styles["table-cell"]}>23 A 2023</td>
        <td className={styles["table-cell"]}>Taskforce</td>
        <td className={styles["table-cell"]}>12</td>
        <td className={styles["table-cell"]}>12</td>
        <td className={styles["table-cell"]}>12</td>
        <td className={styles["table-cell"]}>$ 112,000</td>
        <td className={styles["table-cell"]}>$ 12,000</td>
        <td className={styles["table-cell"]}>$ 100,000</td>
      </tr>
      {isVisible && (
        <tr>
          <td colSpan={9} className={styles["table-container"]}>
            <div className={styles["table-wrapper"]}>
              <table className={`${styles["inner-table"]} w-100`}>
                <thead>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#F9FAFC" }}
                  >
                    Invoice ID
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#F9FAFC" }}
                  >
                    Payment Status
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#F9FAFC" }}
                  >
                    Client
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#F9FAFC" }}
                  >
                    Deadline
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#F9FAFC" }}
                  >
                    Invoice Amount
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#F9FAFC" }}
                  ></th>
                </thead>
                <tbody>
                  <tr>
                    <td className={`${styles["table-cell2"]} ${styles['border']}`}>
                      <div className="d-flex flex-column justify-content-center">
                        <p>IN 23 004</p>
                        <p>23 Sep, 2023</p>
                      </div>
                    </td>
                    <td className={`${styles["table-cell2"]} ${styles['border']}`}>
                      <TFChip value="Recieved" />
                    </td>
                    <td className={`${styles["table-cell2"]} ${styles['border']}`}>Concept Dash</td>
                    <td className={`${styles["table-cell2"]} ${styles['border']}`}>
                      <TFDateChip value={"2023-10-10"} />
                    </td>
                    <td className={`${styles["table-cell2"]} ${styles['border']}`}>
                      <b>$ 120,000</b>
                    </td>
                    <td className={`${styles["table-cell2"]} ${styles['border']}`}>
                      <TFViewChip label="Invoice" onClick={() => {setpage("INVOICE_GENERATOR")}} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
