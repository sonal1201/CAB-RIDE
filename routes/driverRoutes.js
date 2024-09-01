const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/bookings', authMiddleware, getDriverBooking);
router.get('/loaction', authMiddleware, updateLocation);

module.exports = router