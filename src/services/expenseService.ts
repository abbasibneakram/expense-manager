import { Op, fn, col } from 'sequelize';
import Expense from '../models/expenseModel';
import { IExpense } from '../interfaces/expenseInterface';
import { NotFoundError } from '../utils/errors'; // Ensure this is imported

// Add a new expense
export const addExpense = async (
    userId: number,
    expenseData: {
        amount: number; // Removed id since it's typically auto-generated
        category: string;
        receipt?: string;
        notes?: string;
    },
): Promise<IExpense> => {
    const { amount, category, receipt = '', notes = '' } = expenseData;

    // Validate expense data here if needed

    const expense = await Expense.create({
        userId,
        amount,
        category,
        receipt,
        notes,
        date: new Date(),
    });

    return expense;
};

// Get all expenses for a specific user
export const getExpenses = async (userId: number): Promise<IExpense[]> => {
    return await Expense.findAll({ where: { userId } });
};

// Update an existing expense
export const updateExpense = async (
    userId: number,
    expenseId: number,
    updatedData: Partial<IExpense>,
): Promise<void> => {
    const [updatedRowsCount] = await Expense.update(updatedData, {
        where: { id: expenseId, userId },
    });
    if (updatedRowsCount === 0) {
        throw new NotFoundError(
            `Expense with ID ${expenseId} not found for user ${userId}`,
        );
    }
};

// Delete an expense
export const deleteExpense = async (
    userId: number,
    expenseId: number,
): Promise<void> => {
    const deletedRowsCount = await Expense.destroy({
        where: { id: expenseId, userId },
    });
    if (deletedRowsCount === 0) {
        throw new NotFoundError(
            `Expense with ID ${expenseId} not found for user ${userId}`,
        );
    }
};

// Filter expenses by date range for a specific user
export const filterExpensesByDateRange = async (
    userId: number,
    startDate: Date,
    endDate: Date,
): Promise<IExpense[]> => {
    return await Expense.findAll({
        where: {
            userId,
            date: { [Op.between]: [startDate, endDate] },
        },
    });
};

// Filter expenses by category for a specific user
export const filterExpensesByCategory = async (
    userId: number,
    category: string,
): Promise<IExpense[]> => {
    return await Expense.findAll({ where: { userId, category } });
};

// Get summary of expenses for a specific user
export const getExpenseSummary = async (userId: number): Promise<any> => {
    const totalSpent = await Expense.sum('amount', { where: { userId } });
    const categoryBreakdown = await Expense.findAll({
        attributes: ['category', [fn('sum', col('amount')), 'total']],
        where: { userId },
        group: ['category'],
    });

    return { totalSpent, categoryBreakdown };
};
