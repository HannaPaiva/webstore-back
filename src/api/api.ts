import express, { Application } from "express";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "../docs/swagger.js";

const api: Application = express();
api.use(express.json({ limit: "50mb" }));

// ✅ Use the compiled spec
api.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

api.use("/api", userRoutes);
api.use(errorMiddleware);

export default api;
