const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  image: {
    name: { type: String, required: true },
    img: {
      data: { type: Buffer, reqiured: true },
      contentType: String,
    },
  },
});

module.exports = mongoose.model("admin", adminSchema);
