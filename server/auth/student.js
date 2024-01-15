const studentModel = require("../models/studentModel");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwtGenerator = require("../utils/studentJwtGenerator");
const mongoose = require("mongoose");
const fs = require("fs");
const upload = require("../middleware/multer");
const path = require("path");
const authorization = require("../middleware/isverified");

// get all registered Students

router.get("/", async (req, res) => {
  try {
    const data = await studentModel.find();
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
  }
});
// create student

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    //destructure body
    const {
      firstName,
      lastName,
      middleName,
      username,
      gender,
      dateOfBirth,
      password,
      phoneNumber,
      studentClass,
    } = req.body;
    // check if user already exists
    const user = await studentModel.findOne({ username });

    if (user !== null) {
      return res.json("user already exists");
    }
    // // create salt rounds and hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // // create a new user model and save to db

    const newUser = await new studentModel({
      firstName,
      lastName,
      middleName,
      username,
      gender,
      dateOfBirth,
      phoneNumber,
      password: hash,
      studentClass,
      image: {
        name: req.file.filename,
        img: {
          data: fs.readFileSync(
            path.join(__dirname, "..", "/uploads/", req.file.filename)
          ),
          contentType: "image/png",
        },
      },
    });
    await newUser.save();
    // // generate new user id for new user
    const jwt = jwtGenerator(newUser._id); // return appropriate response
    res.json({ jwt: jwt });
  } catch (err) {
    console.error(err.message);
  }
});

// delete a created student

// update a student

// login a student

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const student = await studentModel.findOne({ username });
    if (student === null)
      return res
        .status(301)
        .json({ message: "incorect username or password", error: true });

    const hash = await bcrypt.compare(password, student.password);
    if (!hash)
      return res
        .status(301)
        .json({ message: "incorect Username or password", error: true });
    // generate jsaonwebToken for user
    const token = await jwtGenerator(student._id);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/verify-student", authorization, async (req, res) => {
  try {
    const user = await studentModel.findById(req.user);
    return res.json({ status: true, userId: user });
  } catch (err) {
    console.error(err.message);
  }
});

// router.post("/student-get", async (req, res) => {
//   try {
//     await studentModel.insertMany()
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json("server Error");
//   }
// });
module.exports = router;
