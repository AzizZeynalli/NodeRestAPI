const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to check if the user is authenticated

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to access this resource.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser;
    // console.log(currentUser);
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token or token expired.",
    });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action.',
  });
};
