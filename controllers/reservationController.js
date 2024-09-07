const reservationService = require("../services/reservationService");

exports.createReservation = async (req, res) => {
  try {
    const { venueId, date, time, numberOfPeople } = req.body;
    const userId = req.user.id; //user ID is available from authentication middleware

    if (!venueId || !date || !time || !numberOfPeople) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const newReservation = await reservationService.createReservation({
      venueId,
      userId,
      date,
      time,
      numberOfPeople,
    });

    res.status(201).json({
      status: "success",
      data: {
        reservation: newReservation,
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

exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const reservations = await reservationService.getReservationsByUser(userId);

    res.status(200).json({
      status: "success",
      results: reservations.length,
      data: {
        reservations,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        status: "fail",
        message: "Reservation not found.",
      });
    }
    

    if (reservation.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        status: "fail",
        message: "Not authorized to access this reservation.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reservation,
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

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        status: "fail",
        message: "Reservation not found.",
      });
    }

    // Check if the user is the owner or admin
    if (reservation.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({
        status: "fail",
        message: "Not authorized to delete this reservation.",
      });
    }

    await reservationService.deleteReservation(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
