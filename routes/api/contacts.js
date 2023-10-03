import express from "express";

import contactController from "../../controllers/contacts-controller.js";

import * as contactSchemas from "../../models/Contact.js";

import { validateBody } from "../../decorators/index.js";

import { isValidId } from "../../middlewares/index.js";
import authenticate from "../../middlewares/authenticate.js";

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactSchemas.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactController.getAll);

contactsRouter.get("/:id", isValidId, contactController.getById);

contactsRouter.post("/", contactAddValidate, contactController.add);

contactsRouter.put(
  "/:id",
  isValidId,
  contactAddValidate,
  contactController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactController.updateById
);

contactsRouter.delete("/:id", isValidId, contactController.deleteById);

export default contactsRouter;
