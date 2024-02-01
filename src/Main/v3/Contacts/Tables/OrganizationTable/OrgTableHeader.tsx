import React from 'react';
import Styles from './OrgTable.module.css'; // Import the CSS module

const OrgTableHeader = () => {
  return (
    <thead className={Styles.tableHeader}>
      <tr>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "292px", paddingLeft: "32px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Company Name&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "120px", padding: "6px var(--8-pad, 13px)" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Label&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "180px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Website&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "120px", padding: "6px var(--8-pad, 13px)" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Contact Type&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "200px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Email&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "140px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Fax&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "64px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Action
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default OrgTableHeader;
