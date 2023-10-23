import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js";
import checkByError from "../../helpers/checkByError.js" 

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  checkByError(task.owner._id.toString() !== req.user._id.toString(), 404);
  const result = await Task.findByIdAndRemove(id);
  checkByError(!result, 404);
  res.json({ message: "delete successful", status: 200 });
};


export default ctrlWrapper(deleteTask);
