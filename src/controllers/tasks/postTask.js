import { format } from "date-fns";

import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js";

const currentDateTime = new Date();

// Форматуємо поточну дату та час у вказаний формат
const formattedDateMonth = format(currentDateTime, "MM");
const formattedDateYear = format(currentDateTime, "yyyy");
const postTask = async (req, res) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const { priority = "LOW", category = "TODO", start, end } = req.body;
  // const [startHour, startMin] = start.split(":");
  // const [endHour, endMin] = end.split(":");
  // CheckByError(
  //   startHour > endHour || (startHour === endHour && startMin > endMin),
  //   406,
  //   "Start time must be lower then end time"
  // );

  const newTask = await Task.create({
    month: formattedDateMonth,
    year: formattedDateYear,
    owner,
    ...req.body,
    priority,
    category,
  });
  // newTask.owner = undefined;
  res.status(201).json({ data: newTask, status: 201 });
};

export default ctrlWrapper(postTask);
