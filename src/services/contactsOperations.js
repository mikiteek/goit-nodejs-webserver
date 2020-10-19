const fs = require("fs");
const {promises: fsPromises} = fs;
const path = require("path");
const Contact = require("../models/Contact");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContactPromise = async () => {
  const contacts = await fsPromises.readFile(contactsPath, "utf-8");
  if (!contacts) {
    throw new Error("Server is temporarily unavailable, please try later");
  }
  return JSON.parse(contacts);
}

const getContactByIdPromise = async (contactId) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const findContact = contacts.find(({id}) => id === contactId);
  if (!findContact) {
    throw new Error("Not found");
  }
  return findContact;
}

const addContactPromise = async ({name, email, phone}) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const addingContact = new Contact(contacts[contacts.length - 1].id + 1, name, email, phone)
  contacts.push(addingContact);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
  return addingContact;
}

exports.listContactPromise = listContactPromise;
exports.getContactByIdPromise = getContactByIdPromise;
exports.addContactPromise = addContactPromise;