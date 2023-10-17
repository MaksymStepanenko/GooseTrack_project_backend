import { ctrlWrapper } from "../../decorators/index.js";

export const getCurrent = async (req, res) => {
    const {
        email,
        userName,
        avatarURL,
        phone,
        skype,
        birthDay,
        verify,
        token,
        createdAt,
        updatedAt,
    } = req.user;

    const userData = {
        email,
        userName,
        avatarURL,
        phone,
        skype,
        birthDay,
        verify,
        createdAt,
        updatedAt,
    };

    res.status(200).json({
        status: 200,
        message: "success",
        token,
        user: userData,
    });
};

export default {
    getCurrent: ctrlWrapper(getCurrent)
}