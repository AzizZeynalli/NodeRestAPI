const venueService = require("../services/venueService");
const Venue = require('../models/venueModel'); 
exports.createVenue = async (req, res) => {
  try {
    const { name, location, capacity, description } = req.body;

    if (!name || !location || !capacity || !description) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const newVenue = await venueService.createVenue({
      name,
      location,
      capacity,
      description,
    });

    res.status(201).json({
      status: "success",
      data: {
        venue: newVenue,
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

exports.getVenueList = async (req, res) => {
  try {
    const { page = 1, limit = 10, location } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (location) {
      query.location = location;
    }

    const { venues, totalVenues } = await venueService.getVenueList(query, skip, limit);

    res.status(200).json({
      status: "success",
      results: venues.length,
      totalResults: totalVenues,
      data: {
        venues,
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


exports.getVenueById = async (req, res) => {
  try {
    const venue = await venueService.getVenueById(req.params.id);
    if (!venue) {
      return res.status(404).json({
        status: "fail",
        message: "Venue not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        venue,
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

exports.updateVenue = async (req, res) => {
  try {
    const { name, location, capacity, description } = req.body;

    const venue = await venueService.updateVenue(
      req.params.id,
      { name, location, capacity, description }
    );

    if (!venue) {
      return res.status(404).json({
        status: "fail",
        message: "Venue not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        venue,
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

exports.deleteVenue = async (req, res) => {
  try {
    const venue = await venueService.deleteVenue(req.params.id);

    if (!venue) {
      return res.status(404).json({
        status: "fail",
        message: "Venue not found.",
      });
    }

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
