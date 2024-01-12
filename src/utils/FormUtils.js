const FormUtils = (setForm) => ({
    typeInputForm: (key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    typeaheadForm: (key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value.label || value,
                [`${key}Id`]: value.value || value
            }
        });
    },

    radioButtonForm: (key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    checkboxForm: (key, value) => {
        setForm((prev) => {
            const newForm = { ...prev };

            const valueIndex = newForm[key].indexOf(value);

            if (valueIndex === -1) {
                newForm[key] = [...newForm[key], value];
            } else {
                newForm[key] = newForm[key].filter(item => item !== value);
            }

            return newForm;
        });
    },

    dropdownForm: (key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    inputFilesForm: (key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    selectForm: (key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    multiSelectForm: (key, value) => {
        setForm((prev) => {
            const isValueInArray = prev[key].some((item) => item.value === value.value);
      
          if (isValueInArray) {
            const updatedArray = prev[key].filter((item) => item.value !== value.value);

            return {
              ...prev,
              [key]: updatedArray,
            };
          } else {
            return {
              ...prev,
              [key]: [...prev[key], value],
            };
          }
        });
      }
});

export default FormUtils;