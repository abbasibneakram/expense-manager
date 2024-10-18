import { Response } from 'express';
import * as expenseService from '../services/expenseService';
import { AuthenticatedRequest } from '../middlesware/authMiddleware'; // Ensure this is imported

// Add a new expense
export const addExpense = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const receipt = req.file ? req.file.path : '';
        const expenseData = {
            ...req.body, // Get the amount, category, and notes from the request body
            receipt, // Add the receipt path to the expenseData
        };
        //const expenseData = req.body; // Validate this data as needed
        const expense = await expenseService.addExpense(userId, expenseData);
        res.status(201).json(expense);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error adding expense:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Unexpected error adding expense:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Get all expenses for a specific user
export const getExpenses = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const expenses = await expenseService.getExpenses(req.user!.id);
        res.status(200).json(expenses);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Unexpected error fetching expenses:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Update an existing expense
export const updateExpense = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const expenseId = Number(req.params.id); // Ensure you validate this ID
        const updatedData = req.body; // Validate this data as needed
        await expenseService.updateExpense(
            req.user!.id,
            expenseId,
            updatedData,
        );
        res.status(204).send(); // No content
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error updating expense:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Unexpected error updating expense:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Delete an expense
export const deleteExpense = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const expenseId = Number(req.params.id); // Ensure you validate this ID
        await expenseService.deleteExpense(req.user!.id, expenseId);
        res.status(204).send(); // No content
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Unexpected error deleting expense:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Filter expenses by date range for a specific user
export const filterExpensesByDateRange = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const { startDate, endDate } = req.body; // Validate these dates
        const expenses = await expenseService.filterExpensesByDateRange(
            req.user!.id,
            new Date(startDate),
            new Date(endDate),
        );
        res.status(200).json(expenses);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error filtering expenses by date range:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error(
                'Unexpected error filtering expenses by date range:',
                error,
            );
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Filter expenses by category for a specific user
export const filterExpensesByCategory = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const { category } = req.body; // Validate this category
        const expenses = await expenseService.filterExpensesByCategory(
            req.user!.id,
            category,
        );
        res.status(200).json(expenses);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error filtering expenses by category:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error(
                'Unexpected error filtering expenses by category:',
                error,
            );
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Get summary of expenses for a specific user
export const getExpenseSummary = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const summary = await expenseService.getExpenseSummary(req.user!.id);
        res.status(200).json(summary);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching expense summary:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Unexpected error fetching expense summary:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};
