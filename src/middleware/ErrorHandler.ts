import { Request, Response, NextFunction } from 'express';
import { ApiErrors } from '../errors/ApiErrors';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiErrors) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    
    //@ts-ignore
    if (err?.name === "ZodError" && err?.issues) {
        return res.status(400).json({ error: "Validation Error", details: err.issues });
    }
    return res.status(500).json({ error: "Internal Server Error" });
};