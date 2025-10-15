import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {register, login}  from "../controllers/authController.ts";
import { users } from "../data/mockData.ts";
import { randomUUID } from "crypto";
import { generateToken } from '../utils/jwt.js';
import { validate } from "../middleware/validate.ts";
import { ApiErrors } from "../errors/ApiErrors.ts";

const router = express.Router();
export const registerSchema = z.object({
    userName: z.string().min(3),
    email: z.email(),
    password: z.string()
        .min(8)
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one symbol')
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

// Dummy route for authentication
router.post('/register', validate(registerSchema),register);

router.post('/login',validate(loginSchema),login);

export default router;
