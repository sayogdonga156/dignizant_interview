const Admin = require("../models/adminModel");

exports.addAdmin = async (req, res) => {
  try {
    const emailFind = await Admin.findOne({
      email: req.body.email,
    });
    if (emailFind) {
      return res.status(400).json({
        success: false,
        message: "Email address already exists",
      });
    }
    const user = await Admin.create(req.body);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "please Enter Email & Password",
      });
    }
    let user = await Admin.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // console.log(user, "user");
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // console.log(req.body.deviceToken);
    token = user.getJWTToken();
    user.token = token;
    await user.save();
    res.status(200).send({
      success: true,
      message: "login success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getSingleAdmin = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User listing successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};
