const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6, maxlength: 130},
  subscription: {type: String, enum: ["free", "pro", "premium"], default: "free"},
  avatarURL: {type: String},
  token: {type: String, default: ""},
});

async function updateTokenProjection(id, token) {
  return this.findByIdAndUpdate(id, {token},
    {
      new: true,
      projection: {
        email: true,
        subscription: true,
        avatarURL: true,
        _id: false,
      }
  });
}
userSchema.statics.updateToken = updateTokenProjection;
// users
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;