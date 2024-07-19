import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler, Request, Response, NextFunction } from 'express';

export const validationMiddleware = (dtoClass: any): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToClass(dtoClass, req.body);
        const errors: ValidationError[] = await validate(dtoObject, { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true });

        if (errors.length > 0) {
            console.log("errors:", errors);
            const message = errors.map((error: ValidationError) => Object.values(error.constraints ?? {}).join(', ')).join(', ');
            res.status(400).json({ message });
        } else {
            next();
        }
    };
};