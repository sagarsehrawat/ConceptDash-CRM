import React, { useState } from 'react'
import './TFOptionsModal.css'
import ICONS from '../../../constants/Icons'
import TFIcon from '../../ui/TFIcon/TFIcon'

const TFOptionsModal = ({addDesignation, deleteFunction, pid, cid, visible, type}) => {
    const [isVisible, setisVisible] = useState(false);
  return (
    <div className={`outer-container ${visible?'visible':'hidden'}`}>
        <div onClick={()=>setisVisible(!isVisible)}><TFIcon icon={ICONS.INFO} /></div>
        {isVisible ? (
            <div className='options-modal-container' id='options-modal'>
                {(type!=='tasks') && <div className='options-modal-inner-container'>
                    <div className='d-flex d-row justify-content-between' onClick={()=>{addDesignation(pid);setisVisible(false)}}>
                        <TFIcon icon={ICONS.PLUSGREY}/>
                        <div className='option-text'>Add column to the right</div>
                    </div>
                </div>}
                {/* {(type!=='tasks') && <div className='options-modal-inner-container'>
                    <div className='d-flex d-row justify-content-between'>
                        <TFIcon icon={ICONS.EDIT}/>
                        <div className='option-text'>Rename</div>
                    </div>
                </div>} */}
                <div className='options-modal-inner-container'>
                    <div className='d-flex d-row justify-content-between' onClick={()=>{deleteFunction(pid, cid);setisVisible(false)}}>
                        <TFIcon icon={ICONS.DELETE}/>
                        <div className='option-text'>Delete</div>
                    </div>
                </div>
            </div>
            ) : <></>
        }
        
    </div>
  )
}

export default TFOptionsModal
