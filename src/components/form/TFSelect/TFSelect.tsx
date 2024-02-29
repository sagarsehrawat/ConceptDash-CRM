import React, { useState } from 'react'
import TFIcon from '../../ui/TFIcon/TFIcon';
import ICONS from '../../../constants/Icons';
import './TFSelect.css';

type Props = {
    name?: string;
    placeholder?: string;
    value: string;
    onChange: Function;
    options: TypeaheadOptions;
    required?: boolean;
    readOnly?: boolean;
    className?: string;
}

const TFSelect = ({
    name = "",
    placeholder = "",
    value,
    onChange,
    options = [],
    readOnly = false,
}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
  
    return (
        <>
            <div className='tf-select-container'>
                <div 
                className='tf-select d-flex flex-row align-items-center'
                style={{
                    "backgroundColor": isVisible ? "#F6F7F7" : "#FFF",
                    "border": isVisible ? "0.6px solid #7367F0" : "0.6px solid #FFF"
                }} 
                onBlur={() => setIsVisible(false)}
                onClick={() => setIsVisible(true)}>
                    <p className='tf-selected-option'>{value === "" || value === null ? placeholder : value}</p>
                    <TFIcon
                        icon={ICONS.CHEVRON_DOWN_PRIMARY}
                    />
                </div>
                {!readOnly && isVisible &&
                    <div className='typeahead-options-modal w-100'>
                        {placeholder !== "" && <div
                            className="typeahead-option"
                            onMouseDown={() => {
                              onChange(name, "");
                              setIsVisible(false);
                            }}
                          >
                            {placeholder}
                          </div>}
                        {options.map(option => 
                            <div
                            className="typeahead-option"
                            onMouseDown={() => {
                              onChange(name, option.value);
                              setIsVisible(false);
                            }}
                            key={option.value}
                          >
                            {option.label}
                          </div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}

export default TFSelect