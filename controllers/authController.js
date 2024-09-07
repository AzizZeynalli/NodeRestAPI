const passport = require("passport");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const {
  registerUser,
  findUserByEmail,
  findUserById,
} = require("../services/authService");

exports.getLogin = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Login endpoint. Send a POST request to login.",
  });
};

exports.getRegister = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Register endpoint. Send a POST request to register.",
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {

    if (err) {
      return res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: info ? info.message : "Invalid credentials",
      });
    }
    req.logIn(user, { session: false }, async (loginErr) => {
      if (loginErr) {
        return res.status(500).json({
          status: "fail",
          message: loginErr.message,
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.status(200).json({
        status: "success",
        token,
        data: { user },
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  });
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email format",
      });
    }

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        status: "fail",
        message: "Password must be at least 8 characters long and include both letters and numbers",
      });
    }

    await registerUser(name, email, password);

    const user = await findUserByEmail(email);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
