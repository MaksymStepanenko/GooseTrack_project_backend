import express from 'express';
import authController from "../../controllers/auth/signUp.js";
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';

// const { authenticate, upload } = require('../../middleware/index');
const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
// const userSigninValidate = validateBody(userSchemas.userSigninSchema);
// const userEmailValidate = validateBody(userSchemas.userEmailSchema);

authRouter.post("/signup", userSignupValidate, authController.signup);

// router.get("/verify/:verificationToken", authController.verify);

// router.post("/verify", userEmailValidate, authController.resendVerityEmail);

// router.post("/signin", userSigninValidate, authController.signin);

// router.get("/current", authenticate, authController.getCurrent);

// router.post("/logout", authenticate, authController.logout);

export default authRouter;