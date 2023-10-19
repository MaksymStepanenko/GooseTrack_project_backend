import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js";

const getMonthTasks = async (req, res) => { 
  const { month, year } = req.query;
  const result = await Task.find(
    {
      owner: req.user._id,
      date: { $regex: month, $options: "i" },
      year: { $regex: year, $options: "i" },
    }
  );
  res.json({ data: result, status: 200 });
};


export default ctrlWrapper(getMonthTasks)