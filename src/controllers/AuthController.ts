// src/controllers/AuthController.ts

import { Request, Response } from 'express';
import { authService } from '../services/AuthService.js';
import { logError } from '../shareable/utils/error-logger.js';

class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await authService.login(email, password);

      if (!result) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      res.status(200).json(result);
    } catch (err) {
      logError('Failed to login user', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
      }

      const payload = authService.verifyToken(token);

      if (!payload) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
      }

      res.status(200).json({ valid: true, payload });
    } catch (err) {
      logError('Failed to verify token', err as Error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuthController();
