// src/services/UserService.ts

import bcrypt from 'bcryptjs';
import CreateUserRequest from '../shareable/dtos/user/CreateUserRequest.js';
import { UserRepository } from '../infra/repositories/user/UserRepository.js';
import { UserResponse } from '../shareable/dtos/user/UserResponse.js';

const userRepository = new UserRepository();

export class UserService {
  public async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userToCreate = new CreateUserRequest({
      ...data,
      password: hashedPassword,
    });

    return await userRepository.createUser(userToCreate);
  }

  public async getUserById(id: string): Promise<UserResponse | null> {
    return await userRepository.getUserById(id);
  }

  public async getAllUsers(): Promise<UserResponse[]> {
    return await userRepository.getAllUsers();
  }

  public async updateUser(id: string, data: Partial<CreateUserRequest>): Promise<UserResponse | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await userRepository.updateUser(id, data);
  }

  public async deleteUser(id: string): Promise<UserResponse | null> {
    return await userRepository.deleteUser(id);
  }
}

export const userService = new UserService();
