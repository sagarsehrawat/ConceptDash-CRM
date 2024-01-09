import React from "react";
import "./form-fields.css";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { cmpPages } from ".";
import TFInput from "../../components/form/TFInput/TFInput";
import TFMultiSelect from "../../components/form/TFMultiSelect/TFMultiSelect";

const animatedComponents = makeAnimated();

export default function FormFields({
  isRequired = true,
  type = "text",
  leftPlaceholder,
  rightPlaceholder,
  name,
  onChange,
  isSelect = false,
  isMulti = false,
  options,
  getOptionLabel,
  getOptionValue,
  value,
  isTemplate = false,
  setPage,
}) {
  return (
    <div className="cmp-ff-container">
      <div>
        <p>{leftPlaceholder}</p>
        {isRequired ? <p>*</p> : null}
      </div>
      <div>
        {!isSelect && !isTemplate ? (
          <TFInput
            placeholder={rightPlaceholder}
            name={name}
            onChange={onChange}
            required={isRequired}
            width="100%"
            value={value}
          />
        ) : isSelect && !isTemplate ? (
          <TFMultiSelect
            options={options}
            selectedOptions={value}
            width="100%"
            onChange={onChange}
            placeholder={rightPlaceholder}
          />
        ) : !isSelect && isTemplate ? (
          <button
            type="button"
            className="cmp-select-template-btn"
            onClick={(e) => setPage(cmpPages.choose_template)}
          >
            Choose Template
          </button>
        ) : null}
      </div>
    </div>
  );
}
