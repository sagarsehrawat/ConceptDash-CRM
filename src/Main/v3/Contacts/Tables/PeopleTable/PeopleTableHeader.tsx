import React from 'react';
import Styles from './PeopleTable.module.css'; // Import the CSS module

const PeopleTableHeader = () => {
  return (
    <thead className={Styles.tableHeader}>
      <tr>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "292px", paddingLeft: "32px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Name&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "120px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Label&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "180px" }}>
          <div className={`hover ${Styles.headingContent}`}>
            Organisation&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "150px" }}>
          <div className={`hover`} style={{ display: "inline", cursor: "pointer" }}>
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
            Phone&nbsp;&nbsp;
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

export default PeopleTableHeader;
