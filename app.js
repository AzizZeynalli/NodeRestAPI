const express = require("express");
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const initializePassport = require("./config/passport-config");
const User = require("./models/userModel");
const cookieParser = require("cookie-parser");
const reservationRoutes = require("./routes/reservationRoutes");

// Middleware
app.use(cookieParser());

// Initialize Passport
initializePassport(
  passport,
  (email) => User.findOne({ email }),
  (id) => User.findById(id)
);

// Middleware
app.set("view-engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api/reservations", reservationRoutes);

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require("./routes/authRoutes");
const venueRoutes = require('./routes/venueRoutes');

app.use("/", authRoutes);
app.use('/', venueRoutes);

module.exports = app;
