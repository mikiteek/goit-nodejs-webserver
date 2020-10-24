const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6, maxlength: 130},
  subscription: {type: String, enum: ["free", "pro", "premium"], default: "free"},
  token: {type: String, default: ""},
});
// users
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;