import React from "react";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFViewChip from "../../../../components/ui/TFViewChip/TFViewChip";
import Utils from "../../../../utils/Utils";

type Props = {
  invoice: Invoice;
  setInvoiceId: Function;
};

const TableRow = ({ setInvoiceId, invoice }: Props) => {
  return (
    <tr
      style={{ width: "100%", backgroundColor: "white", verticalAlign: "top" }}
    >
      <td className="table-cell">
        <div className="d-flex flex-column justify-content-center">
          <p>
            {invoice.invoice_code.split(" ").map((e, idx) => {
              if (idx === 2) return <b>{e}</b>;
              return e+ " ";
            })}
          </p>
          <p>{Utils.formatDate(invoice.date_created)}</p>
        </div>
      </td>
      <td className="table-cell">
        <b>{invoice.company_name}</b>
      </td>
      <td className="table-cell">
        {Utils.convertProjectCodeToArray(invoice.project_code).map((e, idx) => {
          if (idx === 1) return <b> {e} </b>;
          return e;
        })}
      </td>
      <td className="table-cell">
        <TFDateChip value={invoice.due_date} />
      </td>
      <td className="table-cell">
        <TFChip value={invoice.payment_status} />
      </td>
      <td className="table-cell">
        <b>{Utils.formatMoney(invoice.total)}</b>
      </td>
      <td className="table-cell">
        <TFViewChip
          label="Invoice"
          onClick={() => {
            setInvoiceId(invoice.invoice_id);
          }}
        />
      </td>
    </tr>
  );
};

export default TableRow;
