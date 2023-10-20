import User from "../../models/User.js";

import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        // const avatarURL = gravatar.url(email, { protocol: 'https', s: '100' });
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email already exist");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = nanoid();

        const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });
        const id = newUser._id.toHexString();

        const payload = {
            id: id
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        await User.findByIdAndUpdate(id, { token });

        res.status(201).json({
            userName: newUser.userName,
            email: newUser.email,
            token,
        })
    } catch (e) {
        res.status(e.status).json({
            "error": e.message
        })
    }
}

export default {
    signup: ctrlWrapper(signup)
}