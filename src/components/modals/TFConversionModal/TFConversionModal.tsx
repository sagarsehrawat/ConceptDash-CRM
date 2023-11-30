import React, { useEffect } from 'react'
import cross from '../../../Images/cross.svg'
import TFButton from '../../ui/TFButton/TFButton';
import './TFConversionModal.css'

type Props = {
    show: boolean,
    onConfirm: Function
    onHide: Function
  };

const TFConversionModal = ({show, onConfirm, onHide}: Props) => {
    useEffect(() => {
        if(show) document.body.style.overflow = 'hidden';
        if(!show) document.body.style.overflow = 'unset';
     }, [show]);
  return (

    show && (
    <>
        <div className="tf-modal-backdrop d-flex justify-content-center align-items-center">
            <div className="tf-conversion-modal">
                <div className="conversion-modal-header">
                    <img onClick={()=>onHide()} src={cross}/>
                </div>
                <div className='conversion-modal-body'>
                    <div className='conversion-modal-body-header'>Convert RFP to Proposal ?</div>
                    <div className="conversion-modal-body-text">
                        Are you sure you want to convert this Request for Proposal (RFP) to a Proposal?
                        This action is irreversible and will transfer all associated files and folders to the Proposals section.
                  </div>
                </div>
                <div className="tf-conversion-modal-footer d-flex d-row justify-content-between">
                  <TFButton label="No, Cancel" variant='secondary' className='tf-modal-conversion-button-cancel' handleClick={()=>onHide()}/>
                  <TFButton label="Yes, Confirm" variant='primary' handleClick={()=>{onConfirm()}} className='tf-modal-conversion-button'/>
              </div>
            </div>
        </div>
    </>
    )
  )
}

export default TFConversionModal