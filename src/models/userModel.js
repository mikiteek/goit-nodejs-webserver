const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6, maxlength: 130},
  subscription: {type: String, enum: ["free", "pro", "premium"], default: "free"},
  token: {type: String, default: ""},
});

async function updateToken(id, token) {
  return this.findByIdAndUpdate(id, {token}, {new: true});
}
userSchema.statics.updateToken = updateToken;
// users
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;