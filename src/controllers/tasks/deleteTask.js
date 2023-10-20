import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js";

const deleteTask = async (req, res) => {
  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};


export default ctrlWrapper(deleteTask);
