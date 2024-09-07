const Reservation = require("../models/reservationModel");
const Venue = require("../models/venueModel");

const checkAvailability = async (venueId, date, time) => {
  const existingReservations = await Reservation.find({
    venueId,
    date,
    time,
  });

  return existingReservations.length === 0;
};

exports.createReservation = async (reservationData) => {
  const { venueId, date, time, numberOfPeople } = reservationData;

  const isAvailable = await checkAvailability(venueId, date, time);
  if (!isAvailable) {
    throw new Error("Venue is not available at this time.");
  }

  const newReservation = new Reservation(reservationData);
  return await newReservation.save();
};

exports.getReservationsByUser = async (userId) => {
  return await Reservation.find({ userId });
};

exports.getReservationById = async (id) => {
  return await Reservation.findById(id);
};

exports.updateReservation = async (id, updateData) => {
  return await Reservation.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

exports.deleteReservation = async (id) => {
  return await Reservation.findByIdAndDelete(id);
};
