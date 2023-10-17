import User from "../../models/User.js";
import { ctrlWrapper } from "../../decorators/index.js";
import dotenv from "dotenv";

dotenv.config();

export const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "Logout success"
    })
}

export default {
    logout: ctrlWrapper(logout)
}