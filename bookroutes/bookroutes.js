const express = require("express");
const route = express.Router();
const bookmodel = require("../bookmodel/bookmodel");

route.get("/afterlogin/getdata", async (req, res) => {
  let user = req.user;
  try {
    let bookdata = await bookmodel
      .find({ user })
      .populate("book")
      .sort({ order: -1 });
    res.json({
      status: "success",
      data: bookdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

route.post("/afterlogin/postbookdata", async (req, res) => {
  let member = req.user;
  try {
    let bookdata = await bookmodel.create({
      Title: req.body.Title,
      AuthorName: req.body.AuthorName,
      Genre: req.body.Genre,
      publisher: req.body.publisher,
      description: req.body.description,
      isbn: req.body.isbn,
      user: member,
    });
    res.json({
      status: "success",
      data: bookdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

route.put("/afterlogin/putdata/:id", async (req, res) => {
  let member = req.user;
  try {
    let bookdata = await bookmodel.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      data: bookdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

route.delete("/afterlogin/updatedata/:id", async (req, res) => {
  member = req.user;
  try {
    let bookdata = await bookmodel.deleteOne({ _id: req.params.id });
    res.json({
      status: "success",
      data: bookdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

module.exports = route;
