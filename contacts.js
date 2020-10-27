const fs = require("fs");
const {promises: fsPromises} = fs;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");
    console.log(contacts);
  }
  catch (error) {
    console.log(error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
    const findContact = contacts.find(({id}) => id === contactId);
    if (!findContact) {
      throw new Error("Contact not found");
    }
    console.log(findContact);
  }
  catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
    const filterContacts = contacts.filter(item => item.id !== contactId);
    await fsPromises.writeFile(contactsPath, JSON.stringify(filterContacts));
  }
  catch (error) {
    console.log(error.message);
  }
}

const addContact = async (name, email, phone) => {
  try {
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
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}