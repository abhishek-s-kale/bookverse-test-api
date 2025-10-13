import { verifyToken } from "../utils/jwt.js";
import { ApiErrors } from "../errors/ApiErrors.js";
export const authMiddleware = (req, res, next) => {
    const auth = String(req.headers.authorization ?? "");
    if (!auth.startsWith("Bearer ")) {
        return next(ApiErrors.unAuthorized("No token provided"));
    }
    const token = auth.replace("Bearer ", "");
    try {
        const user = verifyToken(token);
        req.user = { id: user.id, email: user.email };
        next();
    }
    catch (error) {
        return next(ApiErrors.unAuthorized("Invalid token"));
    }
};
