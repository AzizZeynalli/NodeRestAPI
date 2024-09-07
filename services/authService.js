const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findUserById = async (id) => {
  return await User.findById(id);
};
