const Utils = {
    convertToTypeaheadOptions: <T extends Record<string, any>>(
        options: T[],
        labelKey: keyof T,
        valueKey: keyof T
    ): Array<{ value: T[keyof T], label: T[keyof T] }> =>
        options.map(option => ({
            value: option[valueKey],
            label: option[labelKey]
        }))
};

export default Utils;