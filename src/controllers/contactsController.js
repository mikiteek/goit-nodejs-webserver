const contactModel = require("../models/contactModel");
const checkContactOperationService = require("../services/checkContactOperationService");

class ContactsController {
  async getListContacts(req, res, next) {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const {sub} = req.query;
      const filterParams = sub ? {subscription: sub} : {};
      const options = {
        page, limit,
      };

      const contacts = await contactModel.paginate(filterParams, options);
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
      checkContactOperationService(contact, res);
      return res.status(200).json(contact);
    }
    catch (error) {
      next(error)
    }
  }

  async createContact(req, res, next) {
    try {
      const contact = await contactModel.create(req.body);
      return res.status(201).json(contact);
    }
    catch (error) {
      next(error)
    }
  }
  async deleteContactById(req, res, next) {
    try {
      const {id} = req.params;
      const contactToDelete = await contactModel.findByIdAndDelete(id);
      checkContactOperationService(contactToDelete, res);
      return res.status(200).json({message: "contact deleted"});
    }
    catch (error) {
      next(error);
    }
  }

  async updateContactById(req, res, next) {
    try {
      const {id} = req.params;
      const contactToUpdate = await contactModel.findByIdAndUpdate(
        id,
        {$set: req.body,},
        {new: true,}
      );
      checkContactOperationService(contactToUpdate, res);
      return res.status(200).json(contactToUpdate);
    }
    catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactsController();