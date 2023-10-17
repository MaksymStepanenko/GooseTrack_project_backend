import express from 'express';
import { signup } from "../../controllers/auth/signUp.js";
import { login } from "../../controllers/auth/logIn.js";
import { getCurrent } from '../../controllers/auth/getCurrent.js';
import { logout } from '../../controllers/auth/logOut.js';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import authenticate from '../../middlewares/authenticate.js';

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userLoginValidate = validateBody(userSchemas.userLoginSchema);
// const userEmailValidate = validateBody(userSchemas.userEmailSchema);

authRouter.post("/signup", userSignupValidate, signup);

authRouter.post("/login", userLoginValidate, login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

// router.post("/logout", authenticate, authController.logout);
// router.get("/verify/:verificationToken", authController.verify);

// router.post("/verify", userEmailValidate, authController.resendVerityEmail);


export default authRouter;