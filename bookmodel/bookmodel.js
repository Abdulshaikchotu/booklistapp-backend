const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bookcrud = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    AuthorName: { type: String, required: true },
    Genre: { type: String, required: true },
    isbn: { type: String },
    description: { type: String },
    publisheddate: {
      type: Date,
      default: Date.now(),
    },
    publisher: { type: String },
    user: { type: ObjectId, ref: "usercredential" },
  },
  {
    strictPopulate: false,
  }
);

const bookmodel = mongoose.model("booklistdata", bookcrud);

module.exports = bookmodel;
