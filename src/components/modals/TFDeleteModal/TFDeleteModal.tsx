import React, { useEffect, useState } from "react";
import TFIcon from "../../ui/TFIcon/TFIcon";
import ICONS from "../../../constants/Icons";
import './TFDeleteModal.css'
import TFInput from "../../form/TFInput/TFInput";
import TFButton from "../../ui/TFButton/TFButton";

type Props = {
  show: boolean,
  onHide: Function,
  onDelete: Function,
  label: string,
};

const TFDeleteModal = ({ show, onHide, onDelete, label }: Props) => {

  const [value, setvalue] = useState<string>("")

  const onChange = (_key: string, value: string) => {setvalue(value)};

  useEffect(() => {
    if(show) document.body.style.overflow = 'hidden';
    if(!show) document.body.style.overflow = 'unset';
 }, [show]);
  return (
    show && (
      <>
        <div className="tf-modal-backdrop d-flex justify-content-center align-items-center">
          <div className="tf-delete-modal">
              <div className="delete-modal-header">
                  <TFIcon icon={ICONS.WARNING_RED}/>
              </div>
              <div className="delete-modal-body">
                  <div className="delete-modal-body-heading">
                    Delete the {label}?
                  </div>
                  <div className="delete-modal-body-text">
                    This action cannot be undone. All values 
                    associated with this field  will be lost.
                  </div>
              </div>
              <div className="tf-delete-modal-input">
                  <TFInput name='input' placeholder='Type the word delete' width='100%' onChange={onChange}/>
              </div>
              <div className="tf-delete-modal-footer d-flex d-row justify-content-between">
                  <TFButton label="Cancel" variant='secondary' className='tf-modal-delete-button-cancel' handleClick={()=>onHide()}/>
                  <TFButton label="Yes, Delete" variant='primary' disabled={value!=="delete"} handleClick={()=>{onDelete(); setvalue(""); onHide();}} className='tf-modal-delete-button'/>
              </div>
          </div>
        </div>
      </>
    )
  );
};

export default TFDeleteModal;
