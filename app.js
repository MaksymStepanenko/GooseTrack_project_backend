import express from "express";
import logger from "morgan";
import cors from "cors";

import jsonData from "./src/dock/swagger.json" assert { type: "json" };

import dotenv from "dotenv";
dotenv.config();

import authRouter from "./src/routes/auth/users.js";
import tasksRoute from "./src/routes/tasks/tasks.js";
import reviewsRouter from "./src/routes/reviews/reviews-router.js";

import swaggerUI from "swagger-ui-express";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/tasks", tasksRoute);
app.use("/reviews", reviewsRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(jsonData));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

export default app;
