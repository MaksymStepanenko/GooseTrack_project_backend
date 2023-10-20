import express from 'express';
import { signup } from "../../controllers/auth/signUp.js";
import { login } from "../../controllers/auth/logIn.js";
import { getCurrent } from '../../controllers/auth/getCurrent.js';
import { logout } from '../../controllers/auth/logOut.js';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import authenticate from '../../middlewares/authenticate.js';
import updateSchema from '../../schemas/updateSchemas/updateSchema.js';

const router = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userLoginValidate = validateBody(userSchemas.userLoginSchema);
const validateUserSchema = validateBody(updateSchema);
// const userEmailValidate = validateBody(userSchemas.userEmailSchema);

router.post("/signup", userSignupValidate, signup);

router.post("/login", userLoginValidate, login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

// router.get("/verify/:verificationToken", authController.verify);

router.patch("/user", authenticate, validateUserSchema)

// router.post("/verify", userEmailValidate, authController.resendVerityEmail);


export default router;