import { Router } from 'express'
import * as expenseController from '../controllers/expenseController'
import { authMiddleware } from '../middlesware/authMiddleware'

const router = Router()

router.post('/add', authMiddleware, expenseController.addExpense)
router.get('/all', authMiddleware, expenseController.getExpenses)
router.put('/update/:id', authMiddleware, expenseController.updateExpense)
router.delete('/delete/:id', authMiddleware, expenseController.deleteExpense)
router.get(
    '/filter/date',
    authMiddleware,
    expenseController.filterExpensesByDateRange
)
router.get(
    '/filter/category',
    authMiddleware,
    expenseController.filterExpensesByCategory
)
router.get('/summary', authMiddleware, expenseController.getExpenseSummary)

export default router
