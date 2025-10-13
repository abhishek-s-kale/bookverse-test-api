import { ZodObject } from "zod";
import { RequestHandler } from "express";
import { ApiErrors } from "../errors/ApiErrors.js";

export const validate = (schema: ZodObject<any>): RequestHandler => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
           const first = result.error.issues[0];
           throw ApiErrors.badRequest(first.message);
        }
        req.body = result.data;
        next();
    };
};
