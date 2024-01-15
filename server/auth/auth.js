const router = require("express").Router();

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const authorization = require("../middleware/isverified");
const mongoose = require("mongoose");
const fs = require("fs");
const upload = require("../middleware/multer");
const path = require("path");

// create User

router.post("/", upload.single("image"), async (req, res) => {
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
    } = req.body;
    // check if user already exists
    const user = await userModel.find({ username });
    console.log(user);
    if (user.length !== 0) {
      return res.json("user already exists");
    }
    // // create salt rounds and hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // // create a new user model and save to db

    const newUser = await new userModel({
      firstName,
      lastName,
      middleName,
      username,
      gender,
      username,
      dateOfBirth,
      phoneNumber,
      password: hash,
      timeLeft: 60,
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
    ``;
    console.error(err.message);
  }
});

//get all usersuser

// router.get("/auth", async function (req, res) {
//   try {
//     const user = await userModel.find();
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// login userModel

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json("invalid username or password");
    }

    //check hashed Password
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.status(403).json("invalid Username or password");
    }
    const token = jwtGenerator(user._id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/is-verified", authorization, function (req, res) {
  try {
    res.json({ status: true, userId: req.user });
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/getTime", authorization, async (req, res) => {
  const time = await userModel.findOne({
    _id: mongoose.Types.ObjectId(req.user),
  });
  res.json(time.timeLeft);
});
router.post("/getTime", authorization, async (req, res) => {
  const update = await userModel.updateOne(
    { _id: mongoose.Types.ObjectId(questionId) },
    { $set: { timeLeft: timeLeft } }
  );
  res.json({ message: "updated succesful", update });
});

module.exports = router;
