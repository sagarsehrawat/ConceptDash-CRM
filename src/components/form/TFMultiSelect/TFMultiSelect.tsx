import React, { useRef, useState } from 'react'
import './TFMultiSelect.css'
import TFIcon from '../../ui/TFIcon/TFIcon';
import ICONS from '../../../constants/Icons';

type Props = {
    name: string;
    placeholder: string;
    onChange: (key: string, value: { label: string, value: string | number }) => void;
    options: { label: string, value: string | number }[];
    selectedOptions: { label: string, value: string | number }[];
    required: boolean;
    readOnly: boolean;
    width: string;
}

const TFMultiSelect = ({
    name,
    placeholder,
    onChange,
    selectedOptions,
    options,
    required,
    readOnly,
    width,
}: Props) => {
    const [value, setValue] = useState("");
    const [isVisible, setisVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div
                className="multiselect-wrapper"
                style={{ width: width }}
            >
                <div
                    className='multiselect-container'
                    onFocus={() => {
                        setisVisible(true);
                        if (inputRef && inputRef.current) inputRef.current.focus();
                    }}
                    onBlur={() => {
                        setValue("");
                        setisVisible(false);
                    }}
                >
                    {
                        selectedOptions.map((option, idx) => {
                            if (idx < 2) {
                                return (<div
                                    className='multiselect-selected-option-container'
                                    key={idx}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p className='multiselect-selected-option'>{option.label}</p>
                                    <TFIcon
                                        icon={ICONS.CROSS_PRIMARY}
                                        onClick={() => onChange(name, option)}
                                        style={{ "cursor": "pointer" }}
                                    />
                                </div>);
                            }
                        })
                    }
                    {
                        selectedOptions.length > 2 && (
                            <p className='multiselect-selected-option'>+ {selectedOptions.length - 2}</p>
                        )
                    }
                    <input
                        ref={inputRef}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="multiselect-input"
                        autoComplete="off"
                        required={required}
                        readOnly={readOnly}
                    />
                </div>
                {isVisible ? (
                    <div className="typeahead-options-modal" style={{ width: width }}>
                        {options.map((option) => {
                            if (option.label.toLowerCase().includes(value.toLowerCase())) {
                                return (
                                    <div
                                        className="multiselect-option-container"
                                        onMouseDown={() => {
                                            setValue(option.label);
                                            onChange(name, option);
                                        }}
                                        key={option.value}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={selectedOptions.some((item) => item.value === option.value)}
                                            className='multiselect-option-checkbox'
                                        />
                                        <p className='multiselect-option'>{option.label}</p>
                                    </div>
                                );
                            } else {
                                return <></>;
                            }
                        })}
                        {options.every(
                            (option) =>
                                !option.label.toLowerCase().includes(value.toLowerCase())
                        ) && (
                                <div className="typeahead-no-match-found" key="0">
                                    No Match Found
                                </div>
                            )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default TFMultiSelect