const router = require("express").Router();

const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/isverified");
const fs = require("fs");
const upload = require("../middleware/multer");
const path = require("path");

const jwtGenerator = require("../utils/adminJwtGenerator");
// create new admin User

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { username, password, firstName, lastName, isAdmin } = req.body;
    const user = await adminModel.findOne({ username });
    // check if user exists
    if (user !== null) {
      return res.status(301).json("user already Exists ");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new adminModel({
      username,
      password: hash,
      firstName,
      lastName,
      isAdmin,
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
    res.status(201).json("user created Succesfully");
  } catch (err) {
    console.error(err.message);
  }
});

// admin login route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user exists
    const user = await adminModel.findOne({ username });
    if (user === null)
      return res
        .status(301)
        .json({ message: "incorect Username or password", error: true });
    // check if supplied password mathes hashed password
    const hash = await bcrypt.compare(password, user.password);

    if (!hash)
      return res
        .status(301)
        .json({ message: "incorect Username or password", error: true });

    // generate jsaonwebToken for user
    const jwt = await jwtGenerator(user._id);
    return res.status(200).json({ token: jwt });
  } catch (err) {
    console.error(err.message);
  }
});
// get admin Data

router.get("/admin", authorization, async (req, res) => {
  try {
    const userData = await adminModel.findById(req.user);
    return res.json(userData);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/verify-admin", authorization, async (req, res) => {
  try {
    const user = await adminModel.findById(req.user);
    return res.json({ status: true, userId: user });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
