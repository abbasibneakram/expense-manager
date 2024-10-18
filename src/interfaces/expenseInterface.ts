export interface IExpense {
    id?: number;
    amount: number;
    category: string;
    date: Date;
    notes?: string;
    userId: number;
    receipt?: string;
}
