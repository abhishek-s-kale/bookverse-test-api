import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { users } from "../data/mockData";
import { randomUUID } from "crypto";
import { generateToken } from '../utils/jwt';
import { validate } from "../middleware/validate";
import { ApiErrors } from "../errors/ApiErrors";

const router = express.Router();
const registerSchema = z.object({
    userName: z.string().min(3),
    email: z.email(),
    password: z.string().min(6)
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

// Dummy route for authentication
router.post('/register', validate(registerSchema), (req, res, next) => {
    const { userName, email, password } = req.body as z.infer<typeof registerSchema>;
    const exists = users.find((u) => u.email === email);
    if (exists) {
        return next(ApiErrors.badRequest("Email already registered"));
    }
    const user = {
        id: randomUUID(),
        userName,
        email,
        passwordHash: bcrypt.hashSync(password, 8)
    }
    users.push(user);
    const token = generateToken({ id: user.id, email: user.email })
    res.status(201).json({ token, user: { id: user.id, userName: user.userName, email: user.email } });
});

router.post('/login',validate(loginSchema), (req, res,next) => {
    const { email, password } = req.body as z.infer<typeof loginSchema>;
   
    const user = users.find((u)=>u.email===email)
    console.log(user)
    console.log(bcrypt.decodeBase64(user.passwordHash,8))
    if(!user){
        return next(ApiErrors.unAuthorized("Invalid credentials. Email Not found"));
    }
    const pwdCheck = bcrypt.compareSync(password,user.passwordHash);
    if(!pwdCheck){
        return next(ApiErrors.unAuthorized("Invalid credentials. Email or Password is not correct."))
    }
    const token = generateToken({ id: user.id, email: user.email })
    res.status(201).json({ token, user: { id: user.id, userName: user.userName, email: user.email } });
});

export default router;
