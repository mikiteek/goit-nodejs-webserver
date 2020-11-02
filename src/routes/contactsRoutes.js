const express = require("express");

const contactsController = require("../controllers/contactsController");
const findContactByIdMiddleware = require("../middlewares/contactsMiddlewares/findContactByIdMiddleware");
const createContactValidMiddleware = require("../middlewares/contactsMiddlewares/createContactValidateMiddleware");
const checkEmailAlreadyExistMiddleWare = require("../middlewares/contactsMiddlewares/checkEmailExistMiddleware");
const updateContactValidMiddleware = require("../middlewares/contactsMiddlewares/updateContactValidationMiddleware");
const checkQueryParamsMiddleware = require("../middlewares/contactsMiddlewares/checkQueryParamsMiddleware");

const contactsRoute = express.Router();

contactsRoute.get("/",
  checkQueryParamsMiddleware,
  contactsController.getListContacts
);
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
  contactsController.updateContactById,
)

module.exports = contactsRoute;