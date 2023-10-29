import React, { useState } from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import { useSelector } from 'react-redux'
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice'
import cross from '../../../../Images/cross.svg'
import tIcon from '../../../../Images/taskIcon.svg'
import RFPform from '../../forms/RFPform'
import { Modal } from 'react-bootstrap'
import TFIcon from '../../../../components/ui/TFIcon/TFIcon'
import ICONS from '../../../../constants/Icons'

type Props = {
  api: number,
  setApi: Function
}

const Header = ({api, setApi}: Props) => {
  const privileges: string[] = useSelector(selectPrivileges);
  const [show, setShow] = useState<boolean>(false)

  return (
    <>
      <div className='d-flex flex-row justify-content-between align-items-center' style={{ margin: '32px 24px 0px 32px' }}>
        <p className='heading-2'>RFPs (Request For Proposals)</p>
        <TFButton icon={ICONS.PLUS_WHITE} label="Add New RFP" disabled={!privileges.includes("Add RFP")} handleClick={() => setShow(true)} />
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        style={{
          position: "absolute",
          width: "780px",
          height: 'fit-content',
          left: "28vw",
          marginTop: "4vh",
          background: "#FFFFFF",
          boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
      }}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div className='d-flex flex-row justify-content-between align-items-center' style={{ marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection: 'row' }}>
          <div className='d-flex flex-row'>
            <TFIcon icon={tIcon} />
            <div className='heading-2'>Add New RFP</div>
          </div>
          <div><img onClick={() => setShow(false)} style={{ marginRight: '26px', marginTop: '6px', float: 'right' }} src={cross} /></div>
        </div>
        {
          <RFPform
            closeModal={() => setShow(false)}
            api={api}
            apiCall={setApi}
          />
        }
      </Modal>
    </>
  )
}

export default Header