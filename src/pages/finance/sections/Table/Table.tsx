import React from 'react'
import TableRow from './TableRow';
import TableHeader from './TableHeader';

type Props = {
    setpage: Function;
}

const Table = ({setpage}: Props) => {
  return (
    <div className='table-wrapper'>
        <table className='w-100' style={{ borderCollapse: "separate" }}>
            <TableHeader />
            <tbody>
              <TableRow invoice={{}} setpage={setpage} />
            </tbody>
        </table>
    </div>
  )
}

export default Table