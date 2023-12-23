import React, { useState } from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import { useSelector } from 'react-redux'
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice'
// import AddRfp from '../../forms/AddRfp'
import ICONS from '../../../../constants/Icons'
import AddNewRfp from '../../forms/AddNewRfp/AddNewRfp'

type Props = {
  api: number,
  setApi: Function
}

const Header = ({api, setApi}: Props) => {
  const privileges: string[] = useSelector(selectPrivileges);
  const [show, setShow] = useState<boolean>(false)
  const editForm= null;
  return (
    <>
      <div className='d-flex flex-row justify-content-between align-items-center' style={{ margin: '32px 24px 0px 32px' }}>
        <p className='heading-2'>RFPs (Request For Proposals)</p>
        <TFButton icon={ICONS.PLUS_WHITE} label="Add New RFP" disabled={!privileges.includes("Add RFP")} handleClick={() => setShow(true)} />
      </div>
      {show && <AddNewRfp show={show} setShow={setShow} isEditing={false} editForm={editForm} api={api} setApi={setApi}/>}
    </>
  )
}

export default Header