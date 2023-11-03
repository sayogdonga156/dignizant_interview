const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  country: {
    type: String,
  },
  mobile: {
    type: String,
  },
  gender: {
    type: String,
  },
  token: {
    type: String,
  },
});

userSchema.set("timestamps", true);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
