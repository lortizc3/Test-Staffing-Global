import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../repositories/user.repository.js';
import { ApiError } from '../utils/api-error.js';
import { signAccessToken } from '../utils/jwt.js';

export const authService = {
  async register(input: { name: string; email: string; password: string; role?: 'ADMIN' | 'MEMBER' }) {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already registered');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({ ...input, passwordHash });
    const token = signAccessToken({ userId: user.id, role: user.role });

    return { user, token };
  },

  async login(input: { email: string; password: string }) {
    const existingUser = await userRepository.findByEmail(input.email);
    if (!existingUser) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(input.password, existingUser.passwordHash);
    if (!isValidPassword) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = signAccessToken({ userId: existingUser.id, role: existingUser.role });

    return {
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        createdAt: existingUser.createdAt,
      },
      token,
    };
  },

  async me(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  },
};
