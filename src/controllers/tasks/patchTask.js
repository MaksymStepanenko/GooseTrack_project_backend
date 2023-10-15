import { ctrlWrapper } from "../../decorators/index.js";

const patchTask = async (req, res) => {
  res.json("patchTask");
};

export default ctrlWrapper(patchTask);
