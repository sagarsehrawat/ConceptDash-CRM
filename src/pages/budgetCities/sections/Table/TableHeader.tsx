import React from 'react'

const TableHeader = () => {
    return (
        <thead className='table-header fixed-table-header'>
            <tr>
                <th className='table-heading fixed-header-column' style={{ width: "200px" }}>
                    <p className='table-heading-text'>City</p>
                </th>
                <th className='table-heading' style={{ width: "150px" }}>
                    Region
                </th>
                <th className='table-heading' style={{ width: "130px" }}>
                    Population
                </th>
                <th className='table-heading' style={{ width: "150px" }}>
                    Capital Budget      2024
                </th>
                <th className='table-heading' style={{ width: "110px" }}>
                    2023 Budget
                </th>
                <th className='table-heading' style={{ width: "110px" }}>
                    2024 Budget
                </th>
                <th className='table-heading' style={{ width: "110px" }}>
                    2025 Budget
                </th>
                <th className='table-heading' style={{ width: "240px" }}>
                    Remarks
                </th>
               
                <th className='table-heading fixed-header-column' style={{ width: "150px", position: "sticky", right: 0, zIndex: 1}}>
                <p className='table-heading-text'>Action</p>
        </th>
            </tr>
        </thead>
    )
}

export default TableHeader