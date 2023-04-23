const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userschema = new mongoose.Schema({
  username: { type: String, reuired: true },
  password: { type: String, required: true },
  book: [{ type: ObjectId, ref: "booklistdata" }],
});

const usermodel = mongoose.model("usercredential", userschema);

module.exports = usermodel;
