const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: [true, "Venue ID is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    validate: {
      validator: (value) => !isNaN(Date.parse(value)),
      message: "Invalid date format",
    },
  },
  time: {
    type: String,
    required: [true, "Time is required"],
    validate: {
      validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
      message: "Invalid time format. Should be HH:MM",
    },
  },
  numberOfPeople: {
    type: Number,
    required: [true, "Number of people is required"],
    min: [1, "Number of people must be at least 1"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
