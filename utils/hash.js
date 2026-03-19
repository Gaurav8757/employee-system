import argon from "argon2";

export const hashPassword = (password) => argon.hash(password);
export const comparePassword = (password, hash) => argon.verify(hash, password);