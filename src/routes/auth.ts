import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {register, login}  from "../controllers/authController.js";
import { users } from "../data/mockData.js";
import { randomUUID } from "crypto";
import { generateToken } from '../utils/jwt.js';
import { validate } from "../middleware/validate.js";
import { ApiErrors } from "../errors/ApiErrors.js";

const router = express.Router();
const registerSchema = z.object({
    userName: z.string().min(3),
    email: z.email(),
    password: z.string().min(8)
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

// Dummy route for authentication
router.post('/register', validate(registerSchema),register);

router.post('/login',validate(loginSchema),login);

export default router;
