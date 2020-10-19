const express = require("express");
const contactsController = require("../controllers/ContactsController");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getContacts);
contactsRouter.get("/:id", contactsController.getContactById);

module.exports = contactsRouter;