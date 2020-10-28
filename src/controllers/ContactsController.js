const fs = require("fs");
const {promises: fsPromises} = fs;
const path = require("path");
const Contact = require("../models/Contact");

const contactsPath = path.join(__dirname, "../db/contacts.json");

class ContactsController {
  async getContacts(req, res) {
    try {
      const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
      if (!contacts) {
        throw new Error("Server is temporarily unavailable, please try later");
      }
      return res.status(200).json(contacts);
    }
    catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  async getContactById(req, res) {
    try {
      const contactId = parseInt(req.params.id);
      const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
      const findContact = contacts.find(({id}) => id === contactId);
      if (!findContact) {
        throw new Error("Not found");
      }
      return res.status(200).json(findContact);
    }
    catch(error) {
      return res.status(404).json({message: error.message});
    }
  }

  async addContact(req, res) {
    try {
      const {name, email, phone} = req.body;
      const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
      const addingContact = new Contact(contacts[contacts.length - 1].id + 1, name, email, phone)
      contacts.push(addingContact);
      await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
      return res.status(201).json(addingContact);
    }
    catch (error) {
      return res.json({message: error.message});
    }
  }

  async removeContact(req, res) {
    try {
      const contactId = parseInt(req.params.id);
      const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
      if (!contacts.find(({id}) => id === contactId)) {
        throw new Error("Not found");
      }
      const filterContacts = contacts.filter(item => item.id !== contactId);
      await fsPromises.writeFile(contactsPath, JSON.stringify(filterContacts));
      return res.status(200).json({message: "contact deleted"});
    }
    catch (error) {
      return res.status(404).json({message: error.message});
    }
  }

  async updateContact(req, res) {
    try {
      const {params: {id: contactId}, body} = req;
      const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
      const targetContactIndex = contacts.findIndex(({id}) => id === parseInt(contactId));
      if (targetContactIndex === -1) {
        throw new Error("Not found");
      }
      contacts[targetContactIndex] = {
        ...contacts[targetContactIndex],
        ...body,
      };
      await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
      return res.status(200).json(contacts[targetContactIndex]);
    }
    catch (error) {
      return res.status(404).json({message: error.message});
    }
  }
}

module.exports = new ContactsController();