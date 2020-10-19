const fs = require("fs");
const {promises: fsPromises} = fs;
const path = require("path");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContact = async () => {
  const contacts = await fsPromises.readFile(contactsPath, "utf-8");
  if (!contacts) {
    throw new Error("Server is temporarily unavailable, please try later");
  }
  return JSON.parse(contacts);
}

exports.listContact = listContact;