const mongoose = require("mongoose");
const {Schema} = mongoose;

const contactSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  subscription: {type: String, default: "free", enum: ["free", "premium", "pro"]},
  password: {type: String, required: true, minlength: 6, maxlength: 30},
  token: {type: String, default: ""},
});
// contacts
const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;