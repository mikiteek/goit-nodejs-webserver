const express = require("express");
const contactsController = require("../controllers/ContactsController");
const {createContactValidation, updateContactValidation} = require("../middleware/validationJoi");

const contactsRouter = express.Router();



contactsRouter.get("/", contactsController.getContacts);
contactsRouter.get("/:id", contactsController.getContactById);
contactsRouter.post("/",
  createContactValidation,
  contactsController.addContact
);
contactsRouter.delete("/:id", contactsController.removeContact);
contactsRouter.patch("/:id",
  updateContactValidation,
  contactsController.updateContact);

module.exports = contactsRouter;