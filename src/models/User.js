import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleSaveError } from './hooks.js';
import { emailRegexp } from '../helpers/regexp.js';

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "UserName is required"],
        },
        email: {
            type: String,
            match: emailRegexp,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Set password for user"],
        },
        phone: {
            type: String,
            // match: [helpers.phoneRegexp, "Invalid phone number format."],// треба проаналізувати як працює цей обробник
            default: "",
        },
        skype: {
            type: String,
            default: "",
        },
        birthDay: {
            type: String,
            default: ""
        },
        token: {
            type: String,
            default: null
        },
        avatarURL: {
            type: String,
            default: ""
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, "Verify token is required"],
        },
        refreshToken: {
            type: String,
        }
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userRefreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
})

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required()
})

const User = model("user", userSchema);

export default User;