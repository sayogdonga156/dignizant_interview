const express = require("express");
const {
  addAdmin,
  loginAdmin,
  getSingleAdmin,
} = require("../controllers/adminController");

const Router = express.Router();

Router.post("/admin/signup", addAdmin);
Router.post("/admin/login", loginAdmin);
Router.get("/admin/:id", getSingleAdmin);

module.exports = Router;
