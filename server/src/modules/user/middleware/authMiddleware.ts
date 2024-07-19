import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../../../utils/jwt.utils';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            console.log("Access denied, invalid token")
            return res.status(401).json({ message: 'Access denied, invalid token' });
        }
        req.body.id = (decoded as any).id;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
} 