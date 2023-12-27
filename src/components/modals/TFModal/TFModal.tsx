import React from 'react'
import TFIcon from '../../ui/TFIcon/TFIcon';
import ICONS from '../../../constants/Icons';
import TFButton from '../../ui/TFButton/TFButton';
import './TFModal.css';

type Props = {
  show: boolean;
  onHide: Function;
  heading: string;
  children?: JSX.Element;
  onHandleSubmit: Function;
  style?: Object;
  className?: string;
}

const TFModal = ({ show, onHandleSubmit, onHide, heading, children = <></>, className = "", style = {} }: Props) => {
  return show && (
    <div className='tf-modal-backdrop d-flex justify-content-center align-items-center'>
      <div className={`tf-modal ${className}`} style={style}>
        <div className='tf-modal-header d-flex flex-row justify-content-between align-items-center'>
          <p className='tf-modal-heading'>{heading}</p>
          <TFIcon
            style={{ "cursor": "pointer" }}
            onClick={() => onHide()}
            icon={ICONS.CROSS_PRIMARY}
          />
        </div>
        {children}
        <div className='tf-modal-footer d-flex flex-row justify-content-end align-items-center'>
          <TFButton
            label='Cancel'
            variant='secondary'
            handleClick={() => onHide()}
          />
          <TFButton
            label='Save'
            variant='primary'
            handleClick={() => onHandleSubmit()}
          />
        </div>
      </div>
    </div>
  )
}

export default TFModal