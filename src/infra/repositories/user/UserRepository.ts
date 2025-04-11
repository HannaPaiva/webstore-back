import { PrismaClient, User } from '@prisma/client';
import CreateUserRequest from '../../../shareable/dtos/user/CreateUserRequest.js';
import { UserResponse } from '../../../shareable/dtos/user/UserResponse.js';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roleId: data.roleId,
      },
    });

    return this.toResponseDTO(user);
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toResponseDTO(user) : null;
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.toResponseDTO(user));
  }

  async updateUser(id: string, data: Partial<CreateUserRequest>): Promise<UserResponse | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roleId: data.roleId,
      },
    });

    return this.toResponseDTO(user);
  }

  async deleteUser(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return this.toResponseDTO(user);
  }

  private toResponseDTO(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
    };
  }
}
