import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({quiet: true});

export const signToken = (user) =>
  sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  });