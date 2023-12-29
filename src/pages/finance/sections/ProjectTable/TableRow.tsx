import React, { useEffect, useState } from "react";
import styles from "./ProjectTable.module.css";
import TFIcon from "../../../../components/ui/TFIcon/TFIcon";
import ICONS from "../../../../constants/Icons";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFViewChip from "../../../../components/ui/TFViewChip/TFViewChip";
import Utils from "../../../../utils/Utils";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../../../redux/slices/alertSlice";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import SERVICES from "../../../../services/Services";

type Props = {
  setInvoiceId: Function;
  invoiceProject: InvoiceProject;
};

const TableRow = ({ setInvoiceId, invoiceProject }: Props) => {
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await SERVICES.getProjectInvoices(
          invoiceProject.project_id
        );
        console.log(res);
        setInvoices(res.res);
      } catch (error) {
        console.log(error);
        dispatch(showErrorModal("Something Went Wrong!"));
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [isVisible]);

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
        <td className={styles["table-cell"]}>
          {Utils.convertProjectCodeToArray(invoiceProject.project_code).map(
            (e, idx) => {
              if (idx === 1) return <b> {e} </b>;
              return e;
            }
          )}
        </td>
        <td className={styles["table-cell"]}>{invoiceProject.project_name}</td>
        <td className={styles["table-cell"]}>{invoiceProject.recieved ?? 0}</td>
        <td className={styles["table-cell"]}>{invoiceProject.pending ?? 0}</td>
        <td className={styles["table-cell"]}>{invoiceProject.overdue ?? 0}</td>
        <td className={styles["table-cell"]}>
          {Utils.formatMoney(invoiceProject.project_value)}
        </td>
        <td className={styles["table-cell"]}>
          {Utils.formatMoney(invoiceProject.recieved_amount)}
        </td>
        <td className={styles["table-cell"]}>
          {Utils.formatMoney(invoiceProject.balance)}
        </td>
      </tr>
      {isVisible && (
        <tr>
          <td colSpan={9} className={styles["table-container"]}>
            <div className={styles["table-wrapper"]}>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingSpinner />
                </div>
              ) : (
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
                    {invoices.map((invoice) => (
                      <tr>
                        <td
                          className={`${styles["table-cell2"]} ${styles["border"]}`}
                        >
                          <div className="d-flex flex-column justify-content-center">
                            <p>
                              {invoice.invoice_code.split(" ").map((e, idx) => {
                                if (idx === 2) return <b>{e}</b>;
                                return e;
                              })}
                            </p>
                            <p>{Utils.formatDate(invoice.date_created)}</p>
                          </div>
                        </td>
                        <td
                          className={`${styles["table-cell2"]} ${styles["border"]}`}
                        >
                          <TFChip value={invoice.payment_status} />
                        </td>
                        <td
                          className={`${styles["table-cell2"]} ${styles["border"]}`}
                        >
                          Concept Dash
                        </td>
                        <td
                          className={`${styles["table-cell2"]} ${styles["border"]}`}
                        >
                          <TFDateChip value={invoice.due_date} />
                        </td>
                        <td
                          className={`${styles["table-cell2"]} ${styles["border"]}`}
                        >
                          <b>{Utils.formatMoney(invoice.total)}</b>
                        </td>
                        <td
                          className={`${styles["table-cell2"]} ${styles["border"]}`}
                        >
                          <TFViewChip
                            label="Invoice"
                            onClick={() => {
                              setInvoiceId(invoice.invoice_id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
