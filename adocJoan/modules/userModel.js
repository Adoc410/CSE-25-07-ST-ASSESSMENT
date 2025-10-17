const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
});

module.exports = mongoose.model("UserModel", signupSchema);
