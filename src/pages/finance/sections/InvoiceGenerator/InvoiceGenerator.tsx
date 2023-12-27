import React from "react";
import styles from "./InvoiceGenerator.module.css";
import TFDetailPage from "../../../../components/ui/TFDetailPage/TFDetailPage";
import TFButton from "../../../../components/ui/TFButton/TFButton";

type Props = {
  setpage: (val: string) => void;
};

const ROWS = [
    {
        label: "SubTotal",
        value: "$ 600.00"
    },
    {
        label: "Discount",
        value: "- 2.00 %"
    },
    {
        label: "SubTotal Less Discount",
        value: "$ 600"
    },
    {
        label: "HST Tax Rate",
        value: "13.00 %"
    },
    {
        label: "Total HST",
        value: "$ 750.79"
    },
    {
        label: "Shipping/Handling",
        value: "$ 150.00"
    },
]

const ROWS2 = [
    {
        label: "PO Amount",
        value: "$ 11373.00"
    },
    {
        label: "Amount Invoiced",
        value: "$ 600"
    },
    {
        label: "Amount Recieved",
        value: "$ 0"
    },
    {
        label: "Project Balance",
        value: "$10773.00"
    },
];

const InvoiceGenerator = ({ setpage }: Props) => {
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
                            <tr className={styles['table-row']}>
                                <td className={styles['table-cell-heading']}>Mititgation Measures</td>
                                <td className={styles['table-cell']}>LS</td>
                                <td className={styles['table-cell']}>2</td>
                                <td className={styles['table-cell']}>$ 200.00</td>
                                <td className={styles['table-cell']}>$ 400.00</td>
                            </tr>
                            <tr className={styles['table-row']}>
                                <td className={styles['table-cell-heading']}>Site Visits</td>
                                <td className={styles['table-cell']}>LS</td>
                                <td className={styles['table-cell']}>1</td>
                                <td className={styles['table-cell']}>$ 200.00</td>
                                <td className={styles['table-cell']}>$ 200.00</td>
                            </tr>
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
                            {
                                ROWS.map(row => (
                                    <tr className={styles['table-row2']}>
                                        <td className={styles['table-cell']}></td>
                                        <td className={styles['table-cell']}></td>
                                        <td className={styles['table-cell']}></td>
                                        <td className={styles['table-cell2']}>{row.label}</td>
                                        <td className={styles['table-cell']}>{row.value}</td>
                                    </tr>
                                ))
                            }
                            <tr className={styles['table-row2']}>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell']}></td>
                                <td className={styles['table-cell3']}>Balance Due</td>
                                <td className={styles['table-cell3']}>$ 6607.09</td>
                            </tr>
                            {
                                ROWS2.map(row => (
                                    <tr className={styles['table-row3']}>
                                        <td className={styles['table-cell']}></td>
                                        <td className={styles['table-cell']}></td>
                                        <td className={styles['table-cell']}></td>
                                        <td className={styles['table-cell2']}>{row.label}</td>
                                        <td className={styles['table-cell']}>{row.value}</td>
                                    </tr>
                                ))
                            }
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
