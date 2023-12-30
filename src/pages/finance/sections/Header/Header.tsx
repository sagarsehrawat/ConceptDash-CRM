import React from 'react'
import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar'

type Props = {
    variant: "AP" | "AR";
    tab: string;
}

const Header = ({ tab} : Props) => {
  return (
    <div className='w-100' style={{background: "white", padding: "14px 32px 32px 18px"}}>
        <div style={{margin: "0px 0px 14px 0px"}}>
            <p className='heading-2' >{tab}</p>
        </div>

        <div className='d-flex flex-row justify-content-start'>
            <TFSearchBar
                placeholder="Invoice"
            />
        </div>
    </div>
  )
}

export default Header