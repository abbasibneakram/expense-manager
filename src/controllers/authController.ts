import { Request, Response } from 'express'
import { signupService, loginService } from '../services/authService'

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body
        const user = await signupService(username, email, password)
        res.status(201).json({ message: 'User created successfully', user })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        const token = await loginService(email, password)
        res.status(200).json({ success: true, token })
    } catch (error: any) {
        if (error.message === 'No user found!') {
            res.status(404).json({ message: 'User not found' })
        }
        if (error.message === 'Invalid credentials') {
            res.status(401).json({ message: 'Invalid credentials' })
        }
        res.status(500).json({ message: 'Internal server error' })
    }
}
