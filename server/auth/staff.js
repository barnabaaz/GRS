const router = require("express").Router();

const bcrypt = require("bcrypt");
const staffModel = require("../models/staffModel");
const jwtGenerator = require("../utils/jwtGenerator");
const fs = require("fs");
const upload = require("../middleware/multer");
const path = require("path");
const authorization = require("../middleware/isverified");
// get all staff

router.get("/staff", async (req, res) => {
  try {
    const response = await staffModel.find({});
    res.status(200).json({ response });
  } catch (err) {
    console.error(err.message);
  }
});

// get a particulat staff
router.get("/staff", async (req, res) => {
  try {
    const { staffId } = req.body;
    const response = await staffModel.find({ staffId });
    res.status(200).json({ response });
  } catch (err) {
    console.error(err.message);
  }
});
// create a staff
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      email,
      gender,
      phoneNumber,
      username,
      password,
    } = req.body;
    const staff = await staffModel.findOne({ email });
    if (staff !== null) return res.json("user already exists");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newStaff = await new staffModel({
      firstName,
      lastName,
      middleName,
      phoneNumber,
      email,
      username,
      gender,
      password: hash,
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
    await newStaff.save();
    res.status(200).json("user created successful");
  } catch (err) {
    console.error(err.message);
  }
});

// update a staff
router.post("/staff/update", async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
  }
});

//delete a staff

router.delete("/staff", async (req, res) => {
  try {
    const { staffId } = req.body;
    await staffModel.findOneAndRemove({ staffId });
    res.status(200).json("deleted successful");
  } catch (err) {
    console.error(err.message);
  }
});
// Authentication routes

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user exists
    const staff = await staffModel.findOne({ username });
    if (staff === null) {
      return res
        .status(301)
        .json({ message: "invalid username or password", error: true });
    }
    //check hashed password
    const hash = await bcrypt.compare(password, staff.password);
    if (!hash)
      return res
        .status(301)
        .json({ message: "incorect Username or password", error: true });
    // generate jsaonwebToken for user
    const token = await jwtGenerator(staff._id);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/verify-staff", authorization, async (req, res) => {
  try {
    const user = await staffModel.findById(req.user);
    return res.status(200).json({ status: true, userId: user });
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
