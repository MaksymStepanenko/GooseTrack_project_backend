import { ctrlWrapper } from "../../decorators/index.js";
import User from "../../models/User.js";

export const getUser = async (req, res) => {
    const { _id } = req.user;
    const result = await User.find({ _id });
    res.json(result);
};


export default ctrlWrapper(getUser)