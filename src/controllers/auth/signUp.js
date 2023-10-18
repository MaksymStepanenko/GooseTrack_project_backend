import User from "../../models/User.js";

import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

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

        // const verifyEmail = {
        //     to: email,
        //     subject: "Verify email",
        //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`
        // };

        // await sendEmail(verifyEmail);
        res.status(201).json({
            userName: newUser.userName,
            email: newUser.email,
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