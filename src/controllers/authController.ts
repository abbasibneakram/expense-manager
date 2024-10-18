import { Request, Response } from 'express';
import { signupService, loginService } from '../services/authService';
import { NotFoundError, UnauthorizedError } from '../utils/errors';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        const user = await signupService(username, email, password);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: error.message });
        } else {
            console.error('Unexpected error creating user:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const token = await loginService(email, password);
        res.status(200).json({ token });
    } catch (error: unknown) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        }
        if (error instanceof UnauthorizedError) {
            res.status(401).json({ message: error.message });
        }
        console.error('Unhandled error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
