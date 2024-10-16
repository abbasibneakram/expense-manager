import { Op, fn, col } from 'sequelize'
import Expense from '../models/expenseModel'

import { IExpense } from '../interfaces/expenseInterface'

export const addExpense = async (expenseData: IExpense): Promise<IExpense> => {
    const expense = await Expense.create(expenseData)
    return expense
}

export const getExpenses = async (userId: number): Promise<IExpense[]> => {
    return await Expense.findAll({ where: { userId } })
}

export const updateExpense = async (
    id: number,
    updatedData: Partial<IExpense>
): Promise<void> => {
    await Expense.update(updatedData, { where: { id } })
}

export const deleteExpense = async (id: number): Promise<void> => {
    await Expense.destroy({ where: { id } })
}

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

export const filterExpensesByCategory = async (
    userId: number,
    category: string
): Promise<IExpense[]> => {
    return await Expense.findAll({ where: { userId, category } })
}

export const getExpenseSummary = async (userId: number): Promise<any> => {
    const totalSpent = await Expense.sum('amount', { where: { userId } })
    const categoryBreakdown = await Expense.findAll({
        attributes: ['category', [fn('sum', col('amount')), 'total']],
        where: { userId },
        group: ['category'],
    })

    return { totalSpent, categoryBreakdown }
}
