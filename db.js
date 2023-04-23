const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongodburl)
  .then(() => console.log("connected to database"));
module.exports = mongoose;
