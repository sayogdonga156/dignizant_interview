const Form = require("../models/form");

exports.createForm = async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(200).json({
      success: true,
      message: "form created successfully",
      form: form,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getSingleForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "form listing successfully",
      form: form,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getAllForm = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({
      success: true,
      message: "form listing successfully",
      forms: forms,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const forms = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "form update successfully",
      forms: forms,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const forms = await Form.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "form deleted successfully",
      forms: forms,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};
