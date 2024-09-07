const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Public Routes
router.post("/api/auth/login", authController.postLogin);
router.post("/api/auth/register", authController.postRegister);

// Protected Routes
router.post("/api/auth/logout", protect, authController.logout);

module.exports = router;
