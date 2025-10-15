import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.ts";
import { ApiErrors } from "../errors/ApiErrors.ts";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const auth = String(req.headers.authorization ?? "");
  if (!auth.startsWith("Bearer ")) {
    return next(ApiErrors.unAuthorized("No token provided"));
  }
  const token = auth.replace("Bearer ", "");
  try {
    const user = verifyToken(token);
    (req as any).user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    return next(ApiErrors.unAuthorized("Invalid token"));
  }
};
