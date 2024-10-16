import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AuthRequest extends Request {
    userId?: string
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token)
        return res
            .status(401)
            .json({ message: 'Authentication token required' })
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Invalid token' })
        req.userId = decoded.id
        next()
    })
}
