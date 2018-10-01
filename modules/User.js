const mongoose = require("mognoose");
const Schema = mongoose.Schema;

// Create Schema
const userScema = new Schame({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.module("users", userScema);
