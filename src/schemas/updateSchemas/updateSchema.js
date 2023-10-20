import Joi from "joi";
import { emailRegexp, phoneRegexp, birthDayRegexp } from "../../../src/helpers/regexp.js";

const updateSchema = Joi.object({
    email: Joi.string()
        .trim()
        .allow("")
        .regex(emailRegexp)
        .messages({
            "string.base": "The email must be a string.",
            "string.pattern.base": "The email must be in format test@gmail.com.",
        }),
    userName: Joi.string()
        .min(3)
        .max(40)
        .messages({
            "string.base": "The userName must be a string.",
            "string.pattern.base": "The userName must be min 3 max 40 letters.",
        }),

    phone: Joi.string()
        .trim()
        .regex(phoneRegexp)
        .allow("")
        .messages({
            "string.base": "The skype must be a string.",
            "string.pattern.base":
                "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
        }),

    skype: Joi.string()
        .trim()
        .allow("")
        .messages({
            "string.base": "The skype must be a string.",
        }),

    birthDay: Joi.string()
        .allow("")
        .pattern(birthDayRegexp)
        .messages({
            "string.base": "The skype must be a string.",
            "string.pattern.base":
                "Invalid birthDayR format. Please fill a valid birthDay date 15/03/2023",
        }),
    avatarURL: Joi.allow(""),
});

export default updateSchema;