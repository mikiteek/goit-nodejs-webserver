const express = require("express");

const contactsController = require("../controllers/contactsController");
const contactsRoute = express.Router();

contactsRoute.get("/", contactsController.getListContacts);

module.exports = contactsRoute;