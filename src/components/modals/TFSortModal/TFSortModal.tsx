import React, { useEffect, useRef } from 'react'
import TFIcon from '../../ui/TFIcon/TFIcon';
import ICONS from '../../../constants/Icons';
import './TFSortModal.css'

type Props = {
    show: boolean;
    onClickAscending: () => void;
    onClickDesending: () => void;
    onHide: () => void;
}

const TFSortModal = ({show, onClickAscending, onClickDesending, onHide}: Props) => {
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        onHide();
      }
    };

  return show && (
    <div className='tf-sort-modal'>
        <div
          className='d-flex flex-row justify-content-around sort-modal-container'
          onClick={() => {
            onClickAscending();
            onHide();
          }}
        >
          <TFIcon icon={ICONS.ARROW_DROPDOWN_CLOSE_BLACK} />
          <p className='sort-text'>Sort Ascending</p>
        </div>
        <div
          className='d-flex flex-row justify-content-around sort-hover'
          onClick={() => {
            onClickDesending();
            onHide();
          }}
        >
            <TFIcon icon={ICONS.ARROW_DROPDOWN_CLOSE_BLACK} />
          <p className='sort-text'>Sort Descending</p>
        </div>
      </div>
  )
}

export default TFSortModal