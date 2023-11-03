const express = require("express");
const { addUser, loginUser, getSingleUser } = require("../controllers/userController");

const Router = express.Router();

Router.post("/signup", addUser);
Router.post("/login", loginUser);
Router.get("/user/:id", getSingleUser);

module.exports = Router;
