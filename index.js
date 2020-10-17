const {listContact, getContactById, removeContact, addContact} = require("./contactsOperations");
const {argv} = require("./utils/yargs")

const invokeAction = ({action, id, name, email, phone}) => {
  switch (action) {
    case "list":
      listContact();
      break;
    case "get":
      getContactById(id);
      break;
    case "add":
      addContact(name, email, phone);
      break;
    case "remove":
      removeContact(id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);