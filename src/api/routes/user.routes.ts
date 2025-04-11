import express from "express";
import UserController from "../../controllers/UserController.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongP@ssw0rd
 *               roleId:
 *                 type: string
 *                 example: 1e72a0f4-5678-43c1-9e3e-abc123def456
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/users", UserController.createUser.bind(UserController));


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get("/users", UserController.getAllUsers.bind(UserController));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 9fbb3c5b-a9c3-41a3-b273-8b80d0cfaa4a
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/users/:id", UserController.getUserById.bind(UserController));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 9fbb3c5b-a9c3-41a3-b273-8b80d0cfaa4a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/users/:id", UserController.updateUser.bind(UserController));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 9fbb3c5b-a9c3-41a3-b273-8b80d0cfaa4a
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/users/:id", UserController.deleteUser.bind(UserController));

export default router
