type InvoiceRow = {
    description: string;
    unit: string;
    quantity: number;
    unitPrice: number;
}

class InvoiceUtils {
    ttm: any;

    constructor(ttm: any) {
        this.ttm = ttm;
    }

    formatTTM(): InvoiceRow[] {
        return this.ttm.ttm.map((task: any) => {
            return task.subtasks
                .filter((subtask: any) => subtask.status !== 0)
                .map((subtask: any) => {
                    return {
                        description: subtask.TaskName,
                        unit: "LS",
                        quantity: 1,
                        unitPrice: parseFloat(subtask.hrs.reduce((acc: number, currentValue: number, index: number) => acc + currentValue * this.ttm.rates[index], 0).toFixed(2))
                    };
                });
        }).flat();
    }

    sumAllRows(invoiceRows: InvoiceRow[]): string {
        return this._sum(invoiceRows).toFixed(2);
    }

    calculatePercent(invoiceRows: InvoiceRow[], discount: number): string {
        const percent = discount / 100;
        return (this._sum(invoiceRows) * percent).toFixed(2);
    }

    calculateBalance(invoiceRows: InvoiceRow[], discount: number): string {
        const discountPercent = discount / 100;
        const taxPercent = 13 / 100;
        return (this._sum(invoiceRows) + (this._sum(invoiceRows) * discountPercent) + (this._sum(invoiceRows) * taxPercent)).toFixed(2);
    }

    _sum(invoiceRows: InvoiceRow[]): number {
        return invoiceRows.reduce((acc, row) => acc + (row.unitPrice * row.quantity), 0)
    }
}

export default InvoiceUtils