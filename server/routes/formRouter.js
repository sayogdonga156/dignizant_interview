const express = require("express");
const { addUser, loginUser, getSingleUser } = require("../controllers/userController");
const { deleteForm, updateForm, getAllForm, getSingleForm, createForm } = require("../controllers/formController");

const Router = express.Router();

Router.post("/create/form", createForm);
Router.get("/form/:id", getSingleForm);
Router.get("/forms", getAllForm);
Router.put("/form/:id", updateForm);
Router.delete("/form/:id", deleteForm);

module.exports = Router;
