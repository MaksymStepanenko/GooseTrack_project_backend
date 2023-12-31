import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";

import dotenv from "dotenv";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/User.js";

dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        throw HttpError(401);
    }

    try {
        const a = jwt.verify(token, JWT_SECRET);
        const date = new Date().getTime() / 1000;
        const user = await User.findById(a.id);
        if (!user || !user.token || (a.exp - date) < 0) {
            throw HttpError(401);
        }
        req.user = user;
        next();
    }
    catch {
        throw HttpError(401);
    }
}

export default ctrlWrapper(authenticate);
