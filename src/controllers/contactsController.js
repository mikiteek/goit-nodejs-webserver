const Joi = require("joi");
const contactModel = require("../models/contactModel");

class ContactsController {
  async getListContacts(req, res, next) {
    try {
      const contacts = await contactModel.find({});
      return res.status(200).json(contacts);
    }
    catch (error) {
      next(error)
    }
  }

  async getContactById(req, res, next) {
    try {
      const {id} = req.params;
      const contact = await contactModel.findById(id);
      return res.status(200).json(contact);
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = new ContactsController();