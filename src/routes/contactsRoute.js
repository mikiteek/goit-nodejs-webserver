const express = require("express");
const contactsController = require("../controllers/ContactsController");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getContacts)

module.exports = contactsRouter;