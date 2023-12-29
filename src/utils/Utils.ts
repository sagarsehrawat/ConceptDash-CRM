import moment from "moment";

const Utils = {
  convertToTypeaheadOptions: <T extends Record<string, any>>(
    options: T[],
    labelKey: keyof T,
    valueKey: keyof T
  ): TypeaheadOptions =>
    options.map((option) => ({
      value: option[valueKey],
      label: option[labelKey],
    })),

  calculatePercentage: (val: number, total: number): number => {
    if (!total) return 0;

    return Math.round((val / total) * 100);
  },

  convertProjectCodeToArray: (projectCode: string | null): string[] => {
    if (!projectCode) return [];
    const res = projectCode.match(/[A-Za-z]+|\d+/g) as string[];

    return res;
  },

  formatMoney: (value: number | null): string => {
    if(value === null) return "$ 0";
    return `$ ${Intl.NumberFormat('en-US').format(value)}`;
  },

  formatDate: (date: moment.Moment | string | null): string => {
    return moment(date).isValid() ? moment(date).format('DD MMM, YYYY') : "";
  }
};

export default Utils;
