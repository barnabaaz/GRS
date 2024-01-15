const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  gender: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true },
  studentClass: { type: String, required: true },
  image: {
    name: { type: String, required: true },
    img: {
      data: { type: Buffer, reqiured: true },
      contentType: String,
    },
  },
});

module.exports = mongoose.model("student", studentSchema);

// image: {
//   name: { type: String, required: true },
//   img: {
//     data: { type: Buffer, reqiured: true },
//     contentType: String,
//   },
// },
