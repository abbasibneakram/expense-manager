import { Op, fn, col } from 'sequelize'
import Expense from '../models/expenseModel'
import { IExpense } from '../types/expenseInterface'

// Add a new expense
export const addExpense = async (expenseData: IExpense): Promise<IExpense> => {
    const expense = await Expense.create(expenseData)
    return expense
}

// Get all expenses for a specific user
export const getExpenses = async (userId: number): Promise<IExpense[]> => {
    return await Expense.findAll({ where: { userId } })
}

// Update an existing expense
export const updateExpense = async (
    id: number,
    updatedData: Partial<IExpense>
): Promise<void> => {
    const [updatedRowsCount] = await Expense.update(updatedData, {
        where: { id },
    })
    if (updatedRowsCount === 0) {
        throw new Error(`Expense with ID ${id} not found`)
    }
}

// Delete an expense
export const deleteExpense = async (id: number): Promise<void> => {
    const deletedRowsCount = await Expense.destroy({ where: { id } })
    if (deletedRowsCount === 0) {
        throw new Error(`Expense with ID ${id} not found`)
    }
}

// Filter expenses by date range for a specific user
export const filterExpensesByDateRange = async (
    userId: number,
    startDate: Date,
    endDate: Date
): Promise<IExpense[]> => {
    return await Expense.findAll({
        where: {
            userId,
            date: { [Op.between]: [startDate, endDate] },
        },
    })
}

// Filter expenses by category for a specific user
export const filterExpensesByCategory = async (
    userId: number,
    category: string
): Promise<IExpense[]> => {
    return await Expense.findAll({ where: { userId, category } })
}

// Get summary of expenses for a specific user
export const getExpenseSummary = async (userId: number): Promise<any> => {
    const totalSpent = await Expense.sum('amount', { where: { userId } })
    const categoryBreakdown = await Expense.findAll({
        attributes: ['category', [fn('sum', col('amount')), 'total']],
        where: { userId },
        group: ['category'],
    })

    return { totalSpent, categoryBreakdown }
}
