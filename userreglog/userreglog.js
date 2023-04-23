const express = require("express");
const usermodel = require("../usermodel/usermodel");
const userrouter = express.Router();
const jwt = require("jsonwebtoken");
//register
userrouter.post("/register", async (req, res) => {
  try {
    let { username, password } = req.body;
    let userdata = await usermodel.findOne({ username });
    if (userdata) {
      res.json({
        status: "fail to register due to user already exist",
      });
    } else {
      userdata = await usermodel.create(req.body);
      res.json({
        status: "successfully registerd",
        data: userdata,
      });
    }
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});
//login
userrouter.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    // console.log(req.body);
    let userdata = await usermodel.findOne({ username });
    console.log(userdata);
    if (!userdata) {
      res.json({
        status: "fail to login user is not present",
      });
    } else {
      let token = jwt.sign(
        {
          expire: Math.floor(Date.now() / 1000 + 60 * 60),
          data: userdata._id,
        },
        "abdul"
      );
      res.json({
        status: "successfully login",
        token: token,
      });
    }
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});
module.exports = userrouter;
