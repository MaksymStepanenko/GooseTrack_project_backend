import User from "../../models/User.js";
import { ctrlWrapper } from "../../decorators/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpError } from "../../helpers/index.js";

dotenv.config();

const { JWT_SECRET } = process.env;

export const refresh = async (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        console.log("refreshToken", refreshToken);
        const { id } = jwt.verify(refreshToken, JWT_SECRET);
        const user = await User.findOne({ id, refreshToken });
        if (!user) {
            throw HttpError(401, "Refresh token is wrong");
        }
        const accessToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: "23h" });
        const newRefreshToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
        await User.findByIdAndUpdate(id, { accessToken, refreshToken: newRefreshToken });
        res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

export default {
    refresh: ctrlWrapper(refresh)
}