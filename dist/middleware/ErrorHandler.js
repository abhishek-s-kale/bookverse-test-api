import { ApiErrors } from '../errors/ApiErrors.js';
export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiErrors) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    //@ts-ignore
    if (err?.name === "ZodError" && err?.issues) {
        return res.status(400).json({ error: "Validation Error", details: err.issues });
    }
    return res.status(500).json({ error: "Internal Server Error" });
};
