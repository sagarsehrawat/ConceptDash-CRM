import React, { useState } from 'react'
import TFSortModal from '../../../../components/modals/TFSortModal/TFSortModal';

const TableHeader = () => {
    const [sortModal, setsortModal] = useState<string>("");
    return (
      <thead className="table-header fixed-table-header">
        <tr>
          <th className="table-heading" style={{ width: "50px" }}>
          </th>
          <th className="table-heading" style={{ width: "160px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Invoice ID")}
            >
              Project ID
            </p>
            <TFSortModal
              show={sortModal === "Invoice ID"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
          <th className="table-heading" style={{ width: "160px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Client")}
            >
              Project Name
            </p>
            <TFSortModal
              show={sortModal === "Client"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
          <th className="table-heading" style={{ width: "140px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Project ID")}
            >
              Recieved
            </p>
            <TFSortModal
              show={sortModal === "Project ID"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
          <th className="table-heading" style={{ width: "150px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Deadline")}
            >
              Pending
            </p>
            <TFSortModal
              show={sortModal === "Deadline"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
          <th className="table-heading" style={{ width: "172px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Payment Status")}
            >
              Overdue
            </p>
            <TFSortModal
              show={sortModal === "Payment Status"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>         
          <th className="table-heading" style={{ width: "172px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Invoice Amount")}
            >
              Project Value
            </p>
            <TFSortModal
              show={sortModal === "Invoice Amount"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
          <th className="table-heading" style={{ width: "172px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Invoice Amount")}
            >
              Recieved Amount
            </p>
            <TFSortModal
              show={sortModal === "Invoice Amount"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
          <th className="table-heading" style={{ width: "172px" }}>
            <p
              className="table-heading-text"
              onClick={() => setsortModal("Invoice Amount")}
            >
              Balance
            </p>
            <TFSortModal
              show={sortModal === "Invoice Amount"}
              onHide={() => setsortModal("")}
              onClickAscending={() => setsortModal("")}
              onClickDesending={() => setsortModal("")}
            />
          </th>
        </tr>
      </thead>
    );
}

export default TableHeader