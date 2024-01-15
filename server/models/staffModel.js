const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  middleName: { type: String },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  username: { type: String, require: true, unique: true },

  image: {
    name: { type: String, required: true },
    img: {
      data: { type: Buffer, reqiured: true },
      contentType: String,
    },
  },
});

module.exports = mongoose.model("staff", StaffSchema);
