import React from 'react'

const TableHeader = () => {
    return (
        <thead className='table-header fixed-table-header'>
            <tr>
                <th className='table-heading fixed-header-column' style={{ width: "250px" }}>
                    <p className='table-heading-text'>Project Name</p>
                </th>
                <th className='table-heading' style={{ width: "130px" }}>
                    Budget Amount
                </th>
                <th className='table-heading' style={{ width: "150px" }}>
                    Budget Category
                </th>
                <th className='table-heading' style={{ width: "230px" }}>
                    Department
                </th>
                <th className='table-heading' style={{ width: "200px" }}>
                    Project Category
                </th>
                <th className='table-heading' style={{ width: "100px" }}>
                    Serial No
                </th>
                <th className='table-heading' style={{ width: "120px" }}>
                    Action
                </th>
            </tr>
        </thead>
    )
}

export default TableHeader