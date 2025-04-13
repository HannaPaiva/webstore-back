// src/services/AuthService.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserResponse } from '../shareable/dtos/user/UserResponse.js';
import { RoleResponse } from '../shareable/dtos/role/RoleResponse.js';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export class AuthService {
  async login(email: string, password: string): Promise<{ token: string; user: UserResponse } | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }, // include the role object
    });

    if (!user || !user.role) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    const token = jwt.sign({ userId: user.id, roleId: user.role.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const role: RoleResponse = {
      id: user.role.id,
      name: user.role.name,
      label: user.role.label,
      isDeleted: user.role.isDeleted,
      createdAt: user.role.createdAt,
      updatedAt: user.role.updatedAt,
    };

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        role,
      },
    };
  }

  verifyToken(token: string): { userId: string; roleId: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string; roleId: string };
    } catch (err) {
      return null;
    }
  }
}

export const authService = new AuthService();
