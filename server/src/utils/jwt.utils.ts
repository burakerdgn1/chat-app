import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (user: { id: string; userName: string }): string => {
    return jwt.sign(user, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    try {
        const x = jwt.verify(token, secret);
        return x;
    } catch (e) {
        return null;
    }
};