export interface Rating {
    personalDetails: {
        name: string;
        age: number;
        idNumber: string;
    };
    property: {
        requestedLoanAmount: number;
        propertyValue: number;
        equity: number;
    };
    incomes: Array<{
        sum: number;
        source: string;
        seniority: number;
    }>;
    payingOut: {
        monthlyRefund: number;
        sumDebts: number;
    };
    history: {
        economicHistory: string
    };
}

