export interface IExpense {
    id?: number
    userId: number // Assuming user association for multi-user support
    amount: number
    category: string
    date: Date
    notes?: string
}
