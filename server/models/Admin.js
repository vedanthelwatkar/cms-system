const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    default: function () {
      return this.email.split("@")[0];
    },
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
