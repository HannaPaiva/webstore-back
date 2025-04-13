import { PrismaClient, Prisma } from '@prisma/client';
import CreateUserRequest from '../../../shareable/dtos/user/CreateUserRequest.js';
import { UserResponse } from '../../../shareable/dtos/user/UserResponse.js';
import { RoleResponse } from '../../../shareable/dtos/role/RoleResponse.js';

type UserWithRole = Prisma.UserGetPayload<{ include: { role: true } }>;

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const user = await this.prisma.user.create({
      data,
      include: { role: true },
    });
    return this.toResponseDTO(user);
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: { role: true },
    });
  
    return user ? this.toResponseDTO(user) : null;
  }
  

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany({
      where: { isDeleted: false },
      include: { role: true },
    });
  
    return users.map(this.toResponseDTO);
  }
  

  async updateUser(id: string, data: Partial<CreateUserRequest>): Promise<UserResponse | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: { role: true },
    });
    return this.toResponseDTO(user);
  }

  async deleteUser(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isDeleted: true },
      include: { role: true },
    });
  
    return this.toResponseDTO(user);
  }
  

  private toResponseDTO(user: UserWithRole): UserResponse {
    const role: RoleResponse = {
      id: user.role.id,
      name: user.role.name,
      label: user.role.label,
      isDeleted: user.role.isDeleted,
      createdAt: user.role.createdAt,
      updatedAt: user.role.updatedAt,
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role,
    };
  }
}
