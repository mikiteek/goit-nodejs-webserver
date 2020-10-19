const {listContactPromise, getContactByIdPromise} = require("../services/contactsOperations");

class ContactsController {
  static getContacts(req, res) {
    listContactPromise()
      .then(contacts => res.status(200).json(contacts))
      .catch(error => res.status(500).send(error.message));
  }

  static getContactById(req, res) {
    getContactByIdPromise(parseInt(req.params.id))
      .then(contact => res.status(200).json(contact))
      .catch(error => res.status(404).json({message: error.message}))
  }

}

module.exports = ContactsController;