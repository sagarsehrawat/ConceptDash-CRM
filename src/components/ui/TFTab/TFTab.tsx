import React from 'react'
import TFIcon from '../TFIcon/TFIcon';
import { PRIMARY_COLOR } from '../../../Main/Constants/Constants';
import './TFTab.css'

type Props = {
    icon?: string;
    focusedIcon?: string;
    onClick: Function;
    label: string;
    isSelected: boolean;
    value: string | number;
}

const TFTab = ({icon, onClick, label, isSelected, focusedIcon, value}: Props) => {
  return (
    <>
        <div 
        className='tf-tab-wrapper'
        style={{
            "borderBottom": isSelected ? "1px solid #8361FE" : "1px solid transparent"
        }}
        onClick={() => onClick(value)}
        >
            {isSelected ? focusedIcon ? <TFIcon icon={focusedIcon} /> : <TFIcon icon={icon} /> : <TFIcon icon={icon} />}
            <p className='tf-tab-label' style={{"color": isSelected ? PRIMARY_COLOR : "#70757A"}}>{label}</p>
        </div>
    </>
  )
}

export default TFTab;