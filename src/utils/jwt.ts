import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN: string | number = isNaN(Number(process.env.JWT_EXPIRES_IN))
  ? (process.env.JWT_EXPIRES_IN ?? "2h")
  : Number(process.env.JWT_EXPIRES_IN);

export type JWTPayload = {
  id: string;
  email: string;
};

export const generateToken = (user: JWTPayload): string => {

  //temp fix for expires in error - need to use JWT_EXPIRES_IN later
  return jwt.sign(user, JWT_SECRET, { expiresIn: 36000 });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};
