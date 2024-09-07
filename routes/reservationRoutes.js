const express = require("express");
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware.protect, reservationController.createReservation);
router.get("/", authMiddleware.protect, reservationController.getUserReservations);
router.get("/:id", authMiddleware.protect, reservationController.getReservationById);
router.delete("/:id", authMiddleware.protect, reservationController.deleteReservation);

module.exports = router;
