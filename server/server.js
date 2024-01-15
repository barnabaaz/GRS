require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questions = require("./auth/questions");
const user = require("./auth/auth");
const question = require("./routes/quiz");
const admin = require("./auth/admin");
const result = require("./routes/result");
const app = express();
const fs = require("fs");
const staff = require("./auth/staff");
const student = require("./auth/student");
const path = require("path");

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
app.use(express.json());
db.on("error", (error) => console.error(error.message));
db.once("open", () => console.log("connected to database"));
app.use("/", questions);
app.use("/question", question);
app.use("/auth", user);
app.use("/staff", staff);
app.use("/admin", admin);
app.use("/student", student);
app.use("/result", result);

app.listen(5000, () => console.log("server is running on port 5000"));
