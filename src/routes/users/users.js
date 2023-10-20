import express from 'express';
import { validateBody } from '../../decorators/index.js';
import authenticate from '../../middlewares/authenticate.js';
import updateSchema from '../../../src/schemas/updateSchemas/updateSchema.js';
import { updateUser } from '../../controllers/users/updateUser.js';
import { getUser } from '../../controllers/users/getUser.js';

const router = express.Router();
const validateUserSchema = validateBody(updateSchema);

router.get("/profile", authenticate, getUser)
router.patch("/profile", authenticate, validateUserSchema, updateUser)

export default router;