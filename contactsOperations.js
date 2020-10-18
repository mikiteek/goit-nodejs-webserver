const {listContactsPromise, getContactByIdPromise, addContactPromise, removeContactPromise} = require("./contacts");

const listContact = () => {
  listContactsPromise().then(console.log).catch(error => console.log(error.message));
}

const getContactById = (id) => {
  getContactByIdPromise(id)
    .then(contact => {
      console.log(contact);
    })
    .catch(error => console.log(error.message));
}

const addContact = (name, email, phone) => {
  addContactPromise(name, email, phone)
    .catch(error => console.log(error.message));
}

const removeContact = (id) => {
  removeContactPromise(id).catch(error => console.log(error.message));
}

exports.listContact = listContact;
exports.getContactById = getContactById;
exports.addContact = addContact;
exports.removeContact = removeContact;
