import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { IUser } from '../interfaces/userInterface';
import {
    NotFoundError,
    UnauthorizedError,
    ConflictError,
} from '../utils/errors';

export const signupService = async (
    username: string,
    email: string,
    password: string,
): Promise<IUser> => {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ConflictError('User with this email already exists');
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return user;
};

export const loginService = async (
    email: string,
    password: string,
): Promise<string> => {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid credentials');
    }

    // Create a JWT payload
    const payload = {
        id: user.id,
    };

    // Ensure JWT secret is defined
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not defined');
    }

    // Sign the JWT token with a 1-hour expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
};
