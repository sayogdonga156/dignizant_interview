const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  const user = await User.findOne({ token: token });
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "A token is required for authentication",
    });
  }

  if (user) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.log(err);
      return res.status(644).json({ success: false, message: "Invalid Token" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "You are not authorized for this api" });
  }

  return next();
};
