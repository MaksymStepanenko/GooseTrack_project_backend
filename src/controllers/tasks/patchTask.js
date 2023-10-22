import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js"
import checkByError from "../../helpers/checkByError.js";

const patchTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  checkByError(task.owner._id.toString() !== req.user._id.toString(), 404);
  const { start, end } = req.body;
  if (start || end) {
    const task = await Task.findById(id);
    const [startHour, startMin] = start
      ? start.split(":")
      : task.start.split(":");
    const [endHour, endMin] = end ? end.split(":") : task.end.split(":");
    checkByError(
      startHour > endHour || (startHour === endHour && startMin > endMin),
      406,
      "Start time must be lower then end time"
    );
  }
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  checkByError(!result, 404);
  result.owner = undefined;
  res.json({ data: result, status: 200 });
};

export default ctrlWrapper(patchTask);
