import { ctrlWrapper } from "../../decorators/index.js";

const getMonthTasks = async (req, res) => {
  res.json("getMonthTasks");
};


export default ctrlWrapper(getMonthTasks)