import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { IUser } from '../types/userInterface'
import { NotFoundError, UnauthorizedError } from '../utils/errors'

export const signupService = async (
    username: string,
    email: string,
    password: string
): Promise<IUser> => {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
        throw new Error('User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    return user
}

export const loginService = async (
    email: string,
    password: string
): Promise<string> => {
    const user = await User.findOne({ where: { email } })
    if (!user) {
        throw new NotFoundError('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        console.log('Login Service: Invalid credentials')
        throw new UnauthorizedError('Invalid credentials')
    }
    const payload = {
        id: user.id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    })
    return token
}
