import React from 'react'
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFViewChip from '../../../../components/ui/TFViewChip/TFViewChip';

type Props = {
    invoice: Object;
    setpage: Function;
}

const TableRow = ({setpage}: Props) => {
  return (
    <tr style={{ width: "100%", backgroundColor: "white", verticalAlign: "top" }}>
        <td className='table-cell'>
            <div className='d-flex flex-column justify-content-center'>
                <p>IN 23 004</p>
                <p>23 Sep, 2023</p>
            </div>
        </td>
        <td className='table-cell'>
            <b>Concept Dash</b>
        </td>
        <td className='table-cell'>
            23 A 2023
        </td>
        <td className='table-cell'>
            <TFDateChip
                value={'2023-10-10'}

            />
        </td>
        <td className='table-cell'>
            <TFChip
                value='Recieved'
            />
        </td>
        <td className='table-cell'>
            <b>$ 120,000</b>
        </td>
        <td className='table-cell'>
        <TFViewChip
            label='Invoice'
            onClick={() => {setpage("INVOICE_GENERATOR")}} 
        />
        </td>
    </tr>
  )
}

export default TableRow