import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableRow2 from "./TableRow2";

const ProjectTable = () => {
  return (
    <div className="table-wrapper">
      <table className={`w-100`} style={{ borderCollapse: "separate" }}>
        <TableHeader />
        <tbody>
          <TableRow />
          <TableRow2 />
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
