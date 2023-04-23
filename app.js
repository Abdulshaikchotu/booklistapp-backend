const express = require("express");
const app = express();
const userrouter = require("./userreglog/userreglog");
const bookroutes = require("./bookroutes/bookroutes");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userrouter);
const jwt = require("jsonwebtoken");
app.use("/afterlogin", async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    if (token) {
      jwt.verify(token, "abdul", (err, decoded) => {
        if (decoded) {
          console.log(decoded.data);
          req.user = decoded.data;
          next();
        }
      });
    }
  } catch (e) {
    res.json({
      status: "fail",
      msg: e.message,
    });
  }
});
app.use(bookroutes);
const db = require("./db");
app.listen(process.env.port, () =>
  console.log(`server is up at ${process.env.port}`)
);
