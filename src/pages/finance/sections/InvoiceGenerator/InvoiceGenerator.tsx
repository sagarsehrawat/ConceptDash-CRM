import React, { useEffect, useState } from "react";
import styles from "./InvoiceGenerator.module.css";
import TFDetailPage from "../../../../components/ui/TFDetailPage/TFDetailPage";
import TFButton from "../../../../components/ui/TFButton/TFButton";
import { useDispatch } from "react-redux";
import SERVICES from "../../../../services/Services";
import { showErrorModal } from "../../../../redux/slices/alertSlice";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import Utils from "../../../../utils/Utils";

type Props = {
  invoiceId: number;
  setInvoiceId: Function;
};

const InvoiceGenerator = ({ invoiceId, setInvoiceId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invoice, setInvoice] = useState<Invoice>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await SERVICES.getInvoiceDetails(invoiceId);
        console.log(res);
        setInvoice(res.res);
      } catch (error) {
        console.log(error);
        dispatch(showErrorModal("Something Went Wrong!"));
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <TFDetailPage
        handleBack={() => setInvoiceId(null)}
        headerLabel="Generate Invoice"
        footerButtonLabel="Approve & Generate Invoice"
      >
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <LoadingSpinner />
          </div>
        ) : (
          invoice && (
            <div className="d-flex flex-column" style={{ gap: "32px" }}>
              <div className="d-flex flex-column" style={{ gap: "24px" }}>
                <div className="d-flex flex-column">
                  <div className={styles["heading-container"]}>
                    <p className={styles["heading"]}>
                      Invoice Details - {invoice.invoice_code}
                    </p>
                  </div>
                  <div className={styles["subheading-container"]}>
                    <p className={styles["date-subheading"]}>
                      {Utils.formatDate(invoice.date_created)}
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row" style={{ gap: "24px" }}>
                  <div className={styles["card"]}>
                    <div className={styles["card-container"]}>
                      <p className={styles["card-heading"]}>
                        Bill To:{" "}
                        <p className={styles["card-subheading"]}>
                          {invoice.company_name ?? ""}
                        </p>
                      </p>
                      <p className={styles["card-address"]}>
                        {invoice.address ?? ""} {invoice.business_phone ?? ""}
                      </p>
                    </div>
                    <TFButton label="Change Details" variant="secondary" />
                  </div>

                  <div className={styles["card"]}>
                    <div className={styles["card-container"]}>
                      <p className={styles["card-heading"]}>
                        Bill To:{" "}
                        <p className={styles["card-subheading"]}>
                          {invoice.company_name ?? ""}
                        </p>
                      </p>
                      <p className={styles["card-address"]}>
                        {invoice.address ?? ""} {invoice.business_phone ?? ""}
                      </p>
                    </div>
                    <TFButton label="Change Details" variant="secondary" />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column" style={{ gap: "20px" }}>
                <div className="d-flex flex-column">
                  <div className={styles["heading-container"]}>
                    <p className={styles["heading"]}>
                      Project Name - {invoice.project_name}
                    </p>
                  </div>
                  <div className={styles["subheading-container"]}>
                    <p className={styles["project-subheading"]}>
                      Project ID -{" "}
                      {Utils.convertProjectCodeToArray(
                        invoice.project_code
                      ).join(" ")}
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <div className={styles["table-wrapper"]}>
                    <table className="w-100">
                      <thead>
                        <td
                          className={styles["table-header"]}
                          style={{ width: "400px" }}
                        >
                          Description
                        </td>
                        <td
                          className={styles["table-header"]}
                          style={{ width: "54px" }}
                        >
                          Unit
                        </td>
                        <td
                          className={styles["table-header"]}
                          style={{ width: "54px" }}
                        >
                          Quantity
                        </td>
                        <td
                          className={styles["table-header"]}
                          style={{ width: "124px" }}
                        >
                          Unit Price
                        </td>
                        <td
                          className={styles["table-header"]}
                          style={{ width: "124px" }}
                        >
                          Total
                        </td>
                      </thead>
                      <tbody>
                        {invoice.rows.map((e) => (
                          <tr className={styles["table-row"]}>
                            <td className={styles["table-cell-heading"]}>
                              {e.description}
                            </td>
                            <td className={styles["table-cell"]}>{e.unit}</td>
                            <td className={styles["table-cell"]}>
                              {e.quantity.toFixed(2)}
                            </td>
                            <td className={styles["table-cell"]}>
                              {Utils.formatMoney(e.unitPrice)}
                            </td>
                            <td className={styles["table-cell"]}>
                              {Utils.formatMoney((e.total))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <table className="w-100">
                    <thead className={styles["table-header2"]}>
                      <td
                        className={styles["table-header2"]}
                        style={{ width: "400px" }}
                      ></td>
                      <td
                        className={styles["table-header2"]}
                        style={{ width: "54px" }}
                      ></td>
                      <td
                        className={styles["table-header2"]}
                        style={{ width: "54px" }}
                      ></td>
                      <td
                        className={styles["table-header2"]}
                        style={{ width: "124px" }}
                      ></td>
                      <td
                        className={styles["table-header2"]}
                        style={{ width: "124px" }}
                      ></td>
                    </thead>
                    <tbody>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>SubTotal</td>
                        <td className={styles["table-cell"]}>
                          {Utils.formatMoney(invoice.subtotal)}
                        </td>
                      </tr>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>Discount</td>
                        <td className={styles["table-cell"]}>- 0.00 %</td>
                      </tr>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>
                          SubTotal Less Discount
                        </td>
                        <td className={styles["table-cell"]}>
                          {Utils.formatMoney(invoice.discount)}
                        </td>
                      </tr>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>HST Tax Rate</td>
                        <td className={styles["table-cell"]}>13.00 %</td>
                      </tr>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>Total HST</td>
                        <td className={styles["table-cell"]}>
                          {Utils.formatMoney(invoice.tax)}
                        </td>
                      </tr>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>
                          Shipping/ Handling
                        </td>
                        <td className={styles["table-cell"]}>
                          {Utils.formatMoney(invoice.shipping)}
                        </td>
                      </tr>
                      <tr className={styles["table-row2"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell3"]}>Balance Due</td>
                        <td className={styles["table-cell3"]}>
                          {Utils.formatMoney(invoice.total)}
                        </td>
                      </tr>
                      <tr className={styles["table-row3"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>PO Amount</td>
                        <td className={styles["table-cell"]}>{Utils.formatMoney(invoice.project_value)}</td>
                      </tr>
                      <tr className={styles["table-row3"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>
                          Amount Invoiced
                        </td>
                        <td className={styles["table-cell"]}>
                          {Utils.formatMoney(invoice.total)}
                        </td>
                      </tr>
                      <tr className={styles["table-row3"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>
                          Amount Recieved
                        </td>
                        <td className={styles["table-cell"]}>{Utils.formatMoney(invoice.recieved_amount)}</td>
                      </tr>
                      <tr className={styles["table-row3"]}>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell"]}></td>
                        <td className={styles["table-cell2"]}>
                          Project Balance
                        </td>
                        <td className={styles["table-cell"]}>{Utils.formatMoney((invoice.project_value ?? 0) - (invoice.recieved_amount ?? 0) - (invoice.total))}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex flex-column justify-content-start align-items-start">
                <p className={styles["heading"]}>
                  Remarks/ Payment Instruction
                </p>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>Email Transfer : </p>
                  &nbsp;
                  <p className={styles["bank-details"]}>
                    vsharma@conceptdash.ca
                  </p>
                </div>
                <p className={styles["card-address"]}>Bank Details :</p>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>Bank Name : </p>&nbsp;
                  <p className={styles["bank-details"]}>BMO Bank of Montreal</p>
                </div>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>Bank Address : </p>
                  &nbsp;
                  <p className={styles["bank-details"]}>
                    26 Fort York Blvd, Toronto, ON Canada, M5V 3Z3
                  </p>
                </div>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>Account Number : </p>
                  &nbsp;
                  <p className={styles["bank-details"]}>1990 -043</p>
                </div>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>Transit Number : </p>
                  &nbsp;
                  <p className={styles["bank-details"]}>20682</p>
                </div>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>
                    Institution Number :{" "}
                  </p>
                  &nbsp;
                  <p className={styles["bank-details"]}>001</p>
                </div>
                <div className="d-flex flex-row">
                  <p className={styles["card-address"]}>SWIFT Code : </p>&nbsp;
                  <p className={styles["bank-details"]}>BOFMCAT2XXX</p>
                </div>
              </div>
            </div>
          )
        )}
      </TFDetailPage>
    </>
  );
};

export default InvoiceGenerator;
