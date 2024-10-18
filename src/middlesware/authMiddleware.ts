import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the interface for the authenticated request
export interface AuthenticatedRequest extends Request {
    user?: { id: number }; // User ID should be a number
}

// Middleware function to authenticate the user
export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): void => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // If no token is found, respond with an unauthorized error
    if (!token) {
        res.status(401).json({ message: 'Authentication token required' });
    }

    // Ensure JWT secret is defined
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined');
        res.status(500).json({ message: 'Internal server error' });
    }

    try {
        // Verify the token and decode it
        const decodedToken = jwt.verify(
            token as string,
            process.env.JWT_SECRET as string,
        ) as JwtPayload;

        // Ensure the token contains the required id property
        if (!decodedToken || typeof decodedToken.id !== 'number') {
            res.status(401).json({ error: 'Invalid Token!' });
        }

        // Attach the user ID to the request object
        req.user = { id: decodedToken.id }; // Ensure user ID is a number
        next(); // Call the next middleware
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ error: 'Invalid Token!' });
    }
};
