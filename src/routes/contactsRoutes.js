const express = require("express");

const contactsController = require("../controllers/contactsController");
const findContactByIdMiddleware = require("../middlewares/findContactByIdMiddleware");
const createContactValidMiddleware = require("../middlewares/createContactValidateMiddleware");
const checkEmailAlreadyExist = require("../middlewares/checkEmailExistMiddleware");

const contactsRoute = express.Router();

contactsRoute.get("/", contactsController.getListContacts);
contactsRoute.get("/:id",
  findContactByIdMiddleware,
  contactsController.getContactById
);
contactsRoute.post("/",
  createContactValidMiddleware,
  checkEmailAlreadyExist,
  contactsController.createContact
);

module.exports = contactsRoute;