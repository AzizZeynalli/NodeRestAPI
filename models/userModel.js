const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function(value) {
        return /[a-zA-Z]/.test(value) && /\d/.test(value);
      },
      message: "Password must include both letters and numbers",
    },
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model("User", userSchema);
