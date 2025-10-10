import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";



const router = express.Router();

// Dummy route for authentication
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // registration logic
    res.status(201).json({ message: 'User registered successfully', username, email });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // authentication logic
    res.json({ message: 'Login successful', email });
});

export default router;
