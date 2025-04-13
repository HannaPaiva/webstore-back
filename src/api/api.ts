import express, { Application } from "express";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "../middlewares/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "../docs/swagger.js";
import authRoutes from "./routes/authRoutes.js";

const api: Application = express();
api.use(express.json({ limit: "50mb" }));

// ✅ Use the compiled spec
api.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

api.use("/api/auth", authRoutes);
api.use("/api/users", userRoutes);

api.use(errorMiddleware);

export default api;
