const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  middleName: { type: String },
  username: { type: String, required: true },

  dateOfBirth: { type: Date, required: true },

  timeLeft: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  image: {
    name: { type: String, required: true },
    img: {
      data: { type: Buffer, reqiured: true },
      contentType: String,
    },
  },
});

module.exports = mongoose.model("userdb", UserModel);
