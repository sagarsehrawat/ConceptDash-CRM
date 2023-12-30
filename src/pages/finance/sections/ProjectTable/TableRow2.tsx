import React, { useEffect, useState } from "react";
import styles from "./ProjectTable.module.css";
import TFIcon from "../../../../components/ui/TFIcon/TFIcon";
import ICONS from "../../../../constants/Icons";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFViewChip from "../../../../components/ui/TFViewChip/TFViewChip";
import Utils from "../../../../utils/Utils";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../../../redux/slices/alertSlice";
import SERVICES from "../../../../services/Services";
import LoadingSpinner from "../../../../Main/Loader/Loader";

type Props = {
  setInvoiceId: Function;
  invoiceProject: InvoiceProject;
};

const TableRow2 = ({ setInvoiceId, invoiceProject }: Props) => {
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
        className={styles["table-row"]}
        style={{
          width: "100%",
          backgroundColor: "#F9FAFC",
          verticalAlign: "top",
        }}
      >
        <td className={styles["table-cell2"]}>
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
          <td colSpan={9} className={styles["table-container2"]}>
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
                    {invoices.map((invoice) => (
                      <tr>
                        <td
                          className={`${styles["table-cell"]} ${styles["border"]}`}
                        >
                          <div className="d-flex flex-column justify-content-center">
                            <p>
                              {invoice.invoice_code.split(" ").map((e, idx) => {
                                if (idx === 2) return <b>{e}</b>;
                                return e + " ";
                              })}
                            </p>
                            <p>{Utils.formatDate(invoice.date_created)}</p>
                          </div>
                        </td>
                        <td
                          className={`${styles["table-cell"]} ${styles["border"]}`}
                        >
                          <TFChip value={invoice.payment_status} />
                        </td>
                        <td
                          className={`${styles["table-cell"]} ${styles["border"]}`}
                        >
                          {invoice.company_name}
                        </td>
                        <td
                          className={`${styles["table-cell"]} ${styles["border"]}`}
                        >
                          <TFDateChip value={invoice.due_date} />
                        </td>
                        <td
                          className={`${styles["table-cell"]} ${styles["border"]}`}
                        >
                          <b>{Utils.formatMoney(invoice.total)}</b>
                        </td>
                        <td
                          className={`${styles["table-cell"]} ${styles["border"]}`}
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

export default TableRow2;
