const express = require("express");

const contactsController = require("../controllers/contactsController");
const findContactByIdMiddleware = require("../middlewares/findContactByIdMiddleware");

const contactsRoute = express.Router();

contactsRoute.get("/", contactsController.getListContacts);
contactsRoute.get("/:id",
  findContactByIdMiddleware,
  contactsController.getContactById
);

module.exports = contactsRoute;