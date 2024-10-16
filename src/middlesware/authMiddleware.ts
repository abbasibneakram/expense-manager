import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AuthenticatedRequest extends Request {
    user?: any // Adjust the type here to match your payload structure, e.g., { id: string }
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.status(401).json({ message: 'Authentication token required' })
        return // Explicit return for void
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = decodedToken
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ error: 'Invalid Token!' })
    }
}
