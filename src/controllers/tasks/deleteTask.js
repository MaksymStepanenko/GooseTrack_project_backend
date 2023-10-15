import { ctrlWrapper } from "../../decorators/index.js";

const deleteTask = async (req, res) => {
  res.json("deleteTask");
};

export default ctrlWrapper(deleteTask);
