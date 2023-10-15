const FormUtils = {

    typeInputForm: (setForm, key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    typeaheadForm: (setForm, key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value.label,
                [`${key}Id`]: value.value
            }
        });
    },

    radioButtonForm: (setForm, key, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [key]: value
            }
        });
    },

    checkboxForm: (setForm, key, value) => {
        setForm((prev) => {
            const newForm = { ...prev };

            const valueIndex = newForm[key].indexOf(value);

            if (valueIndex === -1) {
                newForm[key].push(value);
            } else {
                newForm[key].splice(valueIndex, 1);
            }

            return newForm;
        })
    }
};

export default FormUtils;