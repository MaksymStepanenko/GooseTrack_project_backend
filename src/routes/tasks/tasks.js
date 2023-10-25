import express from "express";

import {
  getMonthTasks,
  deleteTask,
  patchTask,
  postTask,
} from "../../controllers/tasks/index.js";
import authenticate from '../../middlewares/authenticate.js';

const tasksRouter = express.Router();

tasksRouter.use(authenticate);

tasksRouter.get("/", getMonthTasks);

tasksRouter.post("/", postTask);

tasksRouter.patch("/:id", patchTask);

tasksRouter.delete("/:id", deleteTask);


export default tasksRouter;
