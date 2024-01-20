import React from 'react';
import Styles from './CompanyTable.module.css'; // Import the CSS module

const CompanyTableHeader = () => {
  return (
    <thead className={Styles.tableHeader}>
      <tr>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "260px" }}>
        <div className={`${Styles.headingContent} hover`}>
            Name&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "140px" }}>
          <div className={`${Styles.headingContent} hover`}>
            Label&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "180px" }}>
        <div className={`${Styles.headingContent} hover`}>
            Remark&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "200px" }}>
        <div className={`${Styles.headingContent} hover`}>
            Phone&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "140px" }}>
        <div className={`${Styles.headingContent} hover`}>
            Email&nbsp;&nbsp;
          </div>
        </th>
        <th scope="col" className={`fixed-header2 ${Styles.tableHeading}`} style={{ width: "140px" }}>
        <div className={`${Styles.headingContent} hover`}>
            Action&nbsp;&nbsp;
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default CompanyTableHeader;
