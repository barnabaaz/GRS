const jwt = require("jsonwebtoken");
require("dotenv").config();
const isverified = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json("user not  authenticated");
    }
    if (req.url === "/verify-admin") {
      await jwt.verify(token, process.env.jwtSecreteAdmin, (err, payload) => {
        if (err) {
          return res.json(false);
        }
        req.user = payload.user;
        next();
      });
    } else if (req.url === "/verify-student") {
      await jwt.verify(token, process.env.jwtSecreteStudent, (err, payload) => {
        if (err) {
          return res.json(false);
        }
        req.user = payload.user;
        next();
      });
    } else if (req.url === "/verify-staff") {
      await jwt.verify(token, process.env.jwtSecrete, (err, payload) => {
        if (err) {
          return res.json(false);
        }
        req.user = payload.user;
        next();
      });
    }
  } catch (err) {
    console.error(err.message + "from is verified");
  }
};

module.exports = isverified;
