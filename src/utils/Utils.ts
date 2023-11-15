const Utils = {
    convertToTypeaheadOptions: <T extends Record<string, any>>(
        options: T[],
        labelKey: keyof T,
        valueKey: keyof T
    ): Array<{ value: T[keyof T], label: T[keyof T] }> =>
        options.map(option => ({
            value: option[valueKey],
            label: option[labelKey]
        })),

        calculatePercentage : (val : number, total : number) : number => {
            if (!total) return 0;
            
            return Math.round((val / total) * 100);
        }
};

export default Utils;