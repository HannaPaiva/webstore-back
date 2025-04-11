import { Request, Response } from 'express';
import CreateUserRequest from '../shareable/dtos/user/CreateUserRequest.js';
import { userService } from '../services/UserService.js';
import { logError } from '../shareable/utils/error-logger.js';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createUserRequest = new CreateUserRequest(req.body);

      if (!createUserRequest.isValid()) {
        res.status(400).json({ errors: createUserRequest.getValidationErrors() });
        return;
      }

      const user = await userService.createUser(createUserRequest);
      res.status(201).json(user);
    } catch (err) {
      logError('Failed to create user', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      logError('Failed to get user by ID', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      logError('Failed to get all users', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, req.body);

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      logError('Failed to update user', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(deletedUser);
    } catch (err) {
      logError('Failed to delete user', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserController();
