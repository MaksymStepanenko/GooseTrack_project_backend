import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js";

const getMonthTasks = async (req, res) => {
  const result = await Task.find({});
  res.json(result);
};


export default ctrlWrapper(getMonthTasks)