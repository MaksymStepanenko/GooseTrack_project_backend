import express from "express";

import {
  getMonthTasks,
  deleteTask,
  patchTask,
  postTask,
} from "../../controllers/tasks/index.js";

const tasksRouter = express.Router();

tasksRouter.get("/", getMonthTasks);

tasksRouter.post("/", postTask);

tasksRouter.patch("/:id", patchTask);

tasksRouter.delete("/:id", deleteTask);



export default tasksRouter;
