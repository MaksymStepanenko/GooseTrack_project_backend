import User from "../../models/User.js";
import { ctrlWrapper } from "../../decorators/index.js";

export const updateUser = async (req, res, next) => {
    const { _id } = req.user;
    const { email, userName, skype, phone, birthDay, avatarURL } =
        req.body;
    const updatedFields = {};

    if (email) updatedFields.email = email;
    if (userName) updatedFields.userName = userName;
    if (skype) updatedFields.skype = skype;
    if (phone) updatedFields.phone = phone;
    if (birthDay) updatedFields.birthDay = birthDay;
    if (avatarURL) updatedFields.avatarURL = avatarURL;

    if (req.file) {
        const avatarURL = req.file.path;
        updatedFields.avatarURL = avatarURL;
    }

    await User.findOneAndUpdate(_id, updatedFields);

    res.status(200).json({
        status: 200,
        message: "User updated successfully",
        user: {
            email: req.user.email,
            userName: req.user.userName,
            avatarURL: req.user.avatarURL,
            phone: req.user.phone,
            skype: req.user.skype,
            birthDay: req.user.birthDay,
            token: req.user.token,
            createdAt: req.user.createdAt,
            updatedAt: req.user.updatedAt,
            ...updatedFields,
        },
    });
};

export default {
    updateUser: ctrlWrapper(updateUser)
}