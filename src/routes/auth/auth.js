import express from 'express';
import { signup } from "../../controllers/auth/signUp.js";
import { login } from "../../controllers/auth/logIn.js";
import { getCurrent } from '../../controllers/auth/getCurrent.js';
import { logout } from '../../controllers/auth/logOut.js';
import { refresh } from '../../controllers/auth/refresh.js';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userLoginValidate = validateBody(userSchemas.userLoginSchema);
const userRefreshValidate = validateBody(userSchemas.userRefreshTokenSchema);

router.post("/signup", userSignupValidate, signup);

router.post("/login", userLoginValidate, login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);
router.post("/refresh", userRefreshValidate, refresh);

export default router;