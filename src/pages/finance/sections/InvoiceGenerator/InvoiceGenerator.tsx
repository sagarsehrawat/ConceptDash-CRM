import React, { useState } from "react";
import styles from "./InvoiceGenerator.module.css";
import TFDetailPage from "../../../../components/ui/TFDetailPage/TFDetailPage";
import TFButton from "../../../../components/ui/TFButton/TFButton";
import ttmData from "../../utils/ttm";
import InvoiceUtils from "../../utils/InvoiceGenerator.utils";

type Props = {
  setpage: (val: string) => void;
};

type InvoiceRow = {
    description: string;
    unit: string;
    quantity: number;
    unitPrice: number;
}

const InvoiceGenerator = ({ setpage }: Props) => {
    const ttm = {ttm: ttmData.ttm, rates: ttmData.employeeInfo[1] };
    const invoiceUtils = new InvoiceUtils(ttm);

    const [invoiceRows, setinvoiceRows] = useState<InvoiceRow[]>(invoiceUtils.formatTTM())
  return (
    <>
      <TFDetailPage
        handleBack={() => setpage("DEFAULT")}
        headerLabel="Generate Invoice"
        footerButtonLabel="Approve & Generate Invoice"
      >
        <div className="d-flex flex-column" style={{ gap: "32px" }}>
          <div className="d-flex flex-column" style={{ gap: "24px" }}>
            <div className="d-flex flex-column">
              <div className={styles["heading-container"]}>
                <p className={styles["heading"]}>Invoice Details - IN 23 004</p>
              </div>
              <div className={styles["subheading-container"]}>
                <p className={styles["date-subheading"]}>23 Sep, 2023</p>
              </div>
            </div>

            <div className="d-flex flex-row" style={{ gap: "24px" }}>
              <div className={styles["card"]}>
                <div className={styles["card-container"]}>
                  <p className={styles["card-heading"]}>
                    Bill To:{" "}
                    <p className={styles["card-subheading"]}>
                      Watercom Engineering Inc.
                    </p>
                  </p>
                  <p className={styles["card-address"]}>
                    1920 Younge Street, Suite 200 Toronto, ON M4S3E2 +1(123) 446
                    7890
                  </p>
                </div>
                <TFButton label="Change Details" variant="secondary" />
              </div>

              <div className={styles["card"]}>
                <div className={styles["card-container"]}>
                  <p className={styles["card-heading"]}>
                    Bill To:{" "}
                    <p className={styles["card-subheading"]}>
                      Watercom Engineering Inc.
                    </p>
                  </p>
                  <p className={styles["card-address"]}>
                    1920 Younge Street, Suite 200 Toronto, ON M4S3E2 +1(123) 446
                    7890
                  </p>
                </div>
                <TFButton label="Change Details" variant="secondary" />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column" style={{ gap: "20px" }}>
            <div className="d-flex flex-column">
              <div className={styles["heading-container"]}>
                <p className={styles["heading"]}>Project Name - Taskforce</p>
              </div>
              <div className={styles["subheading-container"]}>
                <p className={styles["project-subheading"]}>Project ID - 23 E 1044</p>
              </div>
            </div>

            <div className="d-flex flex-column">
                <div className={styles['table-wrapper']}>
                    <table className="w-100">
                        <thead>
                            <td className={styles['table-header']} style={{width: "400px"}}>Description</td>
                            <td className={styles['table-header']} style={{width: "54px"}}>Unit</td>
                            <td className={styles['table-header']} style={{width: "54px"}}>Quantity</td>
                            <td className={styles['table-header']} style={{width: "124px"}}>Unit Price</td>
                            <td className={styles['table-header']} style={{width: "124px"}}>Total</td>
                        </thead>
                        <tbody>
                            {
                                invoiceRows.map((e: any) => (
                                    <tr className={styles['table-row']}>
                                        <td className={styles['table-cell-heading']}>{e.description}</td>
                                        <td className={styles['table-cell']}>{e.unit}</td>
                                        <td className={styles['table-cell']}>{e.quantity}</td>
                                        <td className={styles['table-cell']}>$ {e.unitPrice}</td>
                                        <td className={styles['table-cell']}>$ {(e.unitPrice*e.quantity).toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <table className="w-100">
                    <thead className={styles['table-header2']}>
                            <td className={styles['table-header2']} style={{width: "400px"}}></td>
                            <td className={styles['table-header2']} style={{width: "54px"}}></td>
                            <td className={styles['table-header2']} style={{width: "54px"}}></td>
                            <td className={styles['table-header2']} style={{width: "124px"}}></td>
                            <td className={styles['table-header2']} style={{width: "124px"}}></td>
                        </thead>
                        <tbody>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>SubTotal</td>
                                <td className={styles['table-cell']}>$ {invoiceUtils.sumAllRows(invoiceRows)}</td>
                            </tr>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>Discount</td>
                                <td className={styles['table-cell']}>- 2.00 %</td>
                            </tr>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>SubTotal Less Discount</td>
                                <td className={styles['table-cell']}>$ {invoiceUtils.calculatePercent(invoiceRows, 2)}</td>
                            </tr>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>HST Tax Rate</td>
                                <td className={styles['table-cell']}>13.00 %</td>
                            </tr>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>Total HST</td>
                                <td className={styles['table-cell']}>$ {invoiceUtils.calculatePercent(invoiceRows, 13)}</td>
                            </tr>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>Shipping/ Handling</td>
                                <td className={styles['table-cell']}>$ 0.00</td>
                            </tr>
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell3']}>Balance Due</td>
                                <td className={styles['table-cell3']}>$ {invoiceUtils.calculateBalance(invoiceRows, 2)}</td>
                            </tr>
                            <tr className={styles['table-row3']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>PO Amount</td>
                                <td className={styles['table-cell']}>$ 11373.00</td>
                            </tr>
                            <tr className={styles['table-row3']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>Amount Invoiced</td>
                                <td className={styles['table-cell']}>$ {invoiceUtils.calculateBalance(invoiceRows, 2)}</td>
                            </tr>
                            <tr className={styles['table-row3']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>Amount Recieved</td>
                                <td className={styles['table-cell']}></td>
                            </tr>
                            <tr className={styles['table-row3']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell2']}>Project Balance</td>
                                <td className={styles['table-cell']}>$ 10773.00</td>
                            </tr>
                        </tbody>
                </table>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-start align-items-start">
            <p className={styles['heading']}>Remarks/ Payment Instruction</p>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>Email Transfer : </p>&nbsp;
                <p className={styles['bank-details']}>vsharma@conceptdash.ca</p>
            </div>
            <p className={styles['card-address']}>Bank Details :</p>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>Bank Name : </p>&nbsp;
                <p className={styles['bank-details']}>BMO Bank of Montreal</p>
            </div>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>Bank Address : </p>&nbsp;
                <p className={styles['bank-details']}>26 Fort York Blvd, Toronto, ON Canada, M5V 3Z3</p>
            </div>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>Account Number : </p>&nbsp;
                <p className={styles['bank-details']}>1990 -043</p>
            </div>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>Transit Number : </p>&nbsp;
                <p className={styles['bank-details']}>20682</p>
            </div>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>Institution Number : </p>&nbsp;
                <p className={styles['bank-details']}>001</p>
            </div>
            <div className="d-flex flex-row">
                <p className={styles['card-address']}>SWIFT Code : </p>&nbsp;
                <p className={styles['bank-details']}>BOFMCAT2XXX</p>
            </div>
          </div>
        </div>
      </TFDetailPage>
    </>
  );
};

export default InvoiceGenerator;
