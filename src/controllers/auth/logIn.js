import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }

        const { _id: id } = user;

        const payload = {
            id,
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        const newRefreshToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
        await User.findByIdAndUpdate(id, { token, refreshToken: newRefreshToken });

        res.json({
            token,
            refreshToken: newRefreshToken,
        })
    } catch (e) {
        res.status(e.status).json({
            "error": e.message
        })
    }
}

export default {
    login: ctrlWrapper(login)
}