const User = require("../models/userModel");

exports.addUser = async (req, res) => {
  try {
    const emailFind = await User.findOne({
      email: req.body.email,
    });
    if (emailFind) {
      return res.status(400).json({
        success: false,
        message: "Email address already exists",
      });
    }
    const user = await User.create(req.body);
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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "please Enter Email & Password",
      });
    }
    let user = await User.findOne({ email: email }).select("+password");
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


exports.getSingleUser = async (req,res) => {
  try {
    const user = await User.findById(req.params.id)
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
}