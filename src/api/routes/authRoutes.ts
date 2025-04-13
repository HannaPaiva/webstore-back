// src/routes/auth.ts

import express from "express";
import AuthController from "../../controllers/AuthController.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", AuthController.login.bind(AuthController));

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify the validity of a JWT token
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token not provided
 *       403:
 *         description: Invalid or expired token
 */

router.get("/verify", AuthController.verifyToken.bind(AuthController));

export default router;
