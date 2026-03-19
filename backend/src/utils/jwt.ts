import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export type TokenPayload = {
  userId: string;
  role: 'ADMIN' | 'MEMBER';
};

const signOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
};

export const signAccessToken = (payload: TokenPayload) => jwt.sign(payload, env.JWT_ACCESS_SECRET, signOptions);

export const verifyAccessToken = (token: string) => jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
