import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableRow2 from "./TableRow2";

type Props = {
  setpage: Function;
};

const ProjectTable = ({setpage}: Props) => {
  return (
    <div className="table-wrapper">
      <table className={`w-100`} style={{ borderCollapse: "separate" }}>
        <TableHeader />
        <tbody>
          <TableRow setpage={setpage} />
          <TableRow2 setpage={setpage} />
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
