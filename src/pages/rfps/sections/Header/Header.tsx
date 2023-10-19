import React from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import { useSelector } from 'react-redux'

type Props = {}

const Header = (props: Props) => {
  const selector = useSelector();
  return (
    <>
      <div className='d-flex flex-row justify-content-between' style={styles.headerContainer}>
        <p className='heading-2'>RFPs (Request For Proposals)</p>
        <TFButton icon={plusIcon} label="Add New RFP" disabled={!privileges.includes("Add RFP")} handleClick={handleShow} />
      </div>
    </>
  )
}

export default Header