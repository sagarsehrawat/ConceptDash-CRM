const Utils = {
    convertToTypeaheadOptions: <T extends Record<string, any>>(
        options: T[],
        labelKey: keyof T,
        valueKey: keyof T
    ): TypeaheadOptions =>
        options.map(option => ({
            value: option[valueKey],
            label: option[labelKey]
        })),

        calculatePercentage : (val : number, total : number) : number => {
            if (!total) return 0;
            
            return Math.round((val / total) * 100);
        },

        convertProjectCodeToArray: (projectCode : string | null) : string[] => {
            if(!projectCode) return [];
            const res = projectCode.match(/[A-Za-z]+|\d+/g) as string[];
            console.log(res);
            return res;
        }
};

export default Utils;