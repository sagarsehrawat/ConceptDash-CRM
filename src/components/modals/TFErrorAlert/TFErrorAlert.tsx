import React, { useEffect } from 'react'
import './TFErrorAlert.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeErrorModal, selectErrorMessage } from '../../../redux/slices/alertSlice';
import TFIcon from '../../ui/TFIcon/TFIcon';
import ICONS from '../../../constants/Icons';

type Props = {}

const TFErrorAlert = (props: Props) => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        const timer = setTimeout(() => {
          dispatch(removeErrorModal());
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [errorMessage]);

  return errorMessage!=="" && (
    <div className='tf-alert-backdrop d-flex justify-content-end align-items-start'>
        <div className='tf-error-alert d-flex flex-row align-items-center'>
            <div className='error-square-container d-flex justify-content-center align-items-center'>
                <div className='error-circle-container d-flex justify-content-center align-items-center'>
                    <TFIcon icon={ICONS.WARNING_RED} />
                </div>
            </div>
        <div>
            <p className='alert-heading'>Error!!</p>
            <p className='alert-subheading'>{errorMessage}</p>
        </div>
        </div>
    </div>
  );
}

export default TFErrorAlert