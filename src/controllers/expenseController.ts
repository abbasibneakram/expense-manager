import { Request, Response } from 'express'
import * as expenseService from '../services/expenseService'
import { IExpense } from '../types/expenseInterface'
import { AuthenticatedRequest } from '../middlesware/authMiddleware'

// Adding a new expense
export const addExpense = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const expenseData: IExpense = { ...req.body, userId: req.user.id } // Assuming req.user contains authenticated user info
        const newExpense = await expenseService.addExpense(expenseData)
        res.status(201).json(newExpense)
    } catch (error) {
        handleError(res, error)
    }
}

// Getting all expenses for a user
export const getExpenses = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const expenses = await expenseService.getExpenses(req.user.id)
        res.status(200).json(expenses)
    } catch (error) {
        handleError(res, error)
    }
}

// Updating an existing expense
export const updateExpense = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params
        await expenseService.updateExpense(Number(id), {
            ...req.body,
            userId: req.user.id,
        })
        res.status(200).json({ message: 'Expense updated successfully' })
    } catch (error) {
        handleError(res, error)
    }
}

// Deleting an expense
export const deleteExpense = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params
        await expenseService.deleteExpense(Number(id))
        res.status(200).json({ message: 'Expense deleted successfully' })
    } catch (error) {
        handleError(res, error)
    }
}

// Filtering expenses by date range
export const filterExpensesByDateRange = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { startDate, endDate } = req.query
        if (!startDate || !endDate) {
            res.status(400).json({
                message: 'Start date and end date are required.',
            })
            return
        }

        const expenses = await expenseService.filterExpensesByDateRange(
            req.user.id,
            new Date(startDate as string),
            new Date(endDate as string)
        )
        res.status(200).json(expenses)
    } catch (error) {
        handleError(res, error)
    }
}

// Filtering expenses by category
export const filterExpensesByCategory = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { category } = req.query
        if (!category) {
            res.status(400).json({ message: 'Category is required.' })
            return
        }

        const expenses = await expenseService.filterExpensesByCategory(
            req.user.id,
            category as string
        )
        res.status(200).json(expenses)
    } catch (error) {
        handleError(res, error)
    }
}

// Getting expense summary
export const getExpenseSummary = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const summary = await expenseService.getExpenseSummary(req.user.id)
        res.status(200).json(summary)
    } catch (error) {
        handleError(res, error)
    }
}

// Centralized error handler
const handleError = (res: Response, error: unknown): void => {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message })
    } else {
        res.status(500).json({ message: 'An unexpected error occurred.' })
    }
}
