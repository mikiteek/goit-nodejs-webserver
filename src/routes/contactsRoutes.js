const express = require("express");

const contactsController = require("../controllers/contactsController");
const findContactByIdMiddleware = require("../middlewares/findContactByIdMiddleware");
const createContactValidMiddleware = require("../middlewares/createContactValidateMiddleware");
const checkEmailAlreadyExistMiddleWare = require("../middlewares/checkEmailExistMiddleware");
const updateContactValidMiddleware = require("../middlewares/updateContactValidationMiddleware");

const contactsRoute = express.Router();

contactsRoute.get("/", contactsController.getListContacts);
contactsRoute.get("/:id",
  findContactByIdMiddleware,
  contactsController.getContactById
);
contactsRoute.post("/",
  createContactValidMiddleware,
  checkEmailAlreadyExistMiddleWare,
  contactsController.createContact
);
contactsRoute.delete("/:id",
  findContactByIdMiddleware,
  contactsController.deleteContactById
);

contactsRoute.patch("/:id",
  updateContactValidMiddleware,
  findContactByIdMiddleware,
  contactsController.updateContactBiId,
)

module.exports = contactsRoute;