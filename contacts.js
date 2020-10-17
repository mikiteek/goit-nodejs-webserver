const fs = require("fs");
const {promises: fsPromises} = fs;
const path = require("path");


const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const contacts = await fsPromises.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  // if (contacts.includes(item => item.id === contactId) === false) { почему всегда false
  //   throw new Error("Contact not found");
  // }
  return contacts.find(({id}) => id === contactId);
}

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const filterContacts = contacts.filter(item => item.id !== contactId);
  await fsPromises.writeFile(contactsPath, JSON.stringify(filterContacts));
}

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    throw new Error("Check if all parameters are exist: name, email, phone");
  }
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
}

exports.listContacts = listContacts;
exports.getContactById = getContactById;
exports.removeContact = removeContact;
exports.addContact = addContact;