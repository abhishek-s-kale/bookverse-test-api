import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.ts";
import { User } from "../models/User.ts";
import { ApiErrors } from "../errors/ApiErrors.ts";

export const register = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw ApiErrors.badRequest("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiErrors.badRequest("Email already in use");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ userName, email, passwordHash });
  res.status(201).json({
    userName: newUser.userName,
    email: newUser.email,
  });
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw ApiErrors.badRequest("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiErrors.unAuthorized("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw ApiErrors.unAuthorized("Invalid email or password");
  }
  const token = generateToken({ id: user.id, email: user.email });
  res
    .status(201)
    .json({
      token,
      user: { id: user.id, userName: user.userName, email: user.email },
    });
};
