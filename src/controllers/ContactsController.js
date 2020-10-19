const {listContact} = require("../services/contactsOperations");

class ContactsController {
  static getContacts(req, res) {
    listContact()
      .then(contacts => res.status(200).json(contacts))
      .catch(error => res.status(500).send(error.message));
  }

}

module.exports = ContactsController;