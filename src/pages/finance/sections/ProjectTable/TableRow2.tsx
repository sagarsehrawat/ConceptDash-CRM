import React, { useState } from "react";
import styles from "./ProjectTable.module.css";
import TFIcon from "../../../../components/ui/TFIcon/TFIcon";
import ICONS from "../../../../constants/Icons";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFViewChip from "../../../../components/ui/TFViewChip/TFViewChip";

type Props = {
  setpage: Function;
};

const TableRow2 = ({setpage}: Props) => {
    const [isVisible, setisVisible] = useState<boolean>(false);
  return (
    <>
      <tr
        className={styles["table-row"]}
        style={{
          width: "100%",
          backgroundColor: "#F9FAFC",
          verticalAlign: "top",
        }}
      >
        <td className={styles["table-cell2"]}>
          <TFIcon icon={isVisible ? ICONS.ARROW_DROPDOWN_CLOSE_BLACK : ICONS.ARROW_DROPDOWN_OPEN_BLACK} onClick={() => setisVisible(prev => !prev)} />
        </td>
        <td className={styles["table-cell2"]}>23 A 2023</td>
        <td className={styles["table-cell2"]}>Taskforce</td>
        <td className={styles["table-cell2"]}>12</td>
        <td className={styles["table-cell2"]}>12</td>
        <td className={styles["table-cell2"]}>12</td>
        <td className={styles["table-cell2"]}>$ 112,000</td>
        <td className={styles["table-cell2"]}>$ 12,000</td>
        <td className={styles["table-cell2"]}>$ 100,000</td>
      </tr>
      {isVisible && (
        <tr>
          <td colSpan={9} className={styles["table-container2"]}>
            <div className={styles["table-wrapper"]}>
              <table className={`${styles["inner-table"]} w-100`}>
                <thead>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#FFF" }}
                  >
                    Invoice ID
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#FFF" }}
                  >
                    Payment Status
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#FFF" }}
                  >
                    Client
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#FFF" }}
                  >
                    Deadline
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#FFF" }}
                  >
                    Invoice Amount
                  </th>
                  <th
                    className={styles["table-heading"]}
                    style={{ width: "160px", background: "#FFF" }}
                  ></th>
                </thead>
                <tbody>
                  <tr>
                    <td className={`${styles["table-cell"]} ${styles['border']}`}>
                      <div className="d-flex flex-column justify-content-center">
                        <p>IN 23 004</p>
                        <p>23 Sep, 2023</p>
                      </div>
                    </td>
                    <td className={`${styles["table-cell"]} ${styles['border']}`}>
                      <TFChip value="Recieved" />
                    </td>
                    <td className={`${styles["table-cell"]} ${styles['border']}`}>Concept Dash</td>
                    <td className={`${styles["table-cell"]} ${styles['border']}`}>
                      <TFDateChip value={"2023-10-10"} />
                    </td>
                    <td className={`${styles["table-cell"]} ${styles['border']}`}>
                      <b>$ 120,000</b>
                    </td>
                    <td className={`${styles["table-cell"]} ${styles['border']}`}>
                      <TFViewChip label="Invoice" onClick={() => {setpage('INVOICE_GENERATOR')}} />
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

export default TableRow2;
