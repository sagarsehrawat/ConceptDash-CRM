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
                [key]: value.label,
                [`${key}Id`]: value.value
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
    }
});

export default FormUtils;