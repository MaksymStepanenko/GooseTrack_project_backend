import { ctrlWrapper } from "../../decorators/index.js";
import Task from "../../models/tasks.js";
import checkByError from "../../helpers/checkByError.js";

const monthRegexp = /^20\d\d-(0[1-9]|1[012])$/;

const getMonthTasks = async (req, res) => {
  const { month } = req.query;
  checkByError(
    month.match(monthRegexp) === null,
    400,
    "query param month do not match"
  );

  const result = await Task.find(
    {
      owner: req.user._id,
      date: { $regex: month, $options: "i" },
    },
    "-owner"
  );
  res.json({ data: result, status: 200 });
};


export default ctrlWrapper(getMonthTasks)