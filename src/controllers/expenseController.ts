// import { Request, Response } from 'express'
// import { AuthRequest } from '../middlesware/authMiddleware'
// import * as expenseService from '../services/expenseService'
// import { IExpense } from '../interfaces/expenseInterface'

// export const addExpense = async (req: AuthRequest, res: Response) => {
//     try {
//         const expenseData: IExpense = { ...req.body, userId: req.user.id } // Assuming req.user contains authenticated user info
//         const newExpense = await expenseService.addExpense(expenseData)
//         res.status(201).json(newExpense)
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const getExpenses = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const expenses = await expenseService.getExpenses(req.user.id)
//         res.status(200).json(expenses)
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const updateExpense = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { id } = req.params
//         await expenseService.updateExpense(Number(id), req.body)
//         res.status(200).json({ message: 'Expense updated successfully' })
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const deleteExpense = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { id } = req.params
//         await expenseService.deleteExpense(Number(id))
//         res.status(200).json({ message: 'Expense deleted successfully' })
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const filterExpensesByDateRange = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { startDate, endDate } = req.query
//         const expenses = await expenseService.filterExpensesByDateRange(
//             req.user.id,
//             new Date(startDate as string),
//             new Date(endDate as string)
//         )
//         res.status(200).json(expenses)
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const filterExpensesByCategory = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { category } = req.query
//         const expenses = await expenseService.filterExpensesByCategory(
//             req.user.id,
//             category as string
//         )
//         res.status(200).json(expenses)
//     } catch (error: any) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const getExpenseSummary = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const summary = await expenseService.getExpenseSummary(req.user.id)
//         res.status(200).json(summary)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }
