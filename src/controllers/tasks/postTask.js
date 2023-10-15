import { ctrlWrapper } from "../../decorators/index.js";

const postTask = async (req, res) => {
    
  res.json("postTask");
};

export default ctrlWrapper(postTask);
