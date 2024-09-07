const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const venueController = require('../controllers/venueController');
//Public requests

router.get('/api/venues',protect, venueController.getVenueList);
router.get('/api/venues/:id', protect, venueController.getVenueById);

// Protected Routes
router.post('/api/venues', protect, isAdmin, venueController.createVenue);
router.put('/api/venues/:id', protect, isAdmin, venueController.updateVenue);
router.delete('/api/venues/:id', protect,isAdmin,  venueController.deleteVenue);

module.exports = router;
